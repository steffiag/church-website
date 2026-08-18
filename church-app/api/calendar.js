export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  const calendarId =
    "e546908295cddda937f5d64ad2467b2c8ee08ced51eb0494dfcd33490a935743@group.calendar.google.com";

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
