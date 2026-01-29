import { NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs";

export async function GET() {
  try {
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "";
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "";
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n") || "";

    if (!calendarId || !serviceAccountEmail || !privateKey) {
      return NextResponse.json(
        { error: "Missing credentials", calendarId, serviceAccountEmail, hasPrivateKey: !!privateKey },
        { status: 400 }
      );
    }

    // Create auth client
    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    // Test 1: Try to get calendar metadata
    try {
      const calendarInfo = await calendar.calendars.get({
        calendarId,
      });

      return NextResponse.json({
        success: true,
        message: "Calendar access successful!",
        calendar: {
          id: calendarInfo.data.id,
          summary: calendarInfo.data.summary,
          timeZone: calendarInfo.data.timeZone,
        },
        serviceAccount: serviceAccountEmail,
      });
    } catch (error: unknown) {
      // Test 2: Try to list calendars to see what's accessible
      try {
        const calendarList = await calendar.calendarList.list();
        const accessibleCalendars = calendarList.data.items?.map((cal) => ({
          id: cal.id,
          summary: cal.summary,
          accessRole: cal.accessRole,
        }));

        const errorObj = error as { code?: string | number; message?: string };
        return NextResponse.json({
          success: false,
          error: `Cannot access calendar "${calendarId}"`,
          errorCode: errorObj.code,
          errorMessage: errorObj.message,
          accessibleCalendars,
          suggestion: accessibleCalendars?.length
            ? `Try using one of these calendar IDs: ${accessibleCalendars.map((c) => c.id).join(", ")}`
            : "No calendars accessible. Make sure calendar is shared with service account.",
        });
      } catch (listError: unknown) {
        const errorObj = error as { code?: string | number; message?: string };
        const listErrorObj = listError as { message?: string };
        return NextResponse.json({
          success: false,
          error: "Cannot access calendar",
          errorCode: errorObj.code,
          errorMessage: errorObj.message,
          listError: listErrorObj.message,
          troubleshooting: {
            step1: `Verify calendar "${calendarId}" is shared with "${serviceAccountEmail}"`,
            step2: "Set permission to 'Make changes to events'",
            step3: "Wait 1-2 minutes for permissions to propagate",
            step4: "Try restarting the dev server after sharing",
          },
        });
      }
    }
  } catch (error: unknown) {
    const errorObj = error as { message?: string; code?: string | number };
    return NextResponse.json(
      {
        success: false,
        error: "Test failed",
        message: errorObj.message || "Unknown error",
        code: errorObj.code,
      },
      { status: 500 }
    );
  }
}
