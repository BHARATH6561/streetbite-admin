import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// POST /api/vendors/register - Register new vendor from mobile app
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const vendorData = {
      hotel: body.hotel || body.hotelName || '',
      phone: body.phone || '',
      owner: body.owner || body.ownerName || '',
      aadhaar: body.aadhaar || null,
      aadhaarFile: body.aadhaarFile || null,
      pan: body.pan || null,
      panFile: body.panFile || null,
      gst: body.gst || null,
      gstFile: body.gstFile || null,
      fssai: body.fssai || null,
      fssaiFile: body.fssaiFile || null,
      address: body.address || null,
      city: body.city || null,
      state: body.state || null,
      pin: body.pin || body.pincode || null,
      boardFile: body.boardFile || null,
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
    const vendor = await db.vendor.create({ data: vendorData })
    return corsResponse({ success: true, vendor, message: 'Vendor registration submitted for approval' }, 201)
  } catch (err) {
    return corsError('Failed to register vendor', 500)
  }
}
