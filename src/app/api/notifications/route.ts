import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/notifications - List all notification logs
export async function GET() {
  try {
    const notifications = await db.notificationLog.findMany({ orderBy: { createdAt: 'desc' } })
    return corsResponse({ success: true, notifications })
  } catch (err) {
    return corsError('Failed to fetch notifications', 500)
  }
}

// POST /api/notifications - Send notification (create log)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, message, recipient } = body
    if (!type || !message) return corsError('Type and message required')
    const notification = await db.notificationLog.create({
      data: { type, message, recipient: recipient || null, status: 'sent' },
    })
    return corsResponse({ success: true, notification }, 201)
  } catch (err) {
    return corsError('Failed to send notification', 500)
  }
}

// DELETE /api/notifications - Delete notification
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return corsError('Notification ID required')
    await db.notificationLog.delete({ where: { id } })
    return corsResponse({ success: true, message: 'Notification deleted' })
  } catch (err) {
    return corsError('Failed to delete notification', 500)
  }
}
