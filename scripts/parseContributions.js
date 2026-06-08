import fs from "fs";
import path from "path";

(async () => {
  const user = process.argv[2] || "AdrianVi-AD";
  const url = `https://github.com/users/${user}/contributions`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
    const text = await res.text();
    const re = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d+)"/g;
    const days = [];
    let m;
    while ((m = re.exec(text)) !== null) {
      days.push({ date: m[1], level: Number(m[2]) });
    }
    days.sort((a, b) => new Date(a.date) - new Date(b.date));
    const activeDays = days.filter((d) => d.level > 0).length;
    let currentStreak = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].level > 0) currentStreak++;
      else break;
    }
    const headingMatch = text.match(/(\d[\d,]*)\s+contributions?/i);
    const totalHeading = headingMatch
      ? Number(headingMatch[1].replace(/,/g, ""))
      : 0;

    const out = {
      user,
      cells: days.length,
      activeDays,
      currentStreak,
      total: totalHeading,
      days,
    };

    const outPath = path.join(process.cwd(), "public", "contributions.json");
    await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
    await fs.promises.writeFile(outPath, JSON.stringify(out, null, 2), "utf8");
    console.log("wrote", outPath);
  } catch (e) {
    console.error("error", e);
    process.exitCode = 1;
  }
})();
