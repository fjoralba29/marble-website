export interface Material {
  id: string;
  name: string;
  description: string;
  color: string;
  image_url: string;
  price_range: string;
  origin: string;
  finish_types: string[];
  created_at: string;
}

export interface GalleryCategory {
  id: string;
  name: string;
  description: string;
  thumbnail_url: string;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  category_id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}
