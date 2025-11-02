import { createHash, randomBytes } from "crypto";

/**
 * Hash a password using SHA-256 with salt
 * Using Node's built-in crypto module (no external dependencies)
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = createHash("sha256")
    .update(password + salt)
    .digest("hex");
  return `${salt}:${hash}`;
}

/**
 * Verify a password against a hashed password
 */
export function verifyPassword(
  password: string,
  hashedPassword: string
): boolean {
  const [salt, hash] = hashedPassword.split(":");
  const passwordHash = createHash("sha256")
    .update(password + salt)
    .digest("hex");
  return passwordHash === hash;
}
