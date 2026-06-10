import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/vendors - List all vendors
export async function GET() {
  try {
    const { data: vendors, error } = await db
      .from('Vendor')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) {
      console.error('Supabase vendors GET error:', error)
      return corsError('Failed to fetch vendors: ' + error.message, 500)
    }
    return corsResponse({ success: true, vendors: vendors || [] })
  } catch (err) {
    console.error('Vendors GET exception:', err)
    return corsError('Failed to fetch vendors', 500)
  }
}

// POST /api/vendors - Create vendor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data: vendor, error } = await db
      .from('Vendor')
      .insert(body)
      .select()
      .single()

    if (error) {
      console.error('Supabase vendor POST error:', error)
      return corsError('Failed to create vendor: ' + error.message, 500)
    }
    return corsResponse({ success: true, vendor }, 201)
  } catch (err) {
    console.error('Vendor POST exception:', err)
    return corsError('Failed to create vendor', 500)
  }
}

// PUT /api/vendors - Update vendor
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return corsError('Vendor ID required')

    const { data: vendor, error } = await db
      .from('Vendor')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase vendor PUT error:', error)
      return corsError('Failed to update vendor: ' + error.message, 500)
    }
    return corsResponse({ success: true, vendor })
  } catch (err) {
    console.error('Vendor PUT exception:', err)
    return corsError('Failed to update vendor', 500)
  }
}

// DELETE /api/vendors - Delete vendor
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return corsError('Vendor ID required')

    const { error } = await db
      .from('Vendor')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase vendor DELETE error:', error)
      return corsError('Failed to delete vendor: ' + error.message, 500)
    }
    return corsResponse({ success: true, message: 'Vendor deleted' })
  } catch (err) {
    console.error('Vendor DELETE exception:', err)
    return corsError('Failed to delete vendor', 500)
  }
}
