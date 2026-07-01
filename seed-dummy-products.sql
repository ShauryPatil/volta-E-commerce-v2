-- ============================
-- ADD DUMMY PRODUCTS FOR TESTING
-- ============================
-- 1. Go to Supabase Dashboard -> Authentication -> Users
-- 2. Copy your own user UUID (the account you'll log in with)
-- 3. Paste it in place of 'PASTE_YOUR_USER_ID_HERE' below (in every row)
-- 4. Run this in the Supabase SQL Editor

insert into products (seller_id, name, price, description, icon, cat, rating, reviews)
values
  ('PASTE_YOUR_USER_ID_HERE', 'AeroBook Pro 14', 89999, 'Lightweight 14-inch laptop with all-day battery life and a stunning OLED display.', '💻', 'Laptops', 5, 128),
  ('PASTE_YOUR_USER_ID_HERE', 'Pulse Wireless Earbuds', 4999, 'Noise-cancelling earbuds with 30-hour battery life and crystal-clear audio.', '🎧', 'Audio', 4, 76),
  ('PASTE_YOUR_USER_ID_HERE', 'Orbit Smartwatch', 12999, 'Fitness tracking smartwatch with heart-rate monitoring and a 7-day battery.', '⌚', 'Wearables', 5, 54),
  ('PASTE_YOUR_USER_ID_HERE', 'Vista 27" 4K Monitor', 34999, 'Ultra-sharp 27-inch 4K monitor for creators and gamers alike.', '🖥️', 'Monitors', 4, 39);
