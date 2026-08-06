export default async function handler(req, res) {
  const SHEET_CSV_URL = process.env.ANNOUNCEMENTS_SHEET_URL;

  try {
    const response = await fetch(SHEET_CSV_URL);
    const csvText = await response.text();

    const rows = csvText.trim().split("\n").slice(1);
    const announcements = rows
      .map((row) => row.split(",")[0]?.replace(/^"|"$/g, "").trim())
      .filter((text) => text);

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");  
    res.status(200).json({ announcements });
  } catch (err) {
    console.error("Failed to fetch announcements:", err);
    res.status(500).json({ announcements: [] });
  }
}