export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const driveFolderId = "1ZS7OsZDtYgfiCStQ589N1_ljictrLVhF";
  const calendarId =
    "da92ccf9ba47b4363891a93b0a37f94154e60331f03099a07cd9c449f5c7e5c8@group.calendar.google.com";

  try {
    const query = [
      `'${driveFolderId}' in parents`,
      "mimeType contains 'image/'",
      "trashed = false",
    ].join(" and ");

    const driveParams = new URLSearchParams({
      key: apiKey,
      q: query,
      fields: "files(id,name,mimeType,modifiedTime)",
      orderBy: "modifiedTime desc",
      pageSize: "8",
    });

    const eventsParams = new URLSearchParams({
      key: apiKey,
      timeMin: new Date().toISOString(),
      singleEvents: "true",
      orderBy: "startTime",
      maxResults: "10",
    });

    const [driveRes, eventsRes] = await Promise.all([
      fetch(`https://www.googleapis.com/drive/v3/files?${driveParams}`),
      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
          calendarId
        )}/events?${eventsParams}`
      ),
    ]);

    const driveData = await driveRes.json();
    const eventsData = await eventsRes.json();

    const photos = (driveData.files || []).map((file) => ({
      src: `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${apiKey}`,
      alt: file.name,
    }));

    res.setHeader(
      "Cache-Control",
      "s-maxage=600, stale-while-revalidate=3600"
    );

    return res.status(200).json({
      photos,
      events: eventsData.items || [],
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}