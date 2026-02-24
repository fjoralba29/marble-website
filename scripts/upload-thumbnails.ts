import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadThumbnails() {
  const thumbnails = [
    { id: '70c81848-293b-406d-8b78-2876255d1279', name: 'Tualet', file: 'Tualet.jpg' },
    { id: '11a5192a-f7d6-48a2-8c07-b30974894f13', name: 'Oxhak', file: 'Oxhak.jpg' },
    { id: '68ea49fa-939b-4611-8a6f-bca98fdf2b30', name: 'Kuzhina', file: 'Kuzhina.jpg' },
    { id: '5f2ff3ba-3191-422b-b71b-a9f99a860456', name: 'Ambjente të jashtme', file: 'Ambjente_te_jashtme.jpg' }
  ];

  for (const thumb of thumbnails) {
    try {
      const filePath = path.join(process.cwd(), 'public', thumb.file);
      const fileBuffer = fs.readFileSync(filePath);

      const fileName = `thumbnails/${thumb.file}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, fileBuffer, {
          contentType: 'image/jpeg',
          upsert: true
        });

      if (uploadError) {
        console.error(`Error uploading ${thumb.name}:`, uploadError);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName);

      const { data: updateData, error: updateError } = await supabase
        .from('gallery_categories')
        .update({ thumbnail_url: urlData.publicUrl })
        .eq('id', thumb.id)
        .select();

      if (updateError) {
        console.error(`Error updating ${thumb.name}:`, updateError);
      } else if (!updateData || updateData.length === 0) {
        console.log(`⚠ No category found with name: ${thumb.name}`);
      } else {
        console.log(`✓ Uploaded and updated ${thumb.name} -> ${urlData.publicUrl}`);
      }
    } catch (err) {
      console.error(`Error processing ${thumb.name}:`, err);
    }
  }
}

uploadThumbnails().then(() => {
  console.log('Upload complete!');
  process.exit(0);
}).catch(err => {
  console.error('Upload failed:', err);
  process.exit(1);
});