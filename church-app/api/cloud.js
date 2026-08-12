export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  const driveFolderId = "19DdkGE9jYp0ay-njtsH547K5_SB5PRvm";
  const fliersFolderId = "1SGVTv7mGVg45lQnZgiORXIrDhRTXuDQX";
  const calendarId =
    "5b8ff01dbf9d0673c45b8f8334ca65b415483f943798e323048d1460d2b7f9e3@group.calendar.google.com";

  if (!apiKey) {
    return res.status(500).json({ error: "Church data is not configured" });
  }

  try {
    const query = [
      `'${driveFolderId}' in parents`,
      "mimeType contains 'image/'",
      "trashed = false",
    ].join(" and ");

    const fliersQuery = [
      `'${fliersFolderId}' in parents`,
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

    const fliersParams = new URLSearchParams({
      key: apiKey,
      q: fliersQuery,
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

    const [driveRes, fliersRes, eventsRes] = await Promise.all([
      fetch(`https://www.googleapis.com/drive/v3/files?${driveParams}`),
      fetch(`https://www.googleapis.com/drive/v3/files?${fliersParams}`),
      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
          calendarId
        )}/events?${eventsParams}`
      ),
    ]);

    if (!driveRes.ok) {
      throw new Error(`Google Drive request failed with status ${driveRes.status}`);
    }

    if (!fliersRes.ok) {
      throw new Error(`Google Drive fliers request failed with status ${fliersRes.status}`);
    }

    if (!eventsRes.ok) {
      throw new Error(`Google Calendar request failed with status ${eventsRes.status}`);
    }

    const driveData = await driveRes.json();
    const fliersData = await fliersRes.json();
    const eventsData = await eventsRes.json();

    const photos = (driveData.files || []).map((file) => ({
      src: `https://drive.google.com/thumbnail?id=${encodeURIComponent(file.id)}&sz=w1600`,
      alt: file.name,
    }));

    const fliers = (fliersData.files || []).map((file) => ({
      src: `https://drive.google.com/thumbnail?id=${encodeURIComponent(file.id)}&sz=w1600`,
      alt: file.name,
    }));

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");

    return res.status(200).json({
      photos,
      fliers,
      events: eventsData.items || [],
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}