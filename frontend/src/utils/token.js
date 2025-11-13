
export function getUserFromToken(token) {
  try {
    if (!token) return null;
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    // token payload contains { id, role, iat, exp } according to backend
    return decoded;
  } catch (err) {
    return null;
  }
}
