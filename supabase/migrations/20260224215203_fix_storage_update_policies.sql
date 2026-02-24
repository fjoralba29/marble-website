/*
  # Fix Storage Update Policies

  1. Changes
    - Allow public updates to existing files in gallery-images bucket
    - This enables the upload script to use upsert
    
  2. Note
    - In production, restrict to authenticated admin users
*/

DROP POLICY IF EXISTS "Authenticated users can update their gallery images" ON storage.objects;

CREATE POLICY "Allow public updates to gallery images"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'gallery-images')
WITH CHECK (bucket_id = 'gallery-images');