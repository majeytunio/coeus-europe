
import { OpenAI } from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { topic, userId } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You write professional LinkedIn posts.",
      },
      {
        role: "user",
        content: `Write a LinkedIn post about: ${topic}`,
      },
    ],
  });

  const content = completion.choices[0].message.content;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  await supabase.from("linkedin_posts").insert({
    content,
    created_by: userId,
  });

  return Response.json({ content });
}
