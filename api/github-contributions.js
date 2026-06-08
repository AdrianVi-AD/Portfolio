export default async function handler(req, res) {
  try {
    const base = req.headers.host
      ? `https://${req.headers.host}`
      : `https://api`;
    const reqUrl = new URL(req.url, base);
    const user =
      reqUrl.searchParams.get("user") ||
      reqUrl.searchParams.get("username") ||
      "AdrianVi-AD";

    const ghUrl = `https://github.com/users/${encodeURIComponent(user)}/contributions`;
    const r = await fetch(ghUrl, {
      headers: { "User-Agent": "Vercel-Server" },
    });
    if (!r.ok) {
      return res
        .status(r.status)
        .json({ error: `Failed to fetch GitHub: ${r.status}` });
    }

    const text = await r.text();

    // 1) Try old SVG rects with data-count
    const days = [];
    let m;
    const rectRe =
      /<rect[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-count="(\d+)"[^>]*>/g;
    while ((m = rectRe.exec(text)) !== null) {
      days.push({ date: m[1], count: Number(m[2]) });
    }

    // 2) If not found, try table / calendar cells with data-level
    if (days.length === 0) {
      const levelRe = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g;
      while ((m = levelRe.exec(text)) !== null) {
        days.push({ date: m[1], level: Number(m[2]) });
      }
    }

    // Sort ascending
    days.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Try to extract total from the page heading (e.g. "1,234 contributions")
    const headingMatch = text.match(/(\d[\d,]*)\s+contributions?/i);
    const totalFromHeading = headingMatch
      ? Number(headingMatch[1].replace(/,/g, ""))
      : null;

    // Stats
    let total = 0;
    let activeDays = 0;

    // If explicit counts are present, sum them (most accurate)
    if (days.some((d) => typeof d.count === "number")) {
      for (const d of days) {
        if (typeof d.count === "number") {
          total += d.count;
          if (d.count > 0) activeDays++;
        }
      }
    } else {
      // No counts: compute activeDays from 'level' and use heading total when available
      for (const d of days) {
        if (typeof d.level === "number" && d.level > 0) activeDays++;
      }
      if (totalFromHeading !== null) total = totalFromHeading;
    }

    let currentStreak = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      const d = days[i];
      const positive =
        typeof d.count === "number"
          ? d.count > 0
          : typeof d.level === "number"
            ? d.level > 0
            : false;
      if (positive) currentStreak++;
      else break;
    }

    res.setHeader("Cache-Control", "no-cache, must-revalidate, max-age=0");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res
      .status(200)
      .json({ user, days, total, activeDays, currentStreak });
  } catch (err) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.status(500).json({ error: String(err) });
  }
}
