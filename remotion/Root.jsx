

import React from 'react';
import { Composition } from 'remotion';
import RemotionComposition from './../app/_components/RemotionComposition';

export const RemotionRoot = () => {
    // Default sample data for the Remotion Studio preview
    const videoData = {
        audioUrl: '',
        captionJson: [
            {
                confidence: 0.92348814,
                end: 0.71999997,
                start: 0.39999998,
                word: "broken",
            },
            {
                confidence: 0.99876153,
                end: 1.12,
                start: 0.71999997,
                word: "mirrors",
            },
            {
                confidence: 0.9989687,
                end: 1.5999999,
                start: 1.12,
                word: "reflecting",
            },
            {
                confidence: 0.98401964,
                end: 2.24,
                start: 1.5999999,
                word: "pain",
            },
            {
                confidence: 0.96309304,
                end: 2.3999999,
                start: 2.24,
                word: "their",
            },
            {
                confidence: 0.9998568,
                end: 2.72,
                start: 2.3999999,
                word: "cruel",
            },
            {
                confidence: 0.75032425,
                end: 3.28,
                start: 2.72,
                word: "judgment",
            },
            {
                confidence: 0.99814785,
                end: 3.36,
                start: 3.28,
                word: "a",
            },
            {
                confidence: 0.99978757,
                end: 3.6,
                start: 3.36,
                word: "bitter",
            },
            {
                confidence: 0.96484673,
                end: 4.24,
                start: 3.6,
                word: "rain",
            },
            {
                confidence: 0.99665785,
                end: 4.56,
                start: 4.4,
                word: "but",
            },
            {
                confidence: 0.99945766,
                end: 4.72,
                start: 4.56,
                word: "from",
            },
            {
                confidence: 0.99990475,
                end: 4.88,
                start: 4.72,
                word: "the",
            },
            {
                confidence: 0.94574153,
                end: 5.3599997,
                start: 4.88,
                word: "silence",
            },
            {
                confidence: 0.9987859,
                end: 5.52,
                start: 5.3599997,
                word: "a",
            },
            {
                confidence: 0.9998179,
                end: 5.7599998,
                start: 5.52,
                word: "song",
            },
            {
                confidence: 0.99987507,
                end: 6,
                start: 5.7599998,
                word: "took",
            },
            {
                confidence: 0.9599371,
                end: 6.48,
                start: 6,
                word: "flight",
            },
            {
                confidence: 0.9927084,
                end: 6.72,
                start: 6.48,
                word: "notes",
            },
            {
                confidence: 0.9999554,
                end: 6.7999997,
                start: 6.72,
                word: "of",
            },
            {
                confidence: 0.9990723,
                end: 7.2,
                start: 6.7999997,
                word: "defiance",
            },
            {
                confidence: 0.9956937,
                end: 7.6,
                start: 7.2,
                word: "burning",
            },
            {
                confidence: 0.9961422,
                end: 7.9199996,
                start: 7.6,
                word: "ever",
            },
            {
                confidence: 0.9705724,
                end: 8.48,
                start: 7.9199996,
                word: "bright",
            },
            {
                confidence: 0.99864703,
                end: 8.8,
                start: 8.559999,
                word: "with",
            },
            {
                confidence: 0.9999043,
                end: 9.04,
                start: 8.8,
                word: "every",
            },
            {
                confidence: 0.99985564,
                end: 9.28,
                start: 9.04,
                word: "line",
            },
            {
                confidence: 0.99995553,
                end: 9.36,
                start: 9.28,
                word: "of",
            },
            {
                confidence: 0.9429643,
                end: 9.76,
                start: 9.36,
                word: "code",
            },
            {
                confidence: 0.9992773,
                end: 9.92,
                start: 9.76,
                word: "a",
            },
            {
                confidence: 0.99990666,
                end: 10.24,
                start: 9.92,
                word: "fortress",
            },
            {
                confidence: 0.96876264,
                end: 10.719999,
                start: 10.24,
                word: "grew",
            },
            {
                confidence: 0.9885875,
                end: 10.88,
                start: 10.719999,
                word: "a",
            },
            {
                confidence: 0.999646,
                end: 11.28,
                start: 10.88,
                word: "sanctuary",
            },
            {
                confidence: 0.9996846,
                end: 11.599999,
                start: 11.28,
                word: "built",
            },
            {
                confidence: 0.99952435,
                end: 11.84,
                start: 11.599999,
                word: "for",
            },
            {
                confidence: 0.9996972,
                end: 12,
                start: 11.84,
                word: "me",
            },
            {
                confidence: 0.7523866,
                end: 12.16,
                start: 12,
                word: "and",
            },
            {
                confidence: 0.90321946,
                end: 12.4,
                start: 12.16,
                word: "true",
            },
            {
                confidence: 0.99213696,
                end: 13.084937,
                start: 12.764937,
                word: "the",
            },
            {
                confidence: 0.99870384,
                end: 13.404938,
                start: 13.084937,
                word: "melody",
            },
            {
                confidence: 0.9231747,
                end: 13.804937,
                start: 13.404938,
                word: "soared",
            },
            {
                confidence: 0.99717253,
                end: 13.964937,
                start: 13.804937,
                word: "a",
            },
            {
                confidence: 0.99928266,
                end: 14.204937,
                start: 13.964937,
                word: "healing",
            },
            {
                confidence: 0.9961843,
                end: 14.524938,
                start: 14.204937,
                word: "grace",
            },
            {
                confidence: 0.94810325,
                end: 15.004937,
                start: 14.524938,
                word: "accepting",
            },
            {
                confidence: 0.9996679,
                end: 15.164937,
                start: 15.004937,
                word: "my",
            },
            {
                confidence: 0.99907553,
                end: 15.564938,
                start: 15.164937,
                word: "flaws",
            },
            {
                confidence: 0.8274683,
                end: 15.964937,
                start: 15.564938,
                word: "finding",
            },
            {
                confidence: 0.9998902,
                end: 16.204937,
                start: 15.964937,
                word: "my",
            },
            {
                confidence: 0.9872315,
                end: 16.764936,
                start: 16.204937,
                word: "place",
            },
            {
                confidence: 0.9979241,
                end: 17.084938,
                start: 16.924938,
                word: "in",
            },
            {
                confidence: 0.9998437,
                end: 17.244938,
                start: 17.084938,
                word: "the",
            },
            {
                confidence: 0.95076376,
                end: 17.564938,
                start: 17.244938,
                word: "rhythm's",
            },
            {
                confidence: 0.84938264,
                end: 18.124937,
                start: 17.564938,
                word: "embrace",
            },
            {
                confidence: 0.99800664,
                end: 18.204937,
                start: 18.124937,
                word: "my",
            },
            {
                confidence: 0.9990219,
                end: 18.524937,
                start: 18.204937,
                word: "spirit",
            },
            {
                confidence: 0.99939847,
                end: 18.764938,
                start: 18.524937,
                word: "took",
            },
            {
                confidence: 0.88391495,
                end: 19.244938,
                start: 18.764938,
                word: "wing",
            },
            {
                confidence: 0.99574065,
                end: 19.404938,
                start: 19.244938,
                word: "no",
            },
            {
                confidence: 0.9998103,
                end: 19.644938,
                start: 19.404938,
                word: "longer",
            },
            {
                confidence: 0.9381004,
                end: 20.204937,
                start: 19.644938,
                word: "broken",
            },
            {
                confidence: 0.9984181,
                end: 20.364937,
                start: 20.204937,
                word: "my",
            },
            {
                confidence: 0.999859,
                end: 20.604937,
                start: 20.364937,
                word: "heart",
            },
            {
                confidence: 0.99979395,
                end: 20.764938,
                start: 20.604937,
                word: "will",
            },
            {
                confidence: 0.9966113,
                end: 21.084938,
                start: 20.764938,
                word: "sing",
            },
        ],
        images: ['https://images.pexels.com/photos/269583/pexels-photo-269583.jpeg?auto=compress&cs=tinysrgb&w=600'],
    };

    // Calculate duration from the captions (for preview purposes)
    const calculateDuration = () => {
        if (videoData?.captionJson && videoData.captionJson.length > 0) {
            const lastCaption = videoData.captionJson[videoData.captionJson.length - 1];
            return Math.ceil(lastCaption.end * 30); // 30 fps
        }
        return 360; // 12 seconds default fallback
    };

    return (
        <>
            <Composition
                id="youtubeShort"
                component={RemotionComposition}
                // Make this dynamic based on props when rendering
                durationInFrames={calculateDuration()}
                fps={30}
                width={720}
                height={1280}
                defaultProps={{
                    videoData: videoData,
                }}
            />
        </>
    );
};


