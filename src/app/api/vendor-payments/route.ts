import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/vendor-payments - List all vendor payment requests
export async function GET() {
  try {
    const { data: payments, error } = await db
      .from('VendorPayment')
      .select('*, vendor:Vendor(hotel, owner, phone, bankName, accNo, ifsc, branch)')
      .order('createdAt', { ascending: false })

    if (error) {
      console.error('Supabase vendor-payments GET error:', error)
      return corsError('Failed to fetch vendor payments: ' + error.message, 500)
    }
    return corsResponse({ success: true, payments: payments || [] })
  } catch (err) {
    console.error('Vendor-payments GET exception:', err)
    return corsError('Failed to fetch vendor payments', 500)
  }
}

// POST /api/vendor-payments - Create a payment request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { vendorId, amount } = body
    if (!vendorId || !amount) return corsError('vendorId and amount are required')

    // Find the vendor
    const { data: vendor, error: vendorError } = await db
      .from('Vendor')
      .select('*')
      .eq('id', vendorId)
      .single()

    if (vendorError || !vendor) {
      return corsError('Vendor not found', 404)
    }

    const paymentData: Record<string, unknown> = {
      vendorId,
      vendorName: vendor.hotel,
      amount: parseFloat(amount),
      status: 'pending',
    }

    const { data: payment, error } = await db
      .from('VendorPayment')
      .insert(paymentData)
      .select()
      .single()

    if (error) {
      console.error('Supabase vendor-payment POST error:', error)
      return corsError('Failed to create payment request: ' + error.message, 500)
    }
    return corsResponse({ success: true, payment }, 201)
  } catch (err) {
    console.error('Vendor-payment POST exception:', err)
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

    // If paying, also reset vendor's totalRevenue
    if (status === 'paid' || status === 'completed') {
      // Get the payment first to find vendorId
      const { data: payment } = await db
        .from('VendorPayment')
        .select('vendorId')
        .eq('id', id)
        .single()

      if (payment) {
        // Reset vendor revenue
        await db
          .from('Vendor')
          .update({ totalRevenue: 0 })
          .eq('id', payment.vendorId)
      }
    }

    const { data: payment, error } = await db
      .from('VendorPayment')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase vendor-payment PUT error:', error)
      return corsError('Failed to update payment request: ' + error.message, 500)
    }
    return corsResponse({ success: true, payment })
  } catch (err) {
    console.error('Vendor-payment PUT exception:', err)
    return corsError('Failed to update payment request', 500)
  }
}

// DELETE /api/vendor-payments - Delete a payment request
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return corsError('Payment ID required')

    const { error } = await db
      .from('VendorPayment')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase vendor-payment DELETE error:', error)
      return corsError('Failed to delete payment request: ' + error.message, 500)
    }
    return corsResponse({ success: true, message: 'Payment request deleted' })
  } catch (err) {
    console.error('Vendor-payment DELETE exception:', err)
    return corsError('Failed to delete payment request', 500)
  }
}
