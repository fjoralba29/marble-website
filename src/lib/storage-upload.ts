import { supabase } from './supabase';

export async function uploadCategoryThumbnails() {
  const categories = [
    { name: 'Tualet', file: '/Tualet.jpg' },
    { name: 'Oxhak', file: '/Oxhak.jpg' },
    { name: 'Kuzhina', file: '/Kuzhina.jpg' },
    { name: 'Ambjente_te_jashtme', file: '/Ambjente_te_jashtme.jpg' }
  ];

  const results = [];

  for (const category of categories) {
    try {
      const response = await fetch(category.file);
      const blob = await response.blob();

      const fileName = `thumbnails/${category.name.toLowerCase()}.jpg`;

      const { data, error } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, blob, {
          contentType: 'image/jpeg',
          upsert: true
        });

      if (error) {
        console.error(`Error uploading ${category.name}:`, error);
        results.push({ category: category.name, success: false, error });
      } else {
        const { data: urlData } = supabase.storage
          .from('gallery-images')
          .getPublicUrl(fileName);

        results.push({
          category: category.name,
          success: true,
          url: urlData.publicUrl
        });
      }
    } catch (err) {
      console.error(`Error processing ${category.name}:`, err);
      results.push({ category: category.name, success: false, error: err });
    }
  }

  return results;
}

export function getStorageUrl(path: string): string {
  const { data } = supabase.storage
    .from('gallery-images')
    .getPublicUrl(path);

  return data.publicUrl;
}
