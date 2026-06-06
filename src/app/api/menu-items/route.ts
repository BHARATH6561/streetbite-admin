import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/menu-items - List all menu items
export async function GET() {
  try {
    const menuItems = await db.menuItem.findMany({ orderBy: { createdAt: 'desc' } })
    return corsResponse({ success: true, menuItems })
  } catch (err) {
    return corsError('Failed to fetch menu items', 500)
  }
}

// POST /api/menu-items - Create menu item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const menuItem = await db.menuItem.create({
      data: {
        name: body.name || '',
        description: body.description || null,
        category: body.category || null,
        foodType: body.foodType || 'VEG',
        price: parseFloat(body.price) || 0,
        photoUrl: body.photoUrl || null,
        vendorId: body.vendorId || '',
        vendorName: body.vendorName || null,
        status: 'pending',
      }
    })
    return corsResponse({ success: true, menuItem }, 201)
  } catch (err) {
    return corsError('Failed to create menu item', 500)
  }
}

// PUT /api/menu-items - Update menu item
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return corsError('Menu item ID required')
    const menuItem = await db.menuItem.update({ where: { id }, data: updates })
    return corsResponse({ success: true, menuItem })
  } catch (err) {
    return corsError('Failed to update menu item', 500)
  }
}

// DELETE /api/menu-items - Delete menu item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return corsError('Menu item ID required')
    await db.menuItem.delete({ where: { id } })
    return corsResponse({ success: true, message: 'Menu item deleted' })
  } catch (err) {
    return corsError('Failed to delete menu item', 500)
  }
}
