import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/riders - List all riders
export async function GET() {
  try {
    const { data: riders, error } = await db
      .from('Rider')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) {
      console.error('Supabase riders GET error:', error)
      return corsError('Failed to fetch riders: ' + error.message, 500)
    }
    return corsResponse({ success: true, riders: riders || [] })
  } catch (err) {
    console.error('Riders GET exception:', err)
    return corsError('Failed to fetch riders', 500)
  }
}

// POST /api/riders - Create rider
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data: rider, error } = await db
      .from('Rider')
      .insert(body)
      .select()
      .single()

    if (error) {
      console.error('Supabase rider POST error:', error)
      return corsError('Failed to create rider: ' + error.message, 500)
    }
    return corsResponse({ success: true, rider }, 201)
  } catch (err) {
    console.error('Rider POST exception:', err)
    return corsError('Failed to create rider', 500)
  }
}

// PUT /api/riders - Update rider
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return corsError('Rider ID required')

    const { data: rider, error } = await db
      .from('Rider')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase rider PUT error:', error)
      return corsError('Failed to update rider: ' + error.message, 500)
    }
    return corsResponse({ success: true, rider })
  } catch (err) {
    console.error('Rider PUT exception:', err)
    return corsError('Failed to update rider', 500)
  }
}

// DELETE /api/riders - Delete rider
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return corsError('Rider ID required')

    const { error } = await db
      .from('Rider')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase rider DELETE error:', error)
      return corsError('Failed to delete rider: ' + error.message, 500)
    }
    return corsResponse({ success: true, message: 'Rider deleted' })
  } catch (err) {
    console.error('Rider DELETE exception:', err)
    return corsError('Failed to delete rider', 500)
  }
}
