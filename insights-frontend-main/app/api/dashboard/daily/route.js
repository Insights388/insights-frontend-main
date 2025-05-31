import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const agent_email = searchParams.get("agent_email");
    const stat_date = searchParams.get("stat_date");

    try {
        if (!agent_email) {
            return NextResponse.json(
                { success: false, message: "Agent Email is required" },
                { status: 401 }
            );
        }
        const coreCall = await fetch(`${process.env.BACKEND_URL}/dashboard/daily?agent_id=${agent_email}&stat_date=${stat_date}`).then((coreCall) => coreCall.json());
        if (coreCall.success) {
            return NextResponse.json(
                { success: true, message: "Gotcha", data: coreCall.data },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { success: false, message: coreCall.message },
                { status: 400 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}