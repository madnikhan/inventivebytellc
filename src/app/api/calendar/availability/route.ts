import { NextRequest, NextResponse } from "next/server";
import { getAvailableTimeSlots } from "@/lib/google-calendar";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");

    if (!startDateParam || !endDateParam) {
      return NextResponse.json(
        { error: "startDate and endDate are required" },
        { status: 400 }
      );
    }

    const startDate = new Date(startDateParam);
    const endDate = new Date(endDateParam);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    const slots = await getAvailableTimeSlots(startDate, endDate);

    // Filter to only available slots
    const availableSlots = slots
      .filter((slot) => slot.available)
      .map((slot) => ({
        start: slot.start.toISOString(),
        end: slot.end.toISOString(),
      }));

    return NextResponse.json({ slots: availableSlots });
  } catch (error: unknown) {
    console.error("Error fetching availability:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch availability";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
