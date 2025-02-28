import { queryChatbot } from "../../../lib/chatbot";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("Received chatbot query...");
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const response = await queryChatbot(query);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chatbot API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
