import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// POST /api/riders/register - Register new rider from mobile app
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const riderData = {
      name: body.name || '',
      aadhaar: body.aadhaar || null,
      aadhaarFile: body.aadhaarFile || null,
      pan: body.pan || null,
      panFile: body.panFile || null,
      photoFile: body.photoFile || null,
      vehicle: body.vehicle || body.vehicleNumber || null,
      vehicleFile: body.vehicleFile || null,
      rcFile: body.rcFile || null,
      dl: body.dl || body.dlNumber || null,
      dlFile: body.dlFile || null,
      city: body.city || null,
      state: body.state || null,
      pincode: body.pincode || null,
      bankName: body.bankName || null,
      accNo: body.accNo || body.accountNo || null,
      ifsc: body.ifsc || null,
      branch: body.branch || null,
      status: 'pending',
      rating: 0,
      totalDeliveries: 0,
      cancelledDelay: 0,
      totalEarnings: 0,
      deliveryFee: 30,
      handicap: body.handicap || 'NO',
    }
    const rider = await db.rider.create({ data: riderData })
    return corsResponse({ success: true, rider, message: 'Rider registration submitted for approval' }, 201)
  } catch (err) {
    return corsError('Failed to register rider', 500)
  }
}
