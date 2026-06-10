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
      aadhaar: body.aadhaar || '',
      aadhaarFile: body.aadhaarFile || '',
      pan: body.pan || '',
      panFile: body.panFile || '',
      gst: body.gst || '',
      gstFile: body.gstFile || '',
      fssai: body.fssai || '',
      fssaiFile: body.fssaiFile || '',
      address: body.address || '',
      city: body.city || '',
      state: body.state || '',
      pin: body.pin || body.pincode || '',
      boardFile: body.boardFile || '',
      bankName: body.bankName || '',
      accType: body.accType || body.accountType || '',
      accNo: body.accNo || body.accountNo || '',
      ifsc: body.ifsc || '',
      branch: body.branch || '',
      status: 'pending',
      rating: 0,
      totalOrders: 0,
      cancelledHotelDelay: 0,
      totalRevenue: 0,
      commission: 15,
      paidOut: 0,
      utr: '',
      isLiveCooking: false,
      lastOnline: 'Never',
      isHold: false,
      holdReason: '',
      totalReviews: 0,
      rating5: 0,
      rating4: 0,
      rating3: 0,
      rating2: 0,
      rating1: 0,
    }
    if (body.lat !== undefined) vendorData.lat = body.lat
    else vendorData.lat = 0
    if (body.lng !== undefined) vendorData.lng = body.lng
    else vendorData.lng = 0

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
