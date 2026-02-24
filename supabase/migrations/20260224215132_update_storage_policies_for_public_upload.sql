/*
  # Update Storage Policies for Public Upload

  1. Changes
    - Allow public (anon) users to upload to gallery-images bucket
    - This is needed for the upload script to work
    
  2. Security Note
    - In production, you should restrict this to authenticated admin users only
    - For now, allowing public upload for initial setup
*/

DROP POLICY IF EXISTS "Authenticated users can upload gallery images" ON storage.objects;

CREATE POLICY "Allow public uploads to gallery images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'gallery-images');