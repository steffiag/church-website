export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  const calendarId =
    "5b8ff01dbf9d0673c45b8f8334ca65b415483f943798e323048d1460d2b7f9e3@group.calendar.google.com";

  const { timeMin, timeMax } = req.query;

  if (!timeMin || !timeMax) {
    return res.status(400).json({ error: "timeMin and timeMax are required" });
  }

  if (!apiKey) {
    return res.status(500).json({ error: "Calendar is not configured" });
  }

  try {
    const params = new URLSearchParams({
      key: apiKey,
      timeMin,
      timeMax,
      singleEvents: "true",
      orderBy: "startTime",
      maxResults: "250",
    });

    const eventsRes = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        calendarId
      )}/events?${params}`
    );

    if (!eventsRes.ok) {
      throw new Error(`Google Calendar request failed with status ${eventsRes.status}`);
    }

    const data = await eventsRes.json();

    res.setHeader(
      "Cache-Control",
      "s-maxage=600, stale-while-revalidate=3600"
    );

    return res.status(200).json({ items: data.items || [] });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
