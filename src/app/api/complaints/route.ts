import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/complaints - List all complaints
export async function GET() {
  try {
    const complaints = await db.complaint.findMany({ orderBy: { createdAt: 'desc' } })
    return corsResponse({ success: true, complaints })
  } catch (err) {
    return corsError('Failed to fetch complaints', 500)
  }
}

// POST /api/complaints - Create complaint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const complaint = await db.complaint.create({ data: body })
    return corsResponse({ success: true, complaint }, 201)
  } catch (err) {
    return corsError('Failed to create complaint', 500)
  }
}

// PUT /api/complaints - Update complaint
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return corsError('Complaint ID required')
    const complaint = await db.complaint.update({ where: { id }, data: updates })
    return corsResponse({ success: true, complaint })
  } catch (err) {
    return corsError('Failed to update complaint', 500)
  }
}

// DELETE /api/complaints - Delete complaint
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return corsError('Complaint ID required')
    await db.complaint.delete({ where: { id } })
    return corsResponse({ success: true, message: 'Complaint deleted' })
  } catch (err) {
    return corsError('Failed to delete complaint', 500)
  }
}
