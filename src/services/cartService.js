import { supabase } from '../supabase.js'

export async function getCartItems(userId) {
  const { data, error } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })
  return { data, error }
}

export async function addToCart(userId, productId, productName, price, icon, qty) {
  const { data: existing } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .maybeSingle()

  if (existing) {
    const { data, error } = await supabase
      .from('cart')
      .update({ qty: existing.qty + qty })
      .eq('id', existing.id)
      .select()
      .single()
    return { data, error }
  }

  const { data, error } = await supabase
    .from('cart')
    .insert([{
      user_id: userId,
      product_id: productId,
      product_name: productName,
      price: price,
      icon: icon,
      qty: qty
    }])
    .select()
    .single()
  return { data, error }
}

export async function updateCartQty(cartId, qty) {
  const { data, error } = await supabase
    .from('cart')
    .update({ qty: qty })
    .eq('id', cartId)
    .select()
    .single()
  return { data, error }
}

export async function removeFromCart(cartId) {
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('id', cartId)
  return { error }
}

export async function clearCart(userId) {
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('user_id', userId)
  return { error }
}
