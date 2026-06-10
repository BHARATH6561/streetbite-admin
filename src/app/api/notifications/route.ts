import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/notifications - List all notification logs
export async function GET() {
  try {
    const { data: notifications, error } = await db
      .from('NotificationLog')
      .select('*')
      .order('sentAt', { ascending: false })

    if (error) {
      console.error('Supabase notifications GET error:', error)
      return corsError('Failed to fetch notifications: ' + error.message, 500)
    }
    return corsResponse({ success: true, notifications: notifications || [] })
  } catch (err) {
    console.error('Notifications GET exception:', err)
    return corsError('Failed to fetch notifications', 500)
  }
}

// POST /api/notifications - Send notification (create log)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, message, recipient, title, targetId, targetType } = body
    if (!type || !message) return corsError('Type and message required')

    const notificationData: Record<string, unknown> = {
      type,
      message,
      title: title || type,
    }
    if (recipient) notificationData.recipient = recipient
    if (targetId) notificationData.targetId = targetId
    if (targetType) notificationData.targetType = targetType

    const { data: notification, error } = await db
      .from('NotificationLog')
      .insert(notificationData)
      .select()
      .single()

    if (error) {
      console.error('Supabase notification POST error:', error)
      return corsError('Failed to send notification: ' + error.message, 500)
    }
    return corsResponse({ success: true, notification }, 201)
  } catch (err) {
    console.error('Notification POST exception:', err)
    return corsError('Failed to send notification', 500)
  }
}

// DELETE /api/notifications - Delete notification
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return corsError('Notification ID required')

    const { error } = await db
      .from('NotificationLog')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase notification DELETE error:', error)
      return corsError('Failed to delete notification: ' + error.message, 500)
    }
    return corsResponse({ success: true, message: 'Notification deleted' })
  } catch (err) {
    console.error('Notification DELETE exception:', err)
    return corsError('Failed to delete notification', 500)
  }
}
