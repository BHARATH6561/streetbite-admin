import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const vendorData: Record<string, unknown> = {
      hotel: body.hotel || body.hotelName || '',
      phone: body.phone || '',
      owner: body.owner || body.ownerName || '',
      aadhaar: body.aadhaar || null,
      aadhaarFile: body.aadhaarFile || '',
      pan: body.pan || null,
      panFile: body.panFile || '',
      gst: body.gst || null,
      gstFile: body.gstFile || '',
      fssai: body.fssai || null,
      fssaiFile: body.fssaiFile || '',
      address: body.address || null,
      city: body.city || null,
      state: body.state || null,
      pin: body.pin || body.pincode || null,
      boardFile: body.boardFile || '',
      bankName: body.bankName || null,
      accType: body.accType || body.accountType || null,
      accNo: body.accNo || body.accountNo || null,
      ifsc: body.ifsc || null,
      branch: body.branch || null,
      status: 'pending',
      rating: 0,
      totalOrders: 0,
      cancelledHotelDelay: 0,
      totalRevenue: 0,
      commission: 15,
    }
    if (body.lat !== undefined) vendorData.lat = body.lat
    if (body.lng !== undefined) vendorData.lng = body.lng
    if (body.isLiveCooking !== undefined) vendorData.isLiveCooking = body.isLiveCooking
    if (body.isHold !== undefined) vendorData.isHold = body.isHold

    const { data: vendor, error } = await db
      .from('Vendor')
      .insert(vendorData)
      .select()
      .single()

    if (error) {
      console.error('App vendor register error:', error)
      return corsError('Failed to register vendor: ' + error.message, 500)
    }
    return corsResponse({ success: true, vendor, message: 'Vendor registration submitted for approval' }, 201)
  } catch (err) {
    console.error('App vendor register exception:', err)
    return corsError('Failed to register vendor', 500)
  }
}
