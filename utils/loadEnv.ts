import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

/**
 * Loads environment variables from .env file without requiring dotenv package
 * Uses Node.js built-in fs module
 * This function runs automatically when the module is imported
 */
function loadEnv() {
  const envPath = resolve(process.cwd(), ".env");
  
  if (!existsSync(envPath)) {
    console.warn("⚠️  .env file not found. Using system environment variables.");
    return;
  }

  try {
    const envFile = readFileSync(envPath, "utf-8");
    const lines = envFile.split("\n");

    for (const line of lines) {
      // Skip empty lines and comments
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith("#")) {
        continue;
      }

      // Parse KEY=VALUE format
      const match = trimmedLine.match(/^([^=:#]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let value = match[2].trim();

        // Remove quotes if present
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        // Only set if not already set (system env takes precedence)
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  } catch (error) {
    console.error("❌ Error loading .env file:", error);
  }
}

// Auto-load environment variables when this module is imported
loadEnv();
