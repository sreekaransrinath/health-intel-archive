import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

// Ensure the database directory exists (especially if it's outside the immediate project dir in production)
// For this local setup, it will be in backend/data/
const dbDir = path.join(__dirname, '..', '..', 'data'); // backend/data
const dbPath = path.join(dbDir, 'medis.db');

let db: Database;

export async function initializeDatabase(): Promise<void> {
  try {
    // Node.js fs.mkdirSync is not directly available here. 
    // The open function from 'sqlite' should handle directory creation if the path is valid
    // or fail gracefully if it cannot create the file.
    // For a robust solution, directory creation should be handled by a script or manually before running the app.

    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    console.log('Connected to the SQLite database.');

    // Create tables if they don't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS documents (
        id TEXT PRIMARY KEY,
        filename TEXT NOT NULL,
        original_filename TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        size INTEGER NOT NULL,
        storage_path TEXT NOT NULL, -- Path to the original uploaded file
        ocr_output_path TEXT,      -- Path to the OCR processed text file
        status TEXT DEFAULT 'pending', -- e.g., pending, processing, processed, error
        category TEXT,             -- To be populated by LLM
        extracted_text TEXT,       -- Full OCRed text (can be large, consider separate storage or table if very large)
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS document_metadata (
        id TEXT PRIMARY KEY,
        document_id TEXT NOT NULL,
        field_name TEXT NOT NULL,     -- e.g., 'date_of_service', 'provider_name'
        field_value TEXT NOT NULL,
        extraction_confidence REAL,   -- Confidence score from LLM/OCR
        source TEXT,                  -- e.g., 'ocr_raw', 'llm_extracted_v1', 'user_edited'
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS document_versions (
        id TEXT PRIMARY KEY,
        document_id TEXT NOT NULL,
        version_number INTEGER NOT NULL,
        changes TEXT, -- JSON diff or description of changes
        created_by TEXT, -- User ID or system process
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
      );
      
      -- More tables can be added here (e.g., for relationships, LLM processing queue)
    `);

    console.log('Database tables ensured.');

  } catch (error) {
    console.error('Error initializing database:', error);
    throw error; // Re-throw to be caught by server startup
  }
}

export function getDb(): Database {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return db;
} 