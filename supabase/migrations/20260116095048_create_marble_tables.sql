/*
  # Create Marble Website Database Schema

  1. New Tables
    - `materials`
      - `id` (uuid, primary key)
      - `name` (text) - Material name
      - `description` (text) - Material description
      - `color` (text) - Primary color category
      - `image_url` (text) - Main image URL
      - `price_range` (text) - Price range indicator
      - `origin` (text) - Material origin
      - `finish_types` (text[]) - Available finishes
      - `created_at` (timestamptz)
    
    - `gallery_categories`
      - `id` (uuid, primary key)
      - `name` (text) - Category name (e.g., Kitchen, Bathroom)
      - `description` (text) - Category description
      - `thumbnail_url` (text) - Category thumbnail
      - `created_at` (timestamptz)
    
    - `gallery_images`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key)
      - `title` (text) - Image title
      - `description` (text) - Image description
      - `image_url` (text) - Image URL
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
*/

CREATE TABLE IF NOT EXISTS materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  color text NOT NULL,
  image_url text NOT NULL,
  price_range text DEFAULT '',
  origin text DEFAULT '',
  finish_types text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  thumbnail_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES gallery_categories(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Materials are publicly readable"
  ON materials FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Gallery categories are publicly readable"
  ON gallery_categories FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Gallery images are publicly readable"
  ON gallery_images FOR SELECT
  TO anon
  USING (true);