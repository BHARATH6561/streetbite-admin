import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/seed - Seed the database with demo data
export async function GET() {
  try {
    // Check if vendors already exist
    const { count: vendorCount, error: countError } = await db
      .from('Vendor')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      console.error('Seed count error:', countError)
      return corsError('Failed to check existing data: ' + countError.message, 500)
    }

    if (vendorCount && vendorCount > 0) {
      return corsResponse({
        success: true,
        message: 'Database already has data. Delete existing data first if you want to re-seed.',
        counts: { vendors: vendorCount }
      })
    }

    // Seed Vendors
    const { data: vendor1, error: v1Error } = await db.from('Vendor').insert({
      hotel: 'Sharma Chaat Corner', phone: '9876543210', owner: 'Ramesh Sharma',
      aadhaar: '123456789012', aadhaarFile: '', pan: 'ABCDE1234F', panFile: '',
      gst: '', gstFile: '', fssai: 'FSSAI12345', fssaiFile: '',
      address: 'MG Road, Indiranagar', city: 'Bangalore', state: 'Karnataka', pin: '560038',
      boardFile: '', bankName: 'SBI', accType: 'Current', accNo: '123456789012',
      ifsc: 'SBIN0001234', branch: 'MG Road Branch', status: 'approved',
      rating: 4.8, totalOrders: 1560, cancelledHotelDelay: 12, totalRevenue: 125000, commission: 15,
    }).select().single()
    if (v1Error) console.error('Vendor1 seed error:', v1Error)

    const { data: vendor2, error: v2Error } = await db.from('Vendor').insert({
      hotel: 'Mysore Dosa Palace', phone: '9876543211', owner: 'Arun Kumar',
      aadhaar: '234567890123', aadhaarFile: '', pan: 'FGHIJ5678K', panFile: '',
      gst: 'GST98765', gstFile: '', fssai: '', fssaiFile: '',
      address: 'Sayantha Nagar', city: 'Mysore', state: 'Karnataka', pin: '570001',
      boardFile: '', bankName: 'HDFC', accType: 'Savings', accNo: '987654321098',
      ifsc: 'HDFC0005678', branch: 'Mysore Main', status: 'pending',
      rating: 4.5, totalOrders: 800, cancelledHotelDelay: 5, totalRevenue: 450000, commission: 15,
    }).select().single()
    if (v2Error) console.error('Vendor2 seed error:', v2Error)

    const { data: vendor3, error: v3Error } = await db.from('Vendor').insert({
      hotel: 'Mumbai Pav Bhaji Center', phone: '9876543212', owner: 'Raj Thakur',
      aadhaar: '345678901234', aadhaarFile: '', pan: 'KLMNO9012P', panFile: '',
      gst: '', gstFile: '', fssai: '', fssaiFile: '',
      address: 'Juhu Beach', city: 'Mumbai', state: 'Maharashtra', pin: '400049',
      boardFile: '', bankName: 'ICICI', accType: 'Current', accNo: '112233445566',
      ifsc: 'ICIC0001122', branch: 'Juhu Branch', status: 'rejected',
      rating: 3.2, totalOrders: 120, cancelledHotelDelay: 45, totalRevenue: 35000, commission: 15,
    }).select().single()
    if (v3Error) console.error('Vendor3 seed error:', v3Error)

    // Seed Riders
    const { data: rider1, error: r1Error } = await db.from('Rider').insert({
      name: 'Raju Singh', aadhaar: '345678901234', aadhaarFile: '',
      pan: 'PQRST1234U', panFile: '', photoFile: '',
      vehicle: 'motorcycle', vehicleFile: '', rcFile: '',
      dl: 'DL12345', dlFile: '', city: 'Bangalore', state: 'Karnataka', pincode: '560001',
      bankName: 'Kotak', accNo: '445566778899', ifsc: 'KKBK0001234', branch: 'Koramangala',
      status: 'approved', rating: 4.7, totalDeliveries: 920, cancelledDelay: 8,
      totalEarnings: 18500, deliveryFee: 30, handicap: 'NO',
    }).select().single()
    if (r1Error) console.error('Rider1 seed error:', r1Error)

    const { data: rider2, error: r2Error } = await db.from('Rider').insert({
      name: 'Manoj Kumar', aadhaar: '456789012345', aadhaarFile: '',
      pan: 'VWXYZ5678A', panFile: '', photoFile: '',
      vehicle: 'motorcycle', vehicleFile: '', rcFile: '',
      dl: 'DL67890', dlFile: '', city: 'Bangalore', state: 'Karnataka', pincode: '560002',
      bankName: 'Axis', accNo: '998877665544', ifsc: 'UTIB0001234', branch: 'Whitefield',
      status: 'pending', rating: 0, totalDeliveries: 0, cancelledDelay: 0,
      totalEarnings: 0, deliveryFee: 30, handicap: 'YES',
    }).select().single()
    if (r2Error) console.error('Rider2 seed error:', r2Error)

    const { data: rider3, error: r3Error } = await db.from('Rider').insert({
      name: 'Suresh Yadav', aadhaar: '567890123456', aadhaarFile: '',
      pan: 'ABCDE9876B', panFile: '', photoFile: '',
      vehicle: 'motorcycle', vehicleFile: '', rcFile: '',
      dl: 'MH54321', dlFile: '', city: 'Hubli', state: 'Karnataka', pincode: '580001',
      bankName: 'SBI', accNo: '556677889900', ifsc: 'SBIN0009876', branch: 'Hubli Main',
      status: 'approved', rating: 4.2, totalDeliveries: 450, cancelledDelay: 15,
      totalEarnings: 9500, deliveryFee: 30, handicap: 'NO',
    }).select().single()
    if (r3Error) console.error('Rider3 seed error:', r3Error)

    // Seed Menu Items
    const v1Id = vendor1?.id
    const v2Id = vendor2?.id
    const v3Id = vendor3?.id

    const menuItemsData = [
      { name: 'Butter Masala Dosa', price: 120, vendorId: v2Id, available: true },
      { name: 'Chicken Biryani', price: 250, vendorId: v1Id, available: true },
      { name: 'Pav Bhaji', price: 140, vendorId: v3Id, available: false },
      { name: 'Paneer Tikka', price: 180, vendorId: v1Id, available: true },
      { name: 'Mutton Rogan Josh', price: 350, vendorId: v2Id, available: false },
      { name: 'Vada Pav', price: 40, vendorId: v3Id, available: true },
      { name: 'Chole Bhature', price: 130, vendorId: v1Id, available: false },
      { name: 'Fish Curry', price: 280, vendorId: v2Id, available: false },
      { name: 'Filter Coffee', price: 50, vendorId: v2Id, available: true },
      { name: 'Prawn Fry', price: 320, vendorId: v3Id, available: false },
      { name: 'Masala Dosa', price: 90, vendorId: v2Id, available: true },
      { name: 'Egg Fried Rice', price: 160, vendorId: v1Id, available: false },
    ]

    for (const item of menuItemsData) {
      const { error: miError } = await db.from('MenuItem').insert(item)
      if (miError) console.error('MenuItem seed error:', miError)
    }

    // Seed Orders
    const customerNames = ['Priya M.', 'Arjun K.', 'Neha S.', 'Vikram R.', 'Sneha P.', 'Rahul D.', 'Anita G.', 'Suresh B.', 'Kavita T.', 'Deepak N.']
    const foodItemsList = [
      'Butter Masala Dosa, Filter Coffee',
      'Pav Bhaji, Lassi',
      'Chole Bhature, Sweet Lassi',
      'Paneer Tikka, Naan, Raita',
      'Vada Pav, Cutting Chai',
      'Masala Dosa, Sambar, Idli',
      'Chicken Biryani, Raita',
      'Mutton Rogan Josh, Jeera Rice',
      'Aloo Paratha, Curd, Pickle',
      'Rajma Chawal, Salad',
      'Pani Puri, Sev Puri, Dahi Puri',
      'Samosa, Bread Pakora, Chai',
      'Veg Thali',
      'Non-Veg Thali',
      'Egg Fried Rice, Gobi Manchurian',
      'Mushroom Do Pyaza, Roti',
      'Fish Curry, Steamed Rice',
      'Prawn Fry, Appam',
      'Dal Makhani, Jeera Rice, Naan',
      'Kadai Paneer, Butter Naan',
    ]

    const vendors = [vendor1, vendor2, vendor3].filter(Boolean)
    const riders = [rider1, rider2, rider3].filter(Boolean)

    // Use a seeded random for consistent data
    let seed = 42
    function seededRandom() {
      seed = (seed * 16807) % 2147483647
      return (seed - 1) / 2147483646
    }

    let ordersCreated = 0
    for (let i = 1; i <= 35; i++) {
      const statusIdx = seededRandom()
      let orderStatus: string = 'completed'
      if (statusIdx < 0.3) orderStatus = 'live'
      else if (statusIdx < 0.8) orderStatus = 'completed'
      else orderStatus = 'cancelled'

      const isDelayed = orderStatus === 'live' && seededRandom() > 0.6
      const cancelledBy = orderStatus === 'cancelled' ? ['Customer', 'Hotel', 'Rider'][Math.floor(seededRandom() * 3)] : ''
      const day = Math.floor(seededRandom() * 28) + 1
      const month = Math.floor(seededRandom() * 3) + 1
      const hour = Math.floor(seededRandom() * 12) + 7
      const minute = Math.floor(seededRandom() * 60)
      const amount = Math.floor(seededRandom() * 800) + 100

      const vendorIdx = Math.floor(seededRandom() * vendors.length)
      const riderIdx = Math.floor(seededRandom() * riders.length)
      const vendor = vendors[vendorIdx]
      const rider = riders[riderIdx]
      const itemStr = foodItemsList[Math.floor(seededRandom() * foodItemsList.length)]

      const orderData: Record<string, unknown> = {
        status: orderStatus,
        delayed: isDelayed,
        cancelledBy,
        customerName: customerNames[Math.floor(seededRandom() * customerNames.length)],
        vendorId: vendor.id,
        vendorName: vendor.hotel,
        vendorOwner: vendor.owner,
        vendorPhone: vendor.phone,
        riderId: rider.id,
        riderName: rider.name,
        items: itemStr,
        orderTime: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
        orderDate: `2025-0${month}-${String(day).padStart(2, '0')}`,
        amount,
        orderFlowStage: orderStatus === 'completed' ? 'delivered' : orderStatus === 'live' ? 'preparing' : 'cancelled',
      }

      const { error: ordError } = await db.from('Order').insert(orderData)
      if (ordError) {
        console.error(`Order ${i} seed error:`, ordError)
      } else {
        ordersCreated++
      }
    }

    // Get final counts
    const { count: finalVendorCount } = await db.from('Vendor').select('*', { count: 'exact', head: true })
    const { count: finalRiderCount } = await db.from('Rider').select('*', { count: 'exact', head: true })
    const { count: finalMenuCount } = await db.from('MenuItem').select('*', { count: 'exact', head: true })
    const { count: finalOrderCount } = await db.from('Order').select('*', { count: 'exact', head: true })

    const finalCounts = {
      vendors: finalVendorCount || 0,
      riders: finalRiderCount || 0,
      menuItems: finalMenuCount || 0,
      orders: finalOrderCount || 0,
    }

    return corsResponse({ success: true, message: 'Database seeded successfully', counts: finalCounts })
  } catch (err) {
    console.error('Seed error:', err)
    return corsError('Failed to seed database: ' + String(err), 500)
  }
}
