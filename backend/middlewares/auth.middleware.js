import jwt from "jsonwebtoken";

export function requireAdmin(req, res, next) {
  const hdr = req.headers.authorization || "";
  const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ success: false, message: "Missing token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.adminId) return res.status(401).json({ success: false, message: "Invalid token" });
    req.adminId = decoded.adminId;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}