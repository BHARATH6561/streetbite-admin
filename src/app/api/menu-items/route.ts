import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/menu-items - List all menu items
export async function GET() {
  try {
    const { data: menuItems, error } = await db
      .from('MenuItem')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) {
      console.error('Supabase menu-items GET error:', error)
      return corsError('Failed to fetch menu items: ' + error.message, 500)
    }
    return corsResponse({ success: true, menuItems: menuItems || [] })
  } catch (err) {
    console.error('Menu-items GET exception:', err)
    return corsError('Failed to fetch menu items', 500)
  }
}

// POST /api/menu-items - Create menu item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const menuItemData = {
      name: body.name || '',
      price: parseFloat(body.price) || 0,
      vendorId: body.vendorId || null,
      available: body.available !== undefined ? body.available : true,
      ...(body.description && { description: body.description }),
      ...(body.category && { category: body.category }),
      ...(body.foodType && { foodType: body.foodType }),
      ...(body.photoUrl && { photoUrl: body.photoUrl }),
      ...(body.vendorName && { vendorName: body.vendorName }),
      ...(body.status && { status: body.status }),
    }
    const { data: menuItem, error } = await db
      .from('MenuItem')
      .insert(menuItemData)
      .select()
      .single()

    if (error) {
      console.error('Supabase menu-item POST error:', error)
      return corsError('Failed to create menu item: ' + error.message, 500)
    }
    return corsResponse({ success: true, menuItem }, 201)
  } catch (err) {
    console.error('Menu-item POST exception:', err)
    return corsError('Failed to create menu item', 500)
  }
}

// PUT /api/menu-items - Update menu item
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return corsError('Menu item ID required')

    const { data: menuItem, error } = await db
      .from('MenuItem')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase menu-item PUT error:', error)
      return corsError('Failed to update menu item: ' + error.message, 500)
    }
    return corsResponse({ success: true, menuItem })
  } catch (err) {
    console.error('Menu-item PUT exception:', err)
    return corsError('Failed to update menu item', 500)
  }
}

// DELETE /api/menu-items - Delete menu item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return corsError('Menu item ID required')

    const { error } = await db
      .from('MenuItem')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase menu-item DELETE error:', error)
      return corsError('Failed to delete menu item: ' + error.message, 500)
    }
    return corsResponse({ success: true, message: 'Menu item deleted' })
  } catch (err) {
    console.error('Menu-item DELETE exception:', err)
    return corsError('Failed to delete menu item', 500)
  }
}
