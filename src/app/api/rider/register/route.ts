import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const riderData: Record<string, unknown> = {
      name: body.name || '',
      aadhaar: body.aadhaar || null,
      aadhaarFile: body.aadhaarFile || '',
      pan: body.pan || null,
      panFile: body.panFile || '',
      photoFile: body.photoFile || '',
      vehicle: body.vehicle || body.vehicleNumber || null,
      vehicleFile: body.vehicleFile || '',
      rcFile: body.rcFile || '',
      dl: body.dl || body.dlNumber || null,
      dlFile: body.dlFile || '',
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
    if (body.lat !== undefined) riderData.lat = body.lat
    if (body.lng !== undefined) riderData.lng = body.lng
    if (body.isOnline !== undefined) riderData.isOnline = body.isOnline
    if (body.isHold !== undefined) riderData.isHold = body.isHold

    const { data: rider, error } = await db
      .from('Rider')
      .insert(riderData)
      .select()
      .single()

    if (error) {
      console.error('Rider register error:', error)
      return corsError('Failed to register rider: ' + error.message, 500)
    }
    return corsResponse({ success: true, rider, message: 'Rider registration submitted for approval' }, 201)
  } catch (err) {
    console.error('Rider register exception:', err)
    return corsError('Failed to register rider', 500)
  }
}
