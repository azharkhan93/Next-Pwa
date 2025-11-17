import { randomInt } from "crypto";
import { prisma } from "./prisma";

/**
 * Generates a unique consumer ID with 3 to 5 numeric digits
 * @returns Promise<string> - A unique consumer ID (100-99999)
 * @throws Error if unable to generate unique ID after max attempts
 */
export async function generateConsumerId(): Promise<string> {
  let consumerId: string = "";
  let attempts = 0;
  const maxAttempts = 50; 

 
  while (attempts < maxAttempts) {
    try {
     
      const digitLength = randomInt(3, 6); 
      const min = Math.pow(10, digitLength - 1); 
      const max = Math.pow(10, digitLength) - 1; 
      const numericId = randomInt(min, max + 1);
      consumerId = String(numericId);

     
      const existing = await prisma.record.findUnique({
        where: { consumerId },
        select: { id: true },
      });

      if (!existing) {
        
        return consumerId;
      }

     
      attempts++;
    } catch {
      // If check fails, generate a fallback ID
      consumerId = String(randomInt(100, 100000));
      break;
    }
  }

  if (attempts >= maxAttempts || !consumerId) {
    throw new Error("Failed to generate unique consumer ID. Please try again.");
  }

  return consumerId;
}

