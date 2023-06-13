import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req) {
  const body = await req.json();
  console.log(body);
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: body.messages,
  });

  return NextResponse.json({ result: res.data });
}
