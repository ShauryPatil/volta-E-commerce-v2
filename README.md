# ⚡ Volta — Complete E-Commerce Website

Full React + Supabase app: liquid glass design, email authentication, product browsing, seller dashboard, cart, and account — all backed by real Supabase CRUD operations.

## Pages
- **Home** — hero, categories, featured products
- **Shop** — all products, filter by category, click for detail modal
- **About** — company info
- **Login** — email signup / login (Supabase Auth)
- **Sell** — add / edit / delete your own product listings (only when logged in)
- **Cart** — add, change quantity, remove, checkout (creates an order)
- **Account** — edit profile, view order history

## Setup

### 1. Install
```bash
npm install react-router-dom @supabase/supabase-js
```

### 2. Create a Supabase project
Go to supabase.com → New Project → wait for it to finish setting up.

### 3. Get your keys
Settings → API → copy **Project URL** and **anon public key**.

### 4. Add keys to `src/supabase.js`
```javascript
export const SUPABASE_URL = 'https://your-project.supabase.co'
export const SUPABASE_ANON_KEY = 'your-anon-key'
```

### 5. Create the database
SQL Editor → New Query → paste everything from `schema.sql` → Run.

### 6. Run the app
```bash
npm run dev
```

## How it all connects
1. **Sign up / Login** on `/login` (Supabase Auth, email + password)
2. **Sell** a product on `/sell` → saved to `products` table
3. **Shop** page reads live from `products` table — your listing shows up immediately
4. **Add to Cart** → saved to `cart` table tied to your user id
5. **Cart page** lets you change quantity or remove items, synced to database
6. **Checkout** → writes a row to `orders` table, clears your cart
7. **Account page** → shows your editable profile and full order history

Every operation (Create, Read, Update, Delete) for products, cart, and profile goes through Supabase — nothing is stored only in local state.

## Database Tables
- `products` — seller_id, name, price, description, icon, image_url, cat, rating, reviews
- `profiles` — id (matches auth user), name, phone, address
- `cart` — user_id, product_id, product_name, price, icon, qty
- `orders` — user_id, items (json), total, status

All tables have Row Level Security — users can only see/edit their own cart, profile, and orders. Products are publicly viewable but only editable by their seller.
