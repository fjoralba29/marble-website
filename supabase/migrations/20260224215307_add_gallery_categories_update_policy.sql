/*
  # Add Update Policy for Gallery Categories

  1. Changes
    - Allow public (anon) users to update gallery_categories
    - This is needed for the upload script to update thumbnail URLs
    
  2. Security Note
    - In production, restrict this to authenticated admin users only
    - For now, allowing public updates for initial setup
*/

CREATE POLICY "Allow public updates to gallery categories"
ON gallery_categories FOR UPDATE
TO public
USING (true)
WITH CHECK (true);