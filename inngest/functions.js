import axios from "axios";
import { inngest } from "./client";
import { createClient } from "@deepgram/sdk";
import { GenerateImageScript } from "@/app/configs/AIModel";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { getServices, renderMediaOnCloudrun } from "@remotion/cloudrun/client";

const ImagePromptScript = `Generate Image Prompt of {style} style with all details for each scene for 30 seconds video : script: {script}
 Just give specific image prompt depends on the story line 
 Do no give camera angle image prompt
 Follow the following schema and return JSON data (max 4-5 Images)
 [
 {
 imagePrompt: '',
 sceneContent: ' <Script Content>'
 }
 ]
 `;

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

const BASE_URL = "https://aigurulab.tech";

export const GenerateVideoData = inngest.createFunction(
  { id: "generate-video-data" },
  { event: "generate-video-data" },
  async ({ event, step }) => {
    //GET ALL THE DATA
    const { script, topic, title, caption, videoStyle, voice, recordId } =
      event?.data;

    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

    //   1 Generate AUdio File MP3
    const GenerateAudioFile = await step.run("GenerateAudioFile", async () => {
      const result = await axios.post(
        BASE_URL + "/api/text-to-speech",
        {
          input: script,
          voice: voice,
        },
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_AIGURULAB_API_KEY,
            "Content-Type": "application/json", // Content Type
          },
        }
      );
      console.log(result.data.audio); //Output Result: Audio Mp3 Url
      return result.data.audio;
    });

    // 2Generate Captions
    const GenerateCaptions = await step.run("generateCaptions", async () => {
      const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);

      // STEP 2: Call the transcribeUrl method with the audio payload and options
      const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
        {
          url: GenerateAudioFile,
        },
        // STEP 3: Configure Deepgram options for audio analysis
        {
          model: "nova-3",
        }
      );

      return result.results?.channels[0]?.alternatives[0]?.words;
    });

    //3 Generate Image Prompt from Script

    const GenerateImagePrompts = await step.run(
      "generateImagePrompt",

      async () => {
        const FINAL_PROMPT = ImagePromptScript.replace(
          "{style}",
          videoStyle
        ).replace("{script}", script);

        const result = await GenerateImageScript.sendMessage(FINAL_PROMPT);
        const resp = JSON.parse(result.response.text());

        return resp;
      }
    );

    //4 Generate Images using AI

    const GenerateImages = await step.run("generateImages", async () => {
      let images = [];
      images = await Promise.all(
        GenerateImagePrompts.map(async (element) => {
          const result = await axios.post(
            BASE_URL + "/api/generate-image",
            {
              width: 1024,
              height: 1024,
              input: element?.imagePrompt,
              model: "sdxl", //'flux'
              aspectRatio: "1:1", //Applicable to Flux model only
            },
            {
              headers: {
                "x-api-key": process.env.NEXT_PUBLIC_AIGURULAB_API_KEY,
                "Content-Type": "application/json", // Content Type
              },
            }
          );
          console.log(result.data.image); //Output Result: Base 64 Image
          return result.data.image;
        })
      );
      return images;
    });

    //5 Save All Data to DB

    const UpdatetDB = await step.run("UpdateDB", async () => {
      const result = await convex.mutation(api.videoData.UpdateVideoRecord, {
        recordId: recordId,
        audioUrl: GenerateAudioFile,
        captionJson: GenerateCaptions,
        images: GenerateImages,
      });

      return result;
    });

    const RenderVideo = await step.run("renderVideo", async () => {
      try {
        // Get available Remotion Cloud Run services
        const services = await getServices({
          region: "us-east1",
          compatibleOnly: true,
        });
        const serviceName = services[0].serviceName;

        // Calculate the duration properly from the last caption
        const lastCaption = GenerateCaptions?.[GenerateCaptions.length - 1];
        const fps = 30;
        const calculatedDuration = lastCaption
          ? Math.ceil(lastCaption.end * fps)
          : 360;

        console.log("🔥 Exporting video with duration:", calculatedDuration);

        // Create a modified version of your video data
        const exportVideoData = {
          audioUrl: GenerateAudioFile,
          captionJson: GenerateCaptions,
          images: GenerateImages,
          // Explicitly pass the calculated duration
          calculatedDuration: calculatedDuration,
        };

        const result = await renderMediaOnCloudrun({
          serviceName,
          region: "us-east1",
          serveUrl: process.env.GCP_SERVE_URL,
          composition: "youtubeShort",
          inputProps: {
            videoData: exportVideoData,
          },
          codec: "h264",
          // Use the calculated duration here
          durationInFrames: calculatedDuration,
          fps: 30, // Make sure FPS is consistent
          chromiumOptions: {
            args: [
              "--disable-dev-shm-usage",
              "--no-sandbox",
              "--disable-setuid-sandbox",
            ],
          },
          timeoutInMilliseconds: 60000 * 5, // 5 minutes timeout
        });

        if (result.type === "success") {
          console.log("✅ Video Rendered Successfully!");
          console.log("📦 Storage Bucket:", result.bucketName);
          console.log("🎞 Render ID:", result.renderId);
        } else {
          console.error("❌ Video Render Failed:", result);
        }

        return result?.publicUrl;
      } catch (error) {
        console.error("Error rendering video:", error);
        throw error; // Re-throw to be handled by the outer function
      }
    });

    const UpdateDownloadUrl = await step.run("UpdateDownloadUrl", async () => {
      const result = await convex.mutation(api.videoData.UpdateVideoRecord, {
        recordId: recordId,
        audioUrl: GenerateAudioFile,
        captionJson: GenerateCaptions,
        images: GenerateImages,
        downloadUrl: RenderVideo,
      });

      return result;
    });

    return RenderVideo;
  }
);
