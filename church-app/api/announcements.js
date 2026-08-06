export default async function handler(req, res) {
  const SHEET_CSV_URL = process.env.ANNOUNCEMENTS_SHEET_URL;

  try {
    const response = await fetch(SHEET_CSV_URL);
    const csvText = await response.text();

    const rows = csvText.trim().split("\n").slice(1); 
    const announcements = rows
      .map((row) => {
        const [text, active] = row.split(",");
        return { text: text?.replace(/^"|"$/g, "").trim(), active: active?.trim().toLowerCase() === "true" };
      })
      .filter((a) => a.active && a.text)
      .map((a) => a.text);

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate"); 
    res.status(200).json({ announcements });
  } catch (err) {
    console.error("Failed to fetch announcements:", err);
    res.status(500).json({ announcements: [] });
  }
}