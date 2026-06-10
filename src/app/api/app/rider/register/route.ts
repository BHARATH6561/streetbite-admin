import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const riderData: Record<string, unknown> = {
      name: body.name || '',
      phone: body.phone || '',
      aadhaar: body.aadhaar || '',
      aadhaarFile: body.aadhaarFile || '',
      pan: body.pan || '',
      panFile: body.panFile || '',
      photoFile: body.photoFile || '',
      vehicle: body.vehicle || body.vehicleNumber || '',
      vehicleFile: body.vehicleFile || '',
      rcFile: body.rcFile || '',
      dl: body.dl || body.dlNumber || '',
      dlFile: body.dlFile || '',
      city: body.city || '',
      state: body.state || '',
      pincode: body.pincode || '',
      bankName: body.bankName || '',
      accNo: body.accNo || body.accountNo || '',
      ifsc: body.ifsc || '',
      branch: body.branch || '',
      status: 'pending',
      rating: 0,
      totalDeliveries: 0,
      cancelledDelay: 0,
      totalEarnings: 0,
      deliveryFee: 30,
      deliveryCommission: 15,
      paidOut: 0,
      utr: '',
      handicap: body.handicap || 'no',
      handicapDetails: body.handicapDetails || '',
      isOnline: false,
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
    if (body.lat !== undefined) riderData.lat = body.lat
    else riderData.lat = 0
    if (body.lng !== undefined) riderData.lng = body.lng
    else riderData.lng = 0

    const { data: rider, error } = await db
      .from('Rider')
      .insert(riderData)
      .select()
      .single()

    if (error) {
      console.error('App rider register error:', error)
      return corsError('Failed to register rider: ' + error.message, 500)
    }
    return corsResponse({ success: true, rider, message: 'Rider registration submitted for approval' }, 201)
  } catch (err) {
    console.error('App rider register exception:', err)
    return corsError('Failed to register rider', 500)
  }
}
