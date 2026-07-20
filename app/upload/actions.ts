// src/app/upload/actions.ts
"use server";

import { PDFParse } from "pdf-parse";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";
import type { Roles } from "@/types/globals";

export async function processPdfFile(formData: FormData) {
  // Verify user has permission
  const { sessionClaims } = await auth.protect();
  const userRole = sessionClaims?.metadata?.role as Roles;
  
  if (!userRole || !["admin", "premium-user"].includes(userRole)) {
    return {
      success: false,
      error: "Access denied. This feature is only available for Premium Users and Administrators.",
    };
  }
  try {
    const file = formData.get("pdf") as File;

    // Convert File to Buffer and extract text
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const parser = new PDFParse({ data: buffer });
    const data = await parser.getText();
    await parser.destroy();

    if (!data.text || data.text.trim().length === 0) {
      return {
        success: false,
        error: "No text found in PDF",
      };
    }

    // Chunk the text
    const chunks = await chunkContent(data.text);

    // Generate embeddings
    const embeddings = await generateEmbeddings(chunks);

    // Store in database
    const records = chunks.map((chunk, index) => ({
      content: chunk,
      embedding: embeddings[index],
    }));

    await db.insert(documents).values(records);

    return {
      success: true,
      message: `Created ${records.length} searchable chunks`,
    };
  } catch (error) {
    console.error("PDF processing error:", error);
    return {
      success: false,
      error: "Failed to process PDF",
    };
  }
}
