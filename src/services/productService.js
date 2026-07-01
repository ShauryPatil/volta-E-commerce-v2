import { supabase } from '../supabase.js'

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function getUserProducts(userId) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('seller_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function addProduct(userId, name, price, description, icon, cat) {
  const { data, error } = await supabase
    .from('products')
    .insert([{
      seller_id: userId,
      name: name,
      price: price,
      description: description,
      icon: icon,
      cat: cat,
      rating: 4,
      reviews: 0
    }])
    .select()
    .single()
  return { data, error }
}

export async function updateProduct(productId, updates) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', productId)
    .select()
    .single()
  return { data, error }
}

export async function deleteProduct(productId) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)
  return { error }
}
