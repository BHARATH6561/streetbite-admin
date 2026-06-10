import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/customers - List all customers
export async function GET() {
  try {
    const { data: customers, error } = await db
      .from('Customer')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) {
      console.error('Supabase customers GET error:', error)
      return corsError('Failed to fetch customers: ' + error.message, 500)
    }
    return corsResponse({ success: true, customers: customers || [] })
  } catch (err) {
    console.error('Customers GET exception:', err)
    return corsError('Failed to fetch customers', 500)
  }
}

// POST /api/customers - Create customer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data: customer, error } = await db
      .from('Customer')
      .insert(body)
      .select()
      .single()

    if (error) {
      console.error('Supabase customer POST error:', error)
      return corsError('Failed to create customer: ' + error.message, 500)
    }
    return corsResponse({ success: true, customer }, 201)
  } catch (err) {
    console.error('Customer POST exception:', err)
    return corsError('Failed to create customer', 500)
  }
}

// PUT /api/customers - Update customer
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return corsError('Customer ID required')

    const { data: customer, error } = await db
      .from('Customer')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase customer PUT error:', error)
      return corsError('Failed to update customer: ' + error.message, 500)
    }
    return corsResponse({ success: true, customer })
  } catch (err) {
    console.error('Customer PUT exception:', err)
    return corsError('Failed to update customer', 500)
  }
}

// DELETE /api/customers - Delete customer
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return corsError('Customer ID required')

    const { error } = await db
      .from('Customer')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase customer DELETE error:', error)
      return corsError('Failed to delete customer: ' + error.message, 500)
    }
    return corsResponse({ success: true, message: 'Customer deleted' })
  } catch (err) {
    console.error('Customer DELETE exception:', err)
    return corsError('Failed to delete customer', 500)
  }
}
