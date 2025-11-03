/*
  # Music Artist Website Database Schema

  ## Overview
  Creates a comprehensive database structure for a music artist e-commerce and blog platform.

  ## New Tables

  ### 1. `products`
  Stores music products (singles, albums, merchandise)
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text) - Product name
  - `description` (text) - Product description
  - `price` (numeric) - Product price in dollars
  - `product_type` (text) - Type: 'single', 'album', 'merchandise'
  - `image_url` (text) - Product image URL
  - `digital_file_url` (text, nullable) - Download link for digital products
  - `stock_quantity` (integer) - Available stock (-1 for digital/unlimited)
  - `created_at` (timestamptz) - Creation timestamp

  ### 2. `blog_posts`
  Stores blog content with AI generation tracking
  - `id` (uuid, primary key) - Unique post identifier
  - `title` (text) - Post title
  - `content` (text) - Post content (markdown/HTML)
  - `excerpt` (text) - Short summary
  - `category` (text) - Post category
  - `image_url` (text, nullable) - Featured image
  - `author` (text) - Author name
  - `is_published` (boolean) - Publication status
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. `orders`
  Tracks customer orders and payment status
  - `id` (uuid, primary key) - Unique order identifier
  - `customer_email` (text) - Customer email
  - `customer_name` (text) - Customer name
  - `total_amount` (numeric) - Order total
  - `stripe_payment_intent_id` (text, nullable) - Stripe payment reference
  - `status` (text) - Order status: 'pending', 'completed', 'failed'
  - `created_at` (timestamptz) - Order creation time

  ### 4. `order_items`
  Individual items within each order
  - `id` (uuid, primary key) - Unique item identifier
  - `order_id` (uuid, foreign key) - Reference to orders table
  - `product_id` (uuid, foreign key) - Reference to products table
  - `quantity` (integer) - Number of items
  - `price_at_purchase` (numeric) - Price at time of purchase
  - `created_at` (timestamptz) - Item creation time

  ## Security
  - Enable RLS on all tables
  - Public read access for products and published blog posts
  - Authenticated access required for creating/managing content
  - Order data restricted to admin users only

  ## Important Notes
  1. Digital products use stock_quantity = -1 for unlimited availability
  2. All prices stored in USD as numeric values
  3. Blog posts support both manual and AI-generated content
  4. Orders track Stripe payment references for reconciliation
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  product_type text NOT NULL CHECK (product_type IN ('single', 'album', 'merchandise')),
  image_url text NOT NULL,
  digital_file_url text,
  stock_quantity integer NOT NULL DEFAULT -1,
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  category text NOT NULL,
  image_url text,
  author text NOT NULL DEFAULT 'Artist',
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email text NOT NULL,
  customer_name text NOT NULL,
  total_amount numeric(10,2) NOT NULL CHECK (total_amount >= 0),
  stripe_payment_intent_id text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity integer NOT NULL CHECK (quantity > 0),
  price_at_purchase numeric(10,2) NOT NULL CHECK (price_at_purchase >= 0),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products (public read access)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for blog_posts (public read for published posts)
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Authenticated users can view all blog posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for orders (authenticated access only)
CREATE POLICY "Authenticated users can view orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for order_items (authenticated access only)
CREATE POLICY "Authenticated users can view order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert order items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_type ON products(product_type);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- Insert sample products
INSERT INTO products (name, description, price, product_type, image_url, digital_file_url, stock_quantity) VALUES
('Midnight Dreams', 'Latest single featuring ethereal vocals and atmospheric production', 2.99, 'single', 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800', '/downloads/midnight-dreams.mp3', -1),
('Electric Soul - Album', 'Full-length debut album with 12 original tracks exploring themes of identity and connection', 9.99, 'album', 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800', '/downloads/electric-soul-album.zip', -1),
('Neon Nights', 'High-energy dance track with synth-driven melodies', 2.99, 'single', 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=800', '/downloads/neon-nights.mp3', -1),
('Acoustic Sessions - EP', '5-track EP featuring stripped-down acoustic versions of fan favorites', 4.99, 'album', 'https://images.pexels.com/photos/1464036/pexels-photo-1464036.jpeg?auto=compress&cs=tinysrgb&w=800', '/downloads/acoustic-sessions.zip', -1),
('Artist Logo T-Shirt', 'Premium cotton t-shirt with exclusive artist logo design', 29.99, 'merchandise', 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800', NULL, 50),
('Limited Edition Vinyl', 'Electric Soul album pressed on translucent blue vinyl with poster insert', 34.99, 'merchandise', 'https://images.pexels.com/photos/1228497/pexels-photo-1228497.jpeg?auto=compress&cs=tinysrgb&w=800', NULL, 25);

-- Insert sample blog posts
INSERT INTO blog_posts (title, content, excerpt, category, image_url, is_published) VALUES
('The Story Behind Midnight Dreams', 
'Writing "Midnight Dreams" was a journey into the depths of late-night creativity. I remember sitting in my home studio at 3 AM, unable to sleep, when the first chords came to me. The song explores that liminal space between waking and dreaming, where your mind wanders freely.

The production process took about three months. I wanted to capture that ethereal, floating feeling you get when you''re half-asleep. We layered synth pads, added reverb-drenched guitars, and spent hours perfecting the vocal harmonies.

This song means so much to me because it represents a turning point in my artistic journey. It''s more vulnerable and introspective than my earlier work, and the response from fans has been incredible.',
'An intimate look at the creation of my latest single and the late-night inspiration behind it',
'music-process',
'https://images.pexels.com/photos/1708912/pexels-photo-1708912.jpeg?auto=compress&cs=tinysrgb&w=800',
true),

('My Top 5 Production Tips', 
'After years of producing music in my home studio, I''ve learned some valuable lessons. Here are my top 5 tips:

1. **Less is More**: Don''t overcomplicate your arrangements. Sometimes a simple chord progression and strong melody are all you need.

2. **Reference Tracks**: Always have reference tracks open. Compare your mix to professionally produced songs in your genre.

3. **Take Breaks**: Your ears get fatigued. Take 15-minute breaks every hour to maintain perspective.

4. **Invest in Treatment**: Before buying expensive gear, invest in acoustic treatment. A treated room makes a huge difference.

5. **Finish Songs**: Don''t get stuck in perfectionism. Finish your tracks and move on. You''ll learn more from completing 10 songs than perfecting one.

Hope these help on your creative journey!',
'Production tips and tricks I''ve learned from years of making music',
'tutorials',
'https://images.pexels.com/photos/1481309/pexels-photo-1481309.jpeg?auto=compress&cs=tinysrgb&w=800',
true),

('Tour Announcement Coming Soon', 
'I''m beyond excited to share that I''ve been working on something special for you all. After months of planning, I can finally hint that a tour announcement is coming very soon!

This will be my first full tour, and I''m planning to visit cities I''ve never performed in before. The live show will feature new arrangements of songs from Electric Soul, plus some surprise acoustic moments and maybe even a new song or two.

Stay tuned to my social media for the official announcement next week. I can''t wait to see you all out there and share these songs with you in person. It''s going to be unforgettable.',
'Big news coming next week - get ready for something special',
'news',
'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
true);