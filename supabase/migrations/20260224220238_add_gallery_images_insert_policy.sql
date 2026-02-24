/*
  # Add Insert Policy for Gallery Images

  1. Changes
    - Allow public (anon) users to insert into gallery_images table
    - This is needed for the upload script to add images
    
  2. Security Note
    - In production, restrict this to authenticated admin users only
    - For now, allowing public inserts for initial setup
*/

CREATE POLICY "Allow public inserts to gallery images"
ON gallery_images FOR INSERT
TO public
WITH CHECK (true);