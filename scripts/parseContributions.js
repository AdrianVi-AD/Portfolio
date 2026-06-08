// Dev helper: fetch local `/api/github-contributions` proxy when running locally
// Original behavior: call the local dev proxy (http://localhost:5177/api/github-contributions?user=USER)
// Usage: `node scripts/parseContributions.js AdrianVi-AD` (keeps parity with earlier version)

(async () => {
  const user = process.argv[2] || "AdrianVi-AD";
  const url = `http://localhost:5177/api/github-contributions?user=${user}`;
  try {
    const res = await fetch(url);
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
    console.log({
      user,
      cells: days.length,
      activeDays,
      currentStreak,
      totalHeading,
    });
  } catch (e) {
    console.error("error", e);
  }
})();
