// import { generateScript } from "@/app/configs/AIModel"
// import { NextResponse } from "next/server";

// const SCRIPT_PROMPT = `Write two different scripts for a 30-second video on the Topic: ${topic}. 
// Provide the response strictly in JSON format with the following structure:

// {
//   "Scripts": [
//     { "content": "" },
//     { "content": "" }
//   ]
// }

// ### Formatting Rules:
// - Do NOT include scene descriptions.
// - Do NOT use brackets (), {}, [].
// - Do NOT include markdown formatting like **bold**, _italics_, or "Scene:" labels.

// Return ONLY the JSON response without any additional text.`;


// export async function POST (req) {
//     const {topic} = await req.json()
//     const PROMPT = SCRIPT_PROMPT.replace('{topic}', topic)
//     const result = await generateScript.sendMessage(PROMPT)
//     const resp = result?.response?.text()

//     return NextResponse.json(JSON.parse(resp))

// }

import { generateScript } from "@/app/configs/AIModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { topic } = await req.json();

  // Define the prompt inside the function to use the received topic
  const SCRIPT_PROMPT = `Write two different scripts for a 21-second video on the Topic: ${topic}. 
Provide the response strictly in JSON format with the following structure:

{
  "scripts": [
    { "content": "" },
    { "content": "" }
  ]
}

### Formatting Rules:
- Do NOT include scene descriptions.
- Do NOT use brackets (), {}, [].
- Do NOT include markdown formatting like **bold**, _italics_, or "Scene:" labels.

Return ONLY the JSON response without any additional text.`;

  // Send message to AI model
  const result = await generateScript.sendMessage(SCRIPT_PROMPT);
  const resp = await result.response.text(); // Await the response text

  // Parse JSON safely
  try {
    return NextResponse.json(JSON.parse(resp));
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON response from AI" }, { status: 500 });
  }
}
