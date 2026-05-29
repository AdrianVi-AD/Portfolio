import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev-only proxy plugin: adds /api/github-contributions?user=USERNAME
// to fetch the GitHub contributions page server-side and return raw HTML.
function devGithubProxy() {
  return {
    name: "dev-github-proxy",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const reqUrl = new URL(req.url, `http://localhost`);
          if (reqUrl.pathname === "/api/github-contributions") {
            const user = reqUrl.searchParams.get("user") || "";
            if (!user) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "missing user" }));
              return;
            }

            // If a GitHub token is present, use the GraphQL API to fetch structured contributions data.
            const GITHUB_TOKEN =
              process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
            if (GITHUB_TOKEN) {
              try {
                const to = new Date();
                const from = new Date();
                from.setDate(from.getDate() - 365);

                const graphql = {
                  query: `query Contributions($login: String!, $from: DateTime!, $to: DateTime!) {\n  user(login: $login) {\n    contributionsCollection(from: $from, to: $to) {\n      contributionCalendar {\n        totalContributions\n        weeks {\n          contributionDays {\n            date\n            contributionCount\n          }\n        }\n      }\n    }\n  }\n}\n`,
                  variables: {
                    login: user,
                    from: from.toISOString(),
                    to: to.toISOString(),
                  },
                };

                const apiRes = await fetch("https://api.github.com/graphql", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    "User-Agent": "vite-dev-proxy",
                  },
                  body: JSON.stringify(graphql),
                });

                if (!apiRes.ok) {
                  const body = await apiRes.text();
                  res.statusCode = apiRes.status;
                  res.setHeader("Content-Type", "text/plain");
                  res.end(`GraphQL fetch failed: ${apiRes.status}\n${body}`);
                  return;
                }

                const json = await apiRes.json();
                // Flatten weeks -> days
                const weeks =
                  (
                    (((json || {}).data || {}).user || {})
                      .contributionsCollection || {}
                  ).contributionCalendar?.weeks || [];
                const days = [];
                for (const w of weeks) {
                  for (const d of w.contributionDays || [])
                    days.push({ date: d.date, count: d.contributionCount });
                }

                // Compute stats
                const total =
                  (((json || {}).data || {}).user || {}).contributionsCollection
                    ?.contributionCalendar?.totalContributions ||
                  days.reduce((s, d) => s + (d.count || 0), 0);
                const activeDays = days.filter(
                  (d) => (d.count || 0) > 0,
                ).length;
                let currentStreak = 0;
                for (let i = days.length - 1; i >= 0; i--) {
                  if ((days[i].count || 0) > 0) currentStreak++;
                  else break;
                }

                res.statusCode = 200;
                res.setHeader(
                  "Content-Type",
                  "application/json; charset=utf-8",
                );
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.end(
                  JSON.stringify({ days, total, activeDays, currentStreak }),
                );
                return;
              } catch (e) {
                // fallthrough to HTML fetch below on error
                // eslint-disable-next-line no-console
                console.error("GraphQL proxy error", e);
              }
            }

            const target = `https://github.com/users/${encodeURIComponent(user)}/contributions`;
            const r = await fetch(target, {
              headers: { "user-agent": "vite-dev-proxy" },
            });
            if (!r.ok) {
              res.statusCode = r.status;
              res.setHeader("Content-Type", "text/plain");
              res.end(`Failed to fetch: ${r.status}`);
              return;
            }

            const text = await r.text();
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(text);
            return;
          }
        } catch (e) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: String(e) }));
          return;
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devGithubProxy()],
});
