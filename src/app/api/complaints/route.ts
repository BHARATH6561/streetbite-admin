import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/complaints - List all complaints
export async function GET() {
  try {
    const { data: complaints, error } = await db
      .from('Complaint')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) {
      console.error('Supabase complaints GET error:', error)
      return corsError('Failed to fetch complaints: ' + error.message, 500)
    }
    return corsResponse({ success: true, complaints: complaints || [] })
  } catch (err) {
    console.error('Complaints GET exception:', err)
    return corsError('Failed to fetch complaints', 500)
  }
}

// POST /api/complaints - Create complaint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data: complaint, error } = await db
      .from('Complaint')
      .insert(body)
      .select()
      .single()

    if (error) {
      console.error('Supabase complaint POST error:', error)
      return corsError('Failed to create complaint: ' + error.message, 500)
    }
    return corsResponse({ success: true, complaint }, 201)
  } catch (err) {
    console.error('Complaint POST exception:', err)
    return corsError('Failed to create complaint', 500)
  }
}

// PUT /api/complaints - Update complaint
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return corsError('Complaint ID required')

    const { data: complaint, error } = await db
      .from('Complaint')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase complaint PUT error:', error)
      return corsError('Failed to update complaint: ' + error.message, 500)
    }
    return corsResponse({ success: true, complaint })
  } catch (err) {
    console.error('Complaint PUT exception:', err)
    return corsError('Failed to update complaint', 500)
  }
}

// DELETE /api/complaints - Delete complaint
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return corsError('Complaint ID required')

    const { error } = await db
      .from('Complaint')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase complaint DELETE error:', error)
      return corsError('Failed to delete complaint: ' + error.message, 500)
    }
    return corsResponse({ success: true, message: 'Complaint deleted' })
  } catch (err) {
    console.error('Complaint DELETE exception:', err)
    return corsError('Failed to delete complaint', 500)
  }
}
