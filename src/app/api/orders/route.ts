import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/orders - List all orders
export async function GET() {
  try {
    const { data: orders, error } = await db
      .from('Order')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) {
      console.error('Supabase orders GET error:', error)
      return corsError('Failed to fetch orders: ' + error.message, 500)
    }
    return corsResponse({ success: true, orders: orders || [] })
  } catch (err) {
    console.error('Orders GET exception:', err)
    return corsError('Failed to fetch orders', 500)
  }
}

// POST /api/orders - Create order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data: order, error } = await db
      .from('Order')
      .insert(body)
      .select()
      .single()

    if (error) {
      console.error('Supabase order POST error:', error)
      return corsError('Failed to create order: ' + error.message, 500)
    }
    return corsResponse({ success: true, order }, 201)
  } catch (err) {
    console.error('Order POST exception:', err)
    return corsError('Failed to create order', 500)
  }
}

// PUT /api/orders - Update order
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return corsError('Order ID required')

    const { data: order, error } = await db
      .from('Order')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase order PUT error:', error)
      return corsError('Failed to update order: ' + error.message, 500)
    }
    return corsResponse({ success: true, order })
  } catch (err) {
    console.error('Order PUT exception:', err)
    return corsError('Failed to update order', 500)
  }
}
