-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  image TEXT,
  category TEXT,
  brand TEXT,
  use_cases TEXT[] DEFAULT '{}',
  specs JSONB DEFAULT '{}',
  stock INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  status TEXT DEFAULT 'pending',
  total INTEGER NOT NULL,
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending',
  delivery_address TEXT,
  delivery_location TEXT,
  delivery_fee INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products NOT NULL,
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Products policies
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Orders policies
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view their own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own order items" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (new.id, new.raw_user_meta_data->>'name', new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert sample products
INSERT INTO products (name, description, price, image, category, brand, use_cases, specs, stock, featured)
VALUES
  ('Dell XPS 15 Laptop', 'High-performance laptop for professionals with 11th Gen Intel Core i7, 16GB RAM, 512GB SSD', 185000, '/placeholder.svg?height=300&width=300', 'laptops', 'dell', ARRAY['office', 'programming'], '{"processor": "Intel Core i7-11800H", "memory": "16GB DDR4", "storage": "512GB SSD", "display": "15.6-inch 4K UHD"}', 10, true),
  ('HP Pavilion Gaming Desktop', 'Gaming desktop with AMD Ryzen 7, 16GB RAM, 1TB SSD, NVIDIA RTX 3060', 145000, '/placeholder.svg?height=300&width=300', 'desktops', 'hp', ARRAY['gaming', 'graphics'], '{"processor": "AMD Ryzen 7 5700G", "memory": "16GB DDR4", "storage": "1TB SSD", "graphics": "NVIDIA RTX 3060"}', 5, true),
  ('MacBook Pro 16-inch', 'Apple M1 Pro chip, 16GB RAM, 512GB SSD, 16-inch Retina display', 320000, '/placeholder.svg?height=300&width=300', 'laptops', 'apple', ARRAY['graphics', 'programming'], '{"processor": "Apple M1 Pro", "memory": "16GB", "storage": "512GB SSD", "display": "16-inch Retina"}', 8, true),
  ('Lenovo ThinkPad X1 Carbon', 'Business laptop with Intel Core i7, 16GB RAM, 1TB SSD, 14-inch display', 195000, '/placeholder.svg?height=300&width=300', 'laptops', 'lenovo', ARRAY['office', 'business'], '{"processor": "Intel Core i7", "memory": "16GB", "storage": "1TB SSD", "display": "14-inch FHD"}', 12, false),
  ('Logitech MX Master 3 Mouse', 'Advanced wireless mouse with customizable buttons and precision scrolling', 12500, '/placeholder.svg?height=300&width=300', 'accessories', 'logitech', ARRAY['office', 'graphics'], '{"connectivity": "Bluetooth", "battery": "Up to 70 days", "buttons": "7 customizable"}', 20, false),
  ('ASUS ROG Strix Gaming Desktop', 'High-end gaming PC with Intel Core i9, 32GB RAM, 2TB SSD, NVIDIA RTX 3080', 350000, '/placeholder.svg?height=300&width=300', 'desktops', 'asus', ARRAY['gaming', '3d'], '{"processor": "Intel Core i9", "memory": "32GB DDR4", "storage": "2TB SSD", "graphics": "NVIDIA RTX 3080"}', 3, true),
  ('Microsoft Surface Pro 8', '2-in-1 laptop with Intel Core i5, 8GB RAM, 256GB SSD, 13-inch touchscreen', 145000, '/placeholder.svg?height=300&width=300', 'laptops', 'microsoft', ARRAY['office', 'education'], '{"processor": "Intel Core i5", "memory": "8GB", "storage": "256GB SSD", "display": "13-inch touchscreen"}', 7, false),
  ('Samsung 34-inch Curved Monitor', 'Ultra-wide curved monitor for immersive viewing experience', 65000, '/placeholder.svg?height=300&width=300', 'accessories', 'samsung', ARRAY['gaming', 'graphics'], '{"size": "34-inch", "resolution": "3440x1440", "refresh_rate": "144Hz", "panel": "VA"}', 6, false),
  ('Acer Predator Helios Gaming Laptop', 'Gaming laptop with Intel Core i7, 16GB RAM, 1TB SSD, NVIDIA RTX 3070', 210000, '/placeholder.svg?height=300&width=300', 'laptops', 'acer', ARRAY['gaming', '3d'], '{"processor": "Intel Core i7", "memory": "16GB", "storage": "1TB SSD", "graphics": "NVIDIA RTX 3070"}', 4, true),
  ('HP LaserJet Pro Printer', 'Wireless laser printer for office use with duplex printing', 35000, '/placeholder.svg?height=300&  'Wireless laser printer for office use with duplex printing', 35000, '/placeholder.svg?height=300&width=300', 'accessories', 'hp', ARRAY['office', 'business'], '{"connectivity": "Wireless", "print_speed": "30 ppm", "duplex": "Yes", "paper_capacity": "250 sheets"}', 15, false),
  ('Network Security Audit', 'Comprehensive security assessment and recommendations for your network', 75000, '/placeholder.svg?height=300&width=300', 'services', 'alexanderlabs', ARRAY['business', 'office'], '{"duration": "2 weeks", "deliverables": "Full report and recommendations", "includes": "Vulnerability assessment, penetration testing"}', 999, false),
  ('Cloud Migration Service', 'Professional service to migrate your infrastructure to the cloud', 120000, '/placeholder.svg?height=300&width=300', 'services', 'alexanderlabs', ARRAY['business', 'office'], '{"duration": "4 weeks", "deliverables": "Migration plan and execution", "includes": "Assessment, planning, migration, testing"}', 999, false);