// export const RemotionRoot = () => {
//     return (
//         <>
//             <Composition
//                 id="youtubeShort"
//                 component={RemotionComposition}
//                 durationInFrames={(inputProps) => inputProps.videoData?.durationInFrames || 360} // ✅ Read from inputProps
//                 fps={30}
//                 width={720}
//                 height={1280}
//                 defaultProps={{
//                     videoData: videoData,
//                 }}
//             />
//         </>
//     );
// };




// export const RemotionRoot = () => {
//     // Make the calculation explicit and log it
//     const lastCaptionEnd = videoData?.captionJson?.[videoData?.captionJson?.length - 1]?.end || 0;
//     const fps = 30;
//     const calculatedDuration = Math.ceil(lastCaptionEnd * fps);


//     console.log("🚀🚗🏠💻 RemotionRoot - Calculated Video Duration:", {
//         lastCaptionEnd,
//         fps,
//         calculatedDuration
//     });

//     return (
//         <>
//             <Composition
//                 id="youtubeShort"
//                 component={RemotionComposition}
//                 durationInFrames={calculatedDuration}
//                 fps={fps}
//                 width={720}
//                 height={1280}
//                 defaultProps={{
//                     videoData: videoData
//                 }}
//             />
//         </>
//     );
// };


// export const RemotionRoot = () => {
//     return (
//         <>
//             <Composition
//                 id="youtubeShort"
//                 component={RemotionComposition}
//                 durationInFrames={Number((videoData?.captionJson?.[videoData?.captionJson?.length - 1]?.end * 30).toFixed(0))}
//                 fps={30}
//                 width={720}
//                 height={1280}
//                 defaultProps={{
//                     videoData: videoData
//                 }}

//             />
//         </>
//     );
// };


// import React from 'react';
// import { Composition } from 'remotion';
// import RemotionComposition from './../app/_components/RemotionComposition';

// // Remove or comment out the hardcoded videoData
// // const videoData = { ... }

// export const RemotionRoot = ({ videoData }) => {
//     // Calculate duration based on input props or use a default duration
//     const durationInFrames = videoData?.captionJson?.length
//         ? Math.ceil((videoData.captionJson[videoData.captionJson.length - 1]?.end || 15) * 30)
//         : 450; // 15 seconds default if no captions provided

//     return (
//         <>
//             <Composition
//                 id="youtubeShort"
//                 component={RemotionComposition}
//                 durationInFrames={durationInFrames}
//                 fps={30}
//                 width={720}
//                 height={1280}
//                 defaultProps={{
//                     videoData: videoData
//                 }}
//             />
//         </>
//     );
// };
