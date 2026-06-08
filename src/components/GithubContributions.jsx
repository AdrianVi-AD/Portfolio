import React, { useEffect, useState, useMemo } from "react";

function formatDate(d) {
  const dt = new Date(d);
  return dt.toLocaleDateString();
}

function PixelContributionsGrid({ days }) {
  // days: [{date: 'YYYY-MM-DD', count?: number, level?: number}, ...] sorted asc
  const { weeks, maxCount } = useMemo(() => {
    if (!days || days.length === 0) return { weeks: [], maxCount: 1 };

    const map = new Map();
    days.forEach((d) => map.set(d.date, d));

    const first = new Date(days[0].date);
    const last = new Date(days[days.length - 1].date);

    // align to Sunday start
    const start = new Date(first);
    start.setDate(start.getDate() - start.getDay());

    // align to Saturday end
    const end = new Date(last);
    end.setDate(end.getDate() + (6 - end.getDay()));

    const weeks = [];
    let cur = new Date(start);
    while (cur <= end) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const iso = cur.toISOString().slice(0, 10);
        week.push(
          map.get(iso) || { date: iso, count: 0, level: 0, empty: true },
        );
        cur.setDate(cur.getDate() + 1);
      }
      weeks.push(week);
    }

    const maxCount = Math.max(...days.map((x) => x.count || 0), 1);
    return { weeks, maxCount };
  }, [days]);

  const getColor = (day) => {
    // pixel style colors (accent orange)
    const empty = "rgba(10,12,20,0.4)";
    const palette = [
      "rgba(245,158,11,0.25)",
      "rgba(245,158,11,0.45)",
      "rgba(245,158,11,0.7)",
      "rgba(245,158,11,1)",
    ];

    if (!day || day.empty) return empty;
    if (typeof day.count === "number" && day.count > 0) {
      const intensity = Math.min(1, day.count / Math.max(1, maxCount));
      const idx = Math.min(
        palette.length - 1,
        Math.floor(intensity * palette.length),
      );
      return palette[idx] || palette[palette.length - 1];
    }
    // if only level present (0-4)
    if (typeof day.level === "number") {
      if (day.level === 0) return empty;
      return palette[Math.max(0, Math.min(palette.length - 1, day.level - 1))];
    }
    return empty;
  };

  return (
    <div className="contrib-grid">
      <div className="flex gap-1 items-start">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => {
              const color = getColor(day);
              const title = day.empty
                ? `${day.date}: No contributions`
                : day.count
                  ? `${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`
                  : `${day.date}: level ${day.level}`;

              return (
                <div
                  key={di}
                  title={title}
                  className="w-3 h-3 md:w-4 md:h-4"
                  style={{ background: color, boxShadow: "none" }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GithubContributions({ username }) {
  const configured =
    username || import.meta.env.VITE_GITHUB_USERNAME || "AdrianVi-AD";
  const user = configured || "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [svgHtml, setSvgHtml] = useState(null); // fallback HTML (image)
  const [days, setDays] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchContributions(u) {
      setLoading(true);
      setError(null);
      setSvgHtml(null);
      setStats(null);
      setDays(null);

      if (!u) {
        setLoading(false);
        setError("No username configured");
        return;
      }

      const urls = [
        `/contributions.json`, // pre-generated at build time for GH Pages
        `/api/github-contributions?user=${encodeURIComponent(u)}`,
        `https://github.com/users/${u}/contributions`,
        `https://r.jina.ai/http://github.com/users/${u}/contributions`,
      ];

      let fetched = false;
      let lastError = null;

      for (const url of urls) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Failed to fetch (${res.status})`);

          const contentType = (
            res.headers.get("content-type") || ""
          ).toLowerCase();

          // If the dev proxy returned JSON (GraphQL), use it directly
          if (contentType.includes("application/json")) {
            const json = await res.json();
            if (json && Array.isArray(json.days)) {
              const parsed = json.days.map((d) => ({
                date: d.date,
                count: d.count,
              }));
              parsed.sort((a, b) => new Date(a.date) - new Date(b.date));

              const total =
                json.total ?? parsed.reduce((s, d) => s + (d.count || 0), 0);
              const activeDays =
                json.activeDays ??
                parsed.filter((d) => (d.count || 0) > 0).length;
              const currentStreak =
                json.currentStreak ??
                (function () {
                  let cs = 0;
                  for (let i = parsed.length - 1; i >= 0; i--) {
                    if ((parsed[i].count || 0) > 0) cs++;
                    else break;
                  }
                  return cs;
                })();

              if (mounted) {
                setDays(parsed);
                setStats({ total, activeDays, currentStreak });
                setLoading(false);
              }
              fetched = true;
              break;
            }
          }

          const text = await res.text();

          const parser = new DOMParser();
          const doc = parser.parseFromString(text, "text/html");

          // 1) try SVG rects
          const svgRect = doc.querySelectorAll("rect[data-date][data-count]");
          if (svgRect && svgRect.length > 0) {
            const parsed = Array.from(svgRect).map((r) => ({
              date: r.getAttribute("data-date"),
              count: Number(r.getAttribute("data-count") || 0),
            }));
            parsed.sort((a, b) => new Date(a.date) - new Date(b.date));

            const total = parsed.reduce((s, d) => s + d.count, 0);
            const activeDays = parsed.filter((d) => d.count > 0).length;
            let currentStreak = 0;
            for (let i = parsed.length - 1; i >= 0; i--) {
              if (parsed[i].count > 0) currentStreak++;
              else break;
            }

            if (mounted) {
              setDays(parsed);
              setStats({ total, activeDays, currentStreak });
              setLoading(false);
            }
            fetched = true;
            break;
          }

          // 2) try table-based calendar (newer GitHub markup)
          const cells = doc.querySelectorAll(
            "td.ContributionCalendar-day[data-date][data-level], [data-date][data-level]",
          );
          if (cells && cells.length > 0) {
            const parsed = Array.from(cells).map((c) => ({
              date: c.getAttribute("data-date"),
              level: Number(c.getAttribute("data-level") || 0),
            }));
            parsed.sort((a, b) => new Date(a.date) - new Date(b.date));

            // heading may contain total
            let total = 0;
            const h2 =
              doc.querySelector("#js-contribution-activity-description") ||
              doc.querySelector(".js-yearly-contributions h2");
            if (h2) {
              const match =
                h2.textContent &&
                h2.textContent.match(/(\d+[\,\d]*)\s+contributions?/i);
              if (match) total = Number(match[1].replace(/,/g, ""));
            }

            const activeDays = parsed.filter((d) => d.level > 0).length;
            let currentStreak = 0;
            for (let i = parsed.length - 1; i >= 0; i--) {
              if (parsed[i].level > 0) currentStreak++;
              else break;
            }

            if (mounted) {
              setDays(parsed);
              setStats({ total, activeDays, currentStreak });
              setLoading(false);
            }
            fetched = true;
            break;
          }
        } catch (err) {
          lastError = err;
        }
      }

      if (!fetched) {
        const img = `https://ghchart.rshah.org/${u}`;
        if (mounted) {
          setSvgHtml(img);
          setError(lastError ? String(lastError) : null);
          setLoading(false);
        }
      }
    }

    fetchContributions(user);

    return () => {
      mounted = false;
    };
  }, [user]);

  const showPlaceholder = loading && !days && !svgHtml;

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[1100px]">
        <div className="rounded-lg overflow-hidden bg-primary/20">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/40 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-accent"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .5C5.73.5.89 5.34.89 11.62c0 4.73 3.07 8.75 7.33 10.17.54.1.74-.24.74-.52 0-.26-.01-1.12-.02-2.03-2.98.65-3.61-1.43-3.61-1.43-.49-1.25-1.2-1.58-1.2-1.58-.98-.67.07-.66.07-.66 1.08.08 1.65 1.12 1.65 1.12.96 1.65 2.52 1.17 3.13.9.1-.71.38-1.17.69-1.44-2.38-.27-4.88-1.19-4.88-5.29 0-1.17.42-2.13 1.11-2.88-.11-.27-.48-1.37.11-2.86 0 0 .9-.29 2.95 1.1.86-.24 1.79-.36 2.71-.36.92 0 1.85.12 2.71.36 2.05-1.39 2.95-1.1 2.95-1.1.59 1.49.22 2.59.11 2.86.69.75 1.11 1.71 1.11 2.88 0 4.11-2.51 5.02-4.9 5.28.39.34.73 1.02.73 2.06 0 1.48-.01 2.68-.01 3.04 0 .28.2.62.75.51 4.26-1.43 7.33-5.44 7.33-10.17C23.11 5.34 18.27.5 12 .5z" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-textPrimary">
                  @{user || "Not configured"}
                </div>
                <div className="text-xs text-textPrimary">
                  Last 365 days • Rolling
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`https://github.com/${user}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-secondary text-white px-3 py-2 rounded-md shadow-sm hover:opacity-95 transition"
              >
                View GitHub Profile
              </a>
            </div>
          </div>

          <div className="px-4 pb-6">
            {showPlaceholder && (
              <div className="h-64 sm:h-80 md:h-96 w-full rounded-lg bg-gradient-to-b from-primary/30 to-primary/20 animate-pulse" />
            )}

            {/* Grid rendering from parsed days */}
            {days && (
              <div className="mt-3 rounded-md bg-transparent p-3 animate-fadein overflow-x-auto">
                <div className="min-w-[680px]">
                  <PixelContributionsGrid days={days} />
                </div>
              </div>
            )}

            {/* Fallback static image if parsing failed */}
            {!days && svgHtml && (
              <div className="mt-3 rounded-md bg-transparent p-3 animate-fadein">
                <img
                  src={svgHtml}
                  alt={`${user} contributions`}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Legend (Less -> More) */}
            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-textPrimary">
              <span className="text-sm">Less</span>
              <div className="flex items-center gap-1">
                <span
                  className="h-3 w-6 block"
                  style={{ background: "rgba(10,12,20,0.4)" }}
                />
                <span
                  className="h-3 w-6 block"
                  style={{ background: "rgba(245,158,11,0.25)" }}
                />
                <span
                  className="h-3 w-6 block"
                  style={{ background: "rgba(245,158,11,0.45)" }}
                />
                <span
                  className="h-3 w-6 block"
                  style={{ background: "rgba(245,158,11,0.7)" }}
                />
                <span
                  className="h-3 w-6 block"
                  style={{ background: "rgba(245,158,11,1)" }}
                />
              </div>
              <span className="text-sm">More</span>
            </div>

            {!loading && stats && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-semibold text-white">
                    {stats.total ? stats.total.toLocaleString() : "—"}
                  </div>
                  <div className="text-xs text-textPrimary">
                    Contributions (365 days)
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-semibold text-white">
                    {stats.currentStreak ?? "—"}
                  </div>
                  <div className="text-xs text-textPrimary">
                    Current streak (days)
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-semibold text-white">
                    {stats.activeDays ?? "—"}
                  </div>
                  <div className="text-xs text-textPrimary">Active days</div>
                </div>
              </div>
            )}

            {!loading && !stats && (
              <div className="mt-4 text-center text-sm text-textPrimary">
                Contributions data unavailable. Showing static preview.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
