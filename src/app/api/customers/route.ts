import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/customers - List all customers
export async function GET() {
  try {
    const customers = await db.customer.findMany({ orderBy: { createdAt: 'desc' } })
    return corsResponse({ success: true, customers })
  } catch (err) {
    return corsError('Failed to fetch customers', 500)
  }
}

// POST /api/customers - Create customer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const customer = await db.customer.create({ data: body })
    return corsResponse({ success: true, customer }, 201)
  } catch (err) {
    return corsError('Failed to create customer', 500)
  }
}

// PUT /api/customers - Update customer
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return corsError('Customer ID required')
    const customer = await db.customer.update({ where: { id }, data: updates })
    return corsResponse({ success: true, customer })
  } catch (err) {
    return corsError('Failed to update customer', 500)
  }
}

// DELETE /api/customers - Delete customer
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return corsError('Customer ID required')
    await db.customer.delete({ where: { id } })
    return corsResponse({ success: true, message: 'Customer deleted' })
  } catch (err) {
    return corsError('Failed to delete customer', 500)
  }
}
