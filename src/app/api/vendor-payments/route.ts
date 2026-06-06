import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/vendor-payments - List all vendor payment requests
export async function GET() {
  try {
    const payments = await db.vendorPayment.findMany({
      orderBy: { createdAt: 'desc' },
      include: { vendor: { select: { hotel: true, owner: true, phone: true, bankName: true, accNo: true, ifsc: true, branch: true } } }
    })
    return corsResponse({ success: true, payments })
  } catch (err) {
    return corsError('Failed to fetch vendor payments', 500)
  }
}

// POST /api/vendor-payments - Create a payment request (hotel requests payout)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { vendorId, amount } = body
    if (!vendorId || !amount) return corsError('vendorId and amount are required')

    const vendor = await db.vendor.findUnique({ where: { id: vendorId } })
    if (!vendor) return corsError('Vendor not found', 404)

    const payment = await db.vendorPayment.create({
      data: {
        vendorId,
        vendorName: vendor.hotel,
        amount: parseFloat(amount),
        status: 'pending',
      }
    })
    return corsResponse({ success: true, payment }, 201)
  } catch (err) {
    return corsError('Failed to create payment request', 500)
  }
}

// PUT /api/vendor-payments - Update payment request (approve/reject/pay)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body
    if (!id) return corsError('Payment ID required')

    const updates: Record<string, unknown> = {}
    if (status) updates.status = status
    if (status === 'paid') updates.paidAt = new Date()

    // If paying, also reset vendor's totalRevenue
    if (status === 'paid') {
      const payment = await db.vendorPayment.findUnique({ where: { id } })
      if (payment) {
        await db.vendor.update({
          where: { id: payment.vendorId },
          data: { totalRevenue: 0 }
        })
      }
    }

    const payment = await db.vendorPayment.update({ where: { id }, data: updates })
    return corsResponse({ success: true, payment })
  } catch (err) {
    return corsError('Failed to update payment request', 500)
  }
}

// DELETE /api/vendor-payments - Delete a payment request
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return corsError('Payment ID required')
    await db.vendorPayment.delete({ where: { id } })
    return corsResponse({ success: true, message: 'Payment request deleted' })
  } catch (err) {
    return corsError('Failed to delete payment request', 500)
  }
}
