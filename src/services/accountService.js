import { supabase } from '../supabase.js'

export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()
  return { data, error }
}

export async function createProfile(userId, name, phone, address) {
  const { data, error } = await supabase
    .from('profiles')
    .insert([{ id: userId, name, phone, address }])
    .select()
    .single()
  return { data, error }
}

export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  return { data, error }
}

export async function getOrderHistory(userId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function createOrder(userId, items, total) {
  const { data, error } = await supabase
    .from('orders')
    .insert([{ user_id: userId, items: items, total: total, status: 'pending' }])
    .select()
    .single()
  return { data, error }
}
