import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/app-settings - List all settings
export async function GET() {
  try {
    const settings = await db.appSettings.findMany()
    return corsResponse({ success: true, settings })
  } catch (err) {
    return corsError('Failed to fetch settings', 500)
  }
}

// POST /api/app-settings - Create or update setting
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, value } = body
    if (!key || value === undefined) return corsError('Key and value required')
    const setting = await db.appSettings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
    return corsResponse({ success: true, setting })
  } catch (err) {
    return corsError('Failed to save setting', 500)
  }
}

// PUT /api/app-settings - Update setting
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return corsError('Setting ID required')
    const setting = await db.appSettings.update({ where: { id }, data: updates })
    return corsResponse({ success: true, setting })
  } catch (err) {
    return corsError('Failed to update setting', 500)
  }
}

// DELETE /api/app-settings - Delete setting
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return corsError('Setting ID required')
    await db.appSettings.delete({ where: { id } })
    return corsResponse({ success: true, message: 'Setting deleted' })
  } catch (err) {
    return corsError('Failed to delete setting', 500)
  }
}
