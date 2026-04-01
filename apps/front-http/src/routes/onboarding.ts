import { Hono } from "hono";
import { db } from "@repo/postgres-config/client";

export const onboardingRouter = new Hono();

const USERNAME_MIN = 3;
const USERNAME_MAX = 20;
const REQUIRED_SUGGESTIONS = 6;

/* ------------------------------------------------ */
/* Helpers */
/* ------------------------------------------------ */

// allow only a-z, 0-9 and _
function normalizeBase(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "") // remove invalid chars
    .replace(/_+/g, "_") // collapse multiple underscores
    .slice(0, USERNAME_MAX);
}

function clampLength(username: string) {
  if (username.length < USERNAME_MIN) {
    return username.padEnd(USERNAME_MIN, "1");
  }
  return username.slice(0, USERNAME_MAX);
}

/**
 * Generate VALID usernames ONLY
 */
function generateUsernames(email: string, count: number): string[] {
  const rawPrefix = email.split("@")[0];
  const prefix = normalizeBase(rawPrefix);

  const suffixes = [
    "player",
    "pro",
    "gamer",
    "champ",
    "star",
    "king",
    "ninja",
    "sage",
    "hero",
    "legend",
    "titan",
    "viper",
  ];

  const usernames = new Set<string>();

  while (usernames.size < count) {
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    const randomNum = Math.floor(Math.random() * 9999);

    let candidate = `${prefix}_${suffix}_${randomNum}`;

    candidate = normalizeBase(candidate);
    candidate = clampLength(candidate);

    if (candidate.length >= USERNAME_MIN && candidate.length <= USERNAME_MAX) {
      usernames.add(candidate);
    }
  }

  return Array.from(usernames);
}

/**
 * GET /onboarding/suggest-username?email=user@example.com
 * ALWAYS returns exactly 6 AVAILABLE usernames
 */
onboardingRouter.get("/suggest-username", async (c) => {
  const email = c.req.query("email");

  if (!email) {
    return c.json({ error: "Email is required" }, 400);
  }

  try {
    const availableUsernames = new Set<string>();

    // keep generating until we have 6 available usernames
    while (availableUsernames.size < REQUIRED_SUGGESTIONS) {
      // generate extra buffer candidates
      const batchSize = (REQUIRED_SUGGESTIONS - availableUsernames.size) * 3;

      const candidates = generateUsernames(email, batchSize);

      // remove already accepted usernames
      const filteredCandidates = candidates.filter(
        (u) => !availableUsernames.has(u),
      );

      if (filteredCandidates.length === 0) continue;

      // 🔥 SINGLE DB QUERY
      const existing = await db.profile.findMany({
        where: {
          username: {
            in: filteredCandidates,
          },
        },
        select: {
          username: true,
        },
      });

      const takenSet = new Set(existing.map((u) => u.username));

      // add only available usernames
      for (const username of filteredCandidates) {
        if (!takenSet.has(username)) {
          availableUsernames.add(username);
        }

        if (availableUsernames.size === REQUIRED_SUGGESTIONS) break;
      }
    }

    return c.json(
      {
        usernames: Array.from(availableUsernames).map((username) => ({
          username,
          available: true, // We only added available usernames to the set
        })),
      },
      200,
    );
  } catch (error) {
    console.error("Error suggesting usernames:", error);
    return c.json({ error: "Failed to generate username suggestions" }, 500);
  }
});

onboardingRouter.get("/check-username", async (c) => {
  let username = c.req.query("username");

  if (!username) {
    return c.json({ error: "Username is required" }, 400);
  }

  username = clampLength(normalizeBase(username));

  if (username.length < USERNAME_MIN || username.length > USERNAME_MAX) {
    return c.json({ error: "Invalid username length" }, 400);
  }

  try {
    const existingUser = await db.profile.findFirst({
      where: { username },
      select: { id: true },
    });

    return c.json(
      {
        username,
        available: !existingUser,
      },
      200,
    );
  } catch (error) {
    console.error("Error checking username:", error);
    return c.json({ error: "Failed to check username availability" }, 500);
  }
});
