import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/app-settings - List all settings
export async function GET() {
  try {
    const { data: settings, error } = await db
      .from('AppSettings')
      .select('*')

    if (error) {
      console.error('Supabase app-settings GET error:', error)
      return corsError('Failed to fetch settings: ' + error.message, 500)
    }
    return corsResponse({ success: true, settings: settings || [] })
  } catch (err) {
    console.error('App-settings GET exception:', err)
    return corsError('Failed to fetch settings', 500)
  }
}

// POST /api/app-settings - Create or update setting (upsert by key)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, value } = body
    if (!key || value === undefined) return corsError('Key and value required')

    // Check if setting exists
    const { data: existing } = await db
      .from('AppSettings')
      .select('id')
      .eq('key', key)
      .maybeSingle()

    let result
    if (existing) {
      // Update existing
      const { data, error } = await db
        .from('AppSettings')
        .update({ value })
        .eq('key', key)
        .select()
        .single()
      if (error) {
        console.error('Supabase app-settings upsert-update error:', error)
        return corsError('Failed to save setting: ' + error.message, 500)
      }
      result = data
    } else {
      // Create new
      const { data, error } = await db
        .from('AppSettings')
        .insert({ key, value })
        .select()
        .single()
      if (error) {
        console.error('Supabase app-settings upsert-insert error:', error)
        return corsError('Failed to save setting: ' + error.message, 500)
      }
      result = data
    }

    return corsResponse({ success: true, setting: result })
  } catch (err) {
    console.error('App-settings POST exception:', err)
    return corsError('Failed to save setting', 500)
  }
}

// PUT /api/app-settings - Update setting
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return corsError('Setting ID required')

    const { data: setting, error } = await db
      .from('AppSettings')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase app-settings PUT error:', error)
      return corsError('Failed to update setting: ' + error.message, 500)
    }
    return corsResponse({ success: true, setting })
  } catch (err) {
    console.error('App-settings PUT exception:', err)
    return corsError('Failed to update setting', 500)
  }
}

// DELETE /api/app-settings - Delete setting
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return corsError('Setting ID required')

    const { error } = await db
      .from('AppSettings')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase app-settings DELETE error:', error)
      return corsError('Failed to delete setting: ' + error.message, 500)
    }
    return corsResponse({ success: true, message: 'Setting deleted' })
  } catch (err) {
    console.error('App-settings DELETE exception:', err)
    return corsError('Failed to delete setting', 500)
  }
}
