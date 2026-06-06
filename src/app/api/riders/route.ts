import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/riders - List all riders
export async function GET() {
  try {
    const riders = await db.rider.findMany({ orderBy: { createdAt: 'desc' } })
    return corsResponse({ success: true, riders })
  } catch (err) {
    return corsError('Failed to fetch riders', 500)
  }
}

// POST /api/riders - Create rider
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const rider = await db.rider.create({ data: body })
    return corsResponse({ success: true, rider }, 201)
  } catch (err) {
    return corsError('Failed to create rider', 500)
  }
}

// PUT /api/riders - Update rider
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return corsError('Rider ID required')
    const rider = await db.rider.update({ where: { id }, data: updates })
    return corsResponse({ success: true, rider })
  } catch (err) {
    return corsError('Failed to update rider', 500)
  }
}

// DELETE /api/riders - Delete rider
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return corsError('Rider ID required')
    await db.rider.delete({ where: { id } })
    return corsResponse({ success: true, message: 'Rider deleted' })
  } catch (err) {
    return corsError('Failed to delete rider', 500)
  }
}
