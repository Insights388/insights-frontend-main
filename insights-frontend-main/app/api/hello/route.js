import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        return NextResponse.json(
            { success: true, message: "GET request successful. Nice you got here.", id },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

// OPTIONS Request (Pre-flight Handling for CORS)
export async function OPTIONS(req) {
    return NextResponse.json(
        { success: true, message: "OPTIONS request successful. Nice you got here." },
        { status: 200 }
    );
}