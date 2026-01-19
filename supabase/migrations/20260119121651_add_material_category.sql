/*
  # Add Material Category Field

  1. Changes
    - Add `category` column to `materials` table
    - Update existing materials to have categories
  
  2. Notes
    - Categories include: Granite, Marble, Porcelain, Quartzite, etc.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'materials' AND column_name = 'category'
  ) THEN
    ALTER TABLE materials ADD COLUMN category text NOT NULL DEFAULT 'Marble';
  END IF;
END $$;

UPDATE materials SET category = 'Marble' WHERE category = 'Marble' OR category IS NULL;