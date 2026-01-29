import { google } from "googleapis";

interface CalendarConfig {
  calendarId: string;
  serviceAccountEmail: string;
  privateKey: string;
  projectId: string;
}

interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
}

interface EventData {
  summary: string;
  description: string;
  start: Date;
  end: Date;
  attendeeEmail: string;
  location?: string;
}

let calendarClient: ReturnType<typeof google.calendar> | null = null;

function getCalendarClient() {
  if (calendarClient) {
    return calendarClient;
  }

  const config: CalendarConfig = {
    calendarId: process.env.GOOGLE_CALENDAR_ID || "",
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "",
    privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n") || "",
    projectId: process.env.GOOGLE_PROJECT_ID || "",
  };

  if (!config.calendarId || !config.serviceAccountEmail || !config.privateKey) {
    throw new Error("Google Calendar credentials not configured");
  }

  const auth = new google.auth.JWT({
    email: config.serviceAccountEmail,
    key: config.privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  calendarClient = google.calendar({ version: "v3", auth });
  return calendarClient;
}

export async function getAvailableTimeSlots(
  startDate: Date,
  endDate: Date
): Promise<TimeSlot[]> {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "";

    // Get business hours from env or use defaults
    const businessHoursStart =
      process.env.CALENDAR_BUSINESS_HOURS_START || "09:00";
    const businessHoursEnd = process.env.CALENDAR_BUSINESS_HOURS_END || "17:00";
    const appointmentDuration =
      parseInt(process.env.CALENDAR_APPOINTMENT_DURATION || "60") * 60000; // Convert to milliseconds
    const bufferMinutes =
      parseInt(process.env.CALENDAR_BUFFER_MINUTES || "15") * 60000;

    // Get busy times from calendar
    const freebusyResponse = await calendar.freebusy.query({
      requestBody: {
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        items: [{ id: calendarId }],
      },
    });

    const busyTimes =
      freebusyResponse.data.calendars?.[calendarId]?.busy || [];

    // Generate time slots
    const slots: TimeSlot[] = [];
    const currentDate = new Date(startDate);

    while (currentDate < endDate) {
      const [startHour, startMinute] = businessHoursStart
        .split(":")
        .map(Number);
      const [endHour, endMinute] = businessHoursEnd.split(":").map(Number);

      const slotStart = new Date(currentDate);
      slotStart.setHours(startHour, startMinute, 0, 0);

      const slotEnd = new Date(currentDate);
      slotEnd.setHours(endHour, endMinute, 0, 0);

      // Generate slots for the day
      let currentSlot = new Date(slotStart);
      while (currentSlot.getTime() + appointmentDuration <= slotEnd.getTime()) {
        const slotEndTime = new Date(currentSlot.getTime() + appointmentDuration);
        const isAvailable = !busyTimes.some((busy) => {
          const busyStart = new Date(busy.start || "");
          const busyEnd = new Date(busy.end || "");
          return (
            (currentSlot >= busyStart && currentSlot < busyEnd) ||
            (slotEndTime > busyStart && slotEndTime <= busyEnd) ||
            (currentSlot <= busyStart && slotEndTime >= busyEnd)
          );
        });

        slots.push({
          start: new Date(currentSlot),
          end: slotEndTime,
          available: isAvailable,
        });

        currentSlot = new Date(currentSlot.getTime() + appointmentDuration + bufferMinutes);
      }

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
      currentDate.setHours(0, 0, 0, 0);
    }

    return slots;
  } catch (error) {
    console.error("Error fetching available time slots:", error);
    throw error;
  }
}

export async function checkAvailability(
  date: Date,
  time: string
): Promise<boolean> {
  try {
    const [hours, minutes] = time.split(":").map(Number);
    const slotStart = new Date(date);
    slotStart.setHours(hours, minutes, 0, 0);

    const appointmentDuration =
      parseInt(process.env.CALENDAR_APPOINTMENT_DURATION || "60") * 60000;
    const slotEnd = new Date(slotStart.getTime() + appointmentDuration);

    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "";

    const freebusyResponse = await calendar.freebusy.query({
      requestBody: {
        timeMin: slotStart.toISOString(),
        timeMax: slotEnd.toISOString(),
        items: [{ id: calendarId }],
      },
    });

    const busyTimes =
      freebusyResponse.data.calendars?.[calendarId]?.busy || [];
    return busyTimes.length === 0;
  } catch (error) {
    console.error("Error checking availability:", error);
    return false;
  }
}

export async function createEvent(eventData: EventData): Promise<string> {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "";

    if (!calendarId) {
      throw new Error("GOOGLE_CALENDAR_ID is not configured");
    }

    const event = {
      summary: eventData.summary,
      description: eventData.description,
      start: {
        dateTime: eventData.start.toISOString(),
        timeZone: process.env.CALENDAR_TIMEZONE || "America/Denver",
      },
      end: {
        dateTime: eventData.end.toISOString(),
        timeZone: process.env.CALENDAR_TIMEZONE || "America/Denver",
      },
      // Note: Attendees are added but invites won't be sent automatically
      // Service accounts require Domain-Wide Delegation to send invites
      // Email notifications are sent via SMTP instead
      attendees: [{ email: eventData.attendeeEmail }],
      location: eventData.location,
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 }, // 1 day before
          { method: "popup", minutes: 60 }, // 1 hour before
        ],
      },
    };

    // Don't use sendUpdates - service accounts can't send invites without Domain-Wide Delegation
    // Calendar invites are handled via email notifications instead
    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      // Removed sendUpdates: "all" - service accounts need domain-wide delegation for this
    });

    return response.data.id || "";
  } catch (error: unknown) {
    console.error("Error creating calendar event:", error);
    
    const errorObj = error as { code?: string | number; message?: string };
    
    // Provide helpful error messages
    if (errorObj.code === 404) {
      const calendarId = process.env.GOOGLE_CALENDAR_ID || "";
      const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "";
      throw new Error(
        `Calendar not found (404). ` +
        `Calendar "${calendarId}" may not be shared with service account "${serviceAccountEmail}". ` +
        `Please verify: 1) Calendar is shared with service account, 2) Permission is "Make changes to events", ` +
        `3) Wait 1-2 minutes for permissions to propagate, 4) Restart dev server. ` +
        `Test at: http://localhost:3000/api/calendar/test`
      );
    }
    
    if (errorObj.code === 403) {
      const calendarId = process.env.GOOGLE_CALENDAR_ID || "";
      const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "";
      const errorMessage = errorObj.message || "";
      
      // Check if it's the domain-wide delegation error
      if (errorMessage.includes("Domain-Wide Delegation") || errorMessage.includes("invite attendees")) {
        throw new Error(
          `Service accounts cannot send calendar invites without Domain-Wide Delegation. ` +
          `Calendar event will be created without automatic invites. ` +
          `Email notifications are sent via SMTP instead. ` +
          `Original error: ${errorMessage}`
        );
      }
      
      throw new Error(
        `Permission denied (403). ` +
        `Service account "${serviceAccountEmail}" cannot access calendar "${calendarId}". ` +
        `Even if you've shared it, try: 1) Wait 2-3 minutes for propagation, 2) Remove and re-add service account, ` +
        `3) Verify permission is exactly "Make changes to events", 4) Restart dev server. ` +
        `Test at: http://localhost:3000/api/calendar/test. ` +
        `Error: ${errorMessage}`
      );
    }
    
    throw error;
  }
}
