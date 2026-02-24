import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadGalleryImages() {
  const categoryId = '5f2ff3ba-3191-422b-b71b-a9f99a860456';
  const categorySlug = 'ambjente-te-jashtme';

  const images = [
    { file: 'Ambjente_te_jashtme_1.jpg', contentType: 'image/jpeg' },
    { file: 'Ambjente_te_jashtme_2.png', contentType: 'image/png' }
  ];

  for (const img of images) {
    try {
      const filePath = path.join(process.cwd(), 'public', img.file);
      const fileBuffer = fs.readFileSync(filePath);

      const fileName = `gallery/${categorySlug}/${img.file}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, fileBuffer, {
          contentType: img.contentType,
          upsert: true
        });

      if (uploadError) {
        console.error(`Error uploading ${img.file}:`, uploadError);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName);

      const { data: insertData, error: insertError } = await supabase
        .from('gallery_images')
        .insert({
          category_id: categoryId,
          image_url: urlData.publicUrl,
          title: '',
          description: ''
        })
        .select();

      if (insertError) {
        console.error(`Error inserting ${img.file}:`, insertError);
      } else {
        console.log(`✓ Uploaded and inserted ${img.file} -> ${urlData.publicUrl}`);
      }
    } catch (err) {
      console.error(`Error processing ${img.file}:`, err);
    }
  }
}

uploadGalleryImages().then(() => {
  console.log('Gallery images upload complete!');
  process.exit(0);
}).catch(err => {
  console.error('Upload failed:', err);
  process.exit(1);
});
