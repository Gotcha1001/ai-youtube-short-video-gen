const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


export const generateScript = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Write two different scripts for a 30-second video on the topic \"Kids Story.\"\nProvide the response in JSON format with the following structure:\n\njson\nCopy\nEdit\n{\n\"Scripts\": [\n{ \"content\": \"\" }\n]\n}\nRequirements:\n\nDo not use markdown formatting (e.g., no bold text or italics).\nDo not add unnecessary new lines.\nEach script should be a single string without line breaks." },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n{\n  \"Scripts\": [\n    {\n      \"content\": \"Once upon a time, in a land filled with lollipop trees and gummy bear bushes, lived a little girl named Lily. She loved adventures! One day, she discovered a magic key that unlocked a door to a world of talking animals. She befriended a wise owl, a mischievous monkey, and a singing frog. Together, they embarked on a quest to find the lost sunbeam, bringing light back to their whimsical world. The end.\"\n    },\n    {\n      \"content\": \"A tiny dragon, Sparky, lived in a cave made of sparkling crystals. He was lonely, but too shy to make friends. One day, a brave knight, Sir Reginald the Round, stumbled upon his cave.  Instead of fighting, they played games, sharing laughter and stories. Sparky discovered that friendship was more sparkly than any crystal, and he wasn't lonely anymore. The end.\"\n    }\n  ]\n}\n```\n" },
      ],
    },
  ],
});


export const GenerateImageScript = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Generate Image Prompt of Cinematic style with all details for each scene for 30 seconds video : script: Rosa Parks refused to give up her seat on a bus in 1955. Her quiet act of defiance sparked the Montgomery Bus Boycott, a pivotal movement in the Civil Rights Movement. One person's bravery can inspire lasting change for everyone.     \n Just give specific image prompt depends on the story line \n Do no give camera angle image prompt\n Follow the following schema and return JSON data (max 4-5 Images)\n [\n {\n imagePrompt: '',\n sceneContent: ' <Script Content>'\n }\n ]\n" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n[\n  {\n    \"imagePrompt\": \"A bustling city street in Montgomery, Alabama, 1955.  A crowded city bus, filled with predominantly Black passengers standing and a few white passengers seated. The atmosphere is tense, with a sense of weary resignation on the faces of the Black passengers.  Focus on the details: worn seats, period-appropriate clothing, and the overall feeling of segregation.\",\n    \"sceneContent\": \"Opening scene showing the everyday reality of segregation on Montgomery buses in 1955.\"\n  },\n  {\n    \"imagePrompt\": \"Rosa Parks, a Black woman in her 40s, sits calmly on a bus seat.  Her expression is one of quiet dignity and determination.  The bus driver, a white man, approaches her with a stern expression.  The surrounding passengers watch with a mixture of apprehension and support.  Details should include Parks's simple but elegant attire and the worn interior of the bus.\",\n    \"sceneContent\": \"Rosa Parks refusing to give up her seat. Highlight her composure and the tension in the atmosphere.\"\n  },\n  {\n    \"imagePrompt\": \"A close-up shot of Rosa Parks' hands clasped together in her lap; her face is partially shadowed, emphasizing her quiet resolve.  The subtle details in the background hint at the growing unrest around her.\",\n    \"sceneContent\": \"Emphasize Rosa Parks' inner strength and resolve. A moment of quiet power.\"\n  },\n  {\n    \"imagePrompt\": \"A wide shot showing the aftermath: a mostly empty bus, with a few remaining passengers, and the growing crowd of Black people on the street outside, all participating in the Montgomery Bus Boycott.  Flags and signs bearing slogans of the Civil Rights Movement are visible. The image should evoke a sense of collective action and hope.\",\n    \"sceneContent\": \"The impact of Rosa Parks' action - showing the start of the Montgomery Bus Boycott, a sea of protestors peacefully demonstrating.\"\n  },\n  {\n    \"imagePrompt\": \"A stylized image symbolizing lasting change:  a single seed growing into a strong oak tree, representing the small act of defiance growing into a powerful movement.  The oak tree is reaching toward the sky with the sun rays behind it.  This should be a more abstract and metaphorical image.\",\n    \"sceneContent\": \"Concluding image, symbolizing the lasting impact of Rosa Parks' courage and the growth of the Civil Rights Movement.\"\n  }\n]\n```\n" },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
