/*
  # Create Storage Bucket for Gallery Images

  1. Storage Setup
    - Creates a public storage bucket named 'gallery-images'
    - Enables public access for reading files
    - Configures policies for authenticated users to upload

  2. Security
    - Public read access (SELECT) for all users
    - Authenticated users can insert images (INSERT)
    - Only authenticated users can update/delete their uploads
    
  3. Purpose
    - Store gallery category thumbnail images
    - Store gallery images uploaded by admins
    - Provide public URLs for frontend display
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-images', 'gallery-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read access for gallery images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can upload gallery images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can update their gallery images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'gallery-images')
WITH CHECK (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can delete their gallery images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'gallery-images');