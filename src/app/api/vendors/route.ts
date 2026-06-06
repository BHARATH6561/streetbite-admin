import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/vendors - List all vendors
export async function GET() {
  try {
    const vendors = await db.vendor.findMany({ orderBy: { createdAt: 'desc' } })
    return corsResponse({ success: true, vendors })
  } catch (err) {
    return corsError('Failed to fetch vendors', 500)
  }
}

// POST /api/vendors - Create vendor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const vendor = await db.vendor.create({ data: body })
    return corsResponse({ success: true, vendor }, 201)
  } catch (err) {
    return corsError('Failed to create vendor', 500)
  }
}

// PUT /api/vendors - Update vendor
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return corsError('Vendor ID required')
    const vendor = await db.vendor.update({ where: { id }, data: updates })
    return corsResponse({ success: true, vendor })
  } catch (err) {
    return corsError('Failed to update vendor', 500)
  }
}

// DELETE /api/vendors - Delete vendor
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return corsError('Vendor ID required')
    await db.vendor.delete({ where: { id } })
    return corsResponse({ success: true, message: 'Vendor deleted' })
  } catch (err) {
    return corsError('Failed to delete vendor', 500)
  }
}
