/*
  # Create Contact Inquiries Table

  1. New Tables
    - `contact_inquiries`
      - `id` (uuid, primary key) - Unique identifier for each inquiry
      - `name` (text) - Full name of the person contacting
      - `email` (text) - Email address for follow-up
      - `phone` (text, optional) - Phone number if provided
      - `message` (text) - The inquiry message
      - `status` (text) - Status of the inquiry (new, in_progress, resolved)
      - `created_at` (timestamptz) - When the inquiry was submitted
      - `updated_at` (timestamptz) - Last time the inquiry was updated

  2. Security
    - Enable RLS on `contact_inquiries` table
    - Add policy for anyone to insert inquiries (public form)
    - Add policy for authenticated users to read inquiries (admin access)

  3. Indexes
    - Index on created_at for efficient sorting
    - Index on status for filtering
*/

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact inquiries"
  ON contact_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all inquiries"
  ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update inquiry status"
  ON contact_inquiries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON contact_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries(status);
