import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadKuzhinaImages() {
  const categoryId = '68ea49fa-939b-4611-8a6f-bca98fdf2b30';
  const categorySlug = 'kuzhina';

  const images = [
    { file: 'Kuzhina_1.png', contentType: 'image/png' },
    { file: 'Kuzhina_2.jpg', contentType: 'image/jpeg' },
    { file: 'Kuzhina_3.jpg', contentType: 'image/jpeg' },
    { file: 'Kuzhina_4.jpg', contentType: 'image/jpeg' }
  ];

  console.log('Deleting previous Kuzhina images...');
  const { error: deleteError } = await supabase
    .from('gallery_images')
    .delete()
    .eq('category_id', categoryId);

  if (deleteError) {
    console.error('Error deleting previous images:', deleteError);
  } else {
    console.log('✓ Previous images deleted');
  }

  for (const img of images) {
    try {
      const filePath = path.join(process.cwd(), 'public', img.file);

      if (!fs.existsSync(filePath)) {
        console.log(`⚠ File not found: ${img.file}, skipping...`);
        continue;
      }

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

uploadKuzhinaImages().then(() => {
  console.log('Kuzhina images upload complete!');
  process.exit(0);
}).catch(err => {
  console.error('Upload failed:', err);
  process.exit(1);
});
