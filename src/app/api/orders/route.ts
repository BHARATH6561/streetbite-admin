import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/orders - List all orders
export async function GET() {
  try {
    const orders = await db.order.findMany({ orderBy: { createdAt: 'desc' } })
    return corsResponse({ success: true, orders })
  } catch (err) {
    return corsError('Failed to fetch orders', 500)
  }
}

// POST /api/orders - Create order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const order = await db.order.create({ data: body })
    return corsResponse({ success: true, order }, 201)
  } catch (err) {
    return corsError('Failed to create order', 500)
  }
}

// PUT /api/orders - Update order
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return corsError('Order ID required')
    const order = await db.order.update({ where: { id }, data: updates })
    return corsResponse({ success: true, order })
  } catch (err) {
    return corsError('Failed to update order', 500)
  }
}
