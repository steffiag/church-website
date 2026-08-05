const requests = new Map();

export function getClientAddress(req) {
  const forwarded = req.headers["x-forwarded-for"];
  return Array.isArray(forwarded)
    ? forwarded[0]
    : forwarded?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
}

export function isRateLimited(key, limit = 3, windowMs = 60 * 60 * 1000) {
  const now = Date.now();
  const recentRequests = (requests.get(key) || []).filter(
    (timestamp) => now - timestamp < windowMs
  );

  if (recentRequests.length >= limit) {
    requests.set(key, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requests.set(key, recentRequests);
  return false;
}

export function isAllowedOrigin(req) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN;
  if (!allowedOrigin) return true;

  const origin = req.headers.origin;
  return allowedOrigin
    .split(",")
    .map((value) => value.trim())
    .includes(origin);
}
