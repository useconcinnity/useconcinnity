import { StreamClient } from "@stream-io/node-sdk";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await currentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
    const apiSecret = process.env.STREAM_SECRET_KEY;

    console.log("Stream Token Gen - API Key:", apiKey);
    console.log("Stream Token Gen - Secret Start:", apiSecret?.substring(0, 5));

    if (!apiKey || !apiSecret) {
        console.error("Stream API keys missing in environment variables");
        return NextResponse.json({ error: "Stream API keys missing" }, { status: 500 });
    }

    const client = new StreamClient(apiKey, apiSecret);

    // Expire in 1 hour
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issued = Math.floor(Date.now() / 1000) - 60;

    const token = client.createToken(user.id, exp, issued);

    return NextResponse.json({ token, apiKey });
}
