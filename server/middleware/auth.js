import jwt from "jsonwebtoken";

/**
 * @description - This method verifies the token
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {any} json
 */
export const verifyToken = (req, res, next) => {
  try {
    // check if token exists
    if (!req.headers.authorization)
      return res.status(401).json({ error: "Unauthorized" });

    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
