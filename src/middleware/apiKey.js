import config from "../config/config.js";

/**
 * Middleware to validate API key
 * Checks for API key in headers: X-API-Key or Authorization: Bearer <key>
 */
export const validateApiKey = (req, res, next) => {
  // Extract API key from headers
  const apiKey =
    req.headers["x-api-key"] ||
    req.headers["authorization"]?.replace("Bearer ", "");

  // Check if API key is provided
  if (!apiKey) {
    return res.status(401).json({
      error: "Unauthorized",
      message:
        "API key is required. Provide it in X-API-Key header or Authorization header.",
    });
  }

  // Validate API key
  if (apiKey !== config.apiKey) {
    return res.status(403).json({
      error: "Forbidden",
      message: "Invalid API key",
    });
  }

  // API key is valid, continue
  next();
};

/**
 * Optional: Middleware that only validates API key in production
 * Useful for development - no key needed locally
 */
export const validateApiKeyProduction = (req, res, next) => {
  if (config.isProduction()) {
    return validateApiKey(req, res, next);
  }
  next();
};

export default validateApiKey;
