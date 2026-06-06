import { db } from '@/lib/db'
import { corsResponse, corsError } from '@/app/cors-helper'

// GET /api/seed - Seed the database with initial data
export async function GET() {
  try {
    // Check if data already exists
    const vendorCount = await db.vendor.count()
    if (vendorCount > 0) {
      return corsResponse({ success: true, message: 'Database already seeded', counts: { vendors: vendorCount } })
    }

    // Seed Vendors
    const vendor1 = await db.vendor.create({
      data: {
        hotel: 'Sharma Chaat Corner', phone: '9876543210', owner: 'Ramesh Sharma',
        aadhaar: '1234-5678-9012', aadhaarFile: 'Aadhaar.pdf', pan: 'ABCDE1234F', panFile: 'PAN.pdf',
        gst: '', gstFile: '', fssai: 'FSSAI12345', fssaiFile: 'FSSAI.pdf',
        address: 'MG Road, Indiranagar', city: 'Bangalore', state: 'Karnataka', pin: '560038',
        boardFile: 'Board.jpg', bankName: 'SBI', accType: 'Current', accNo: '123456789012',
        ifsc: 'SBIN0001234', branch: 'MG Road Branch', status: 'approved',
        rating: 4.8, totalOrders: 1560, cancelledHotelDelay: 12, totalRevenue: 125000, commission: 15,
      },
    })
    const vendor2 = await db.vendor.create({
      data: {
        hotel: 'Mysore Dosa Palace', phone: '9876543211', owner: 'Arun Kumar',
        aadhaar: '2345-6789-0123', aadhaarFile: 'Aadhaar.pdf', pan: 'FGHIJ5678K', panFile: 'PAN.pdf',
        gst: 'GST98765', gstFile: 'GST.pdf', fssai: '', fssaiFile: '',
        address: 'Sayantha Nagar', city: 'Mysore', state: 'Karnataka', pin: '570001',
        boardFile: '', bankName: 'HDFC', accType: 'Savings', accNo: '987654321098',
        ifsc: 'HDFC0005678', branch: 'Mysore Main', status: 'pending',
        rating: 4.5, totalOrders: 800, cancelledHotelDelay: 5, totalRevenue: 450000, commission: 15,
      },
    })
    const vendor3 = await db.vendor.create({
      data: {
        hotel: 'Mumbai Pav Bhaji Center', phone: '9876543212', owner: 'Raj Thakur',
        aadhaar: '3456-7890-1234', aadhaarFile: 'Aadhaar.pdf', pan: 'KLMNO9012P', panFile: 'PAN.pdf',
        gst: '', gstFile: '', fssai: '', fssaiFile: '',
        address: 'Juhu Beach', city: 'Mumbai', state: 'Maharashtra', pin: '400049',
        boardFile: '', bankName: 'ICICI', accType: 'Current', accNo: '112233445566',
        ifsc: 'ICIC0001122', branch: 'Juhu Branch', status: 'rejected',
        rating: 3.2, totalOrders: 120, cancelledHotelDelay: 45, totalRevenue: 35000, commission: 15,
      },
    })

    // Seed Riders
    const rider1 = await db.rider.create({
      data: {
        name: 'Raju Singh', aadhaar: '3456-7890-1234', aadhaarFile: 'Aadhaar.pdf',
        pan: 'PQRST1234U', panFile: 'PAN.pdf', photoFile: 'Photo.jpg',
        vehicle: 'KA-01-AB-1234', vehicleFile: 'Vehicle.jpg', rcFile: 'RC.pdf',
        dl: 'DL12345', dlFile: 'DL.pdf', city: 'Bangalore', state: 'Karnataka', pincode: '560001',
        bankName: 'Kotak', accNo: '445566778899', ifsc: 'KKBK0001234', branch: 'Koramangala',
        status: 'approved', rating: 4.7, totalDeliveries: 920, cancelledDelay: 8,
        totalEarnings: 18500, deliveryFee: 30, handicap: 'NO',
      },
    })
    const rider2 = await db.rider.create({
      data: {
        name: 'Manoj Kumar', aadhaar: '4567-8901-2345', aadhaarFile: 'Aadhaar.pdf',
        pan: 'VWXYZ5678A', panFile: 'PAN.pdf', photoFile: 'Photo.jpg',
        vehicle: 'KA-01-CD-5678', vehicleFile: 'Vehicle.jpg', rcFile: 'RC.pdf',
        dl: 'DL67890', dlFile: 'DL.pdf', city: 'Bangalore', state: 'Karnataka', pincode: '560002',
        bankName: 'Axis', accNo: '998877665544', ifsc: 'UTIB0001234', branch: 'Whitefield',
        status: 'pending', rating: 0, totalDeliveries: 0, cancelledDelay: 0,
        totalEarnings: 0, deliveryFee: 30, handicap: 'YES',
      },
    })
    const rider3 = await db.rider.create({
      data: {
        name: 'Suresh Yadav', aadhaar: '5678-9012-3456', aadhaarFile: 'Aadhaar.pdf',
        pan: 'ABCDE9876B', panFile: 'PAN.pdf', photoFile: 'Photo.jpg',
        vehicle: 'KA-02-EF-9012', vehicleFile: 'Vehicle.jpg', rcFile: 'RC.pdf',
        dl: 'MH54321', dlFile: 'DL.pdf', city: 'Hubli', state: 'Karnataka', pincode: '580001',
        bankName: 'SBI', accNo: '556677889900', ifsc: 'SBIN0009876', branch: 'Hubli Main',
        status: 'approved', rating: 4.2, totalDeliveries: 450, cancelledDelay: 15,
        totalEarnings: 9500, deliveryFee: 30, handicap: 'NO',
      },
    })

    // Seed Menu Items
    const menuItemsData = [
      { name: 'Butter Masala Dosa', description: 'Crispy dosa filled with buttery masala, served with coconut chutney and sambar', category: 'South Indian', foodType: 'VEG', price: 120, photoUrl: '/food/dosa.jpg', vendorId: vendor2.id, vendorName: 'Mysore Dosa Palace', status: 'approved' },
      { name: 'Chicken Biryani', description: 'Aromatic basmati rice cooked with tender chicken pieces, spices and saffron', category: 'Biryani', foodType: 'NONVEG', price: 250, photoUrl: '/food/biryani.jpg', vendorId: vendor1.id, vendorName: 'Sharma Chaat Corner', status: 'approved' },
      { name: 'Pav Bhaji', description: 'Spiced mashed vegetables served with buttered pav buns', category: 'Street Food', foodType: 'VEG', price: 140, photoUrl: '/food/pavbhaji.jpg', vendorId: vendor3.id, vendorName: 'Mumbai Pav Bhaji Center', status: 'pending' },
      { name: 'Paneer Tikka', description: 'Marinated cottage cheese cubes grilled in tandoor with bell peppers', category: 'Starters', foodType: 'VEG', price: 180, photoUrl: '/food/paneertikka.jpg', vendorId: vendor1.id, vendorName: 'Sharma Chaat Corner', status: 'approved' },
      { name: 'Mutton Rogan Josh', description: 'Slow-cooked mutton in rich Kashmiri spices and yogurt gravy', category: 'Main Course', foodType: 'NONVEG', price: 350, photoUrl: '/food/roganjosh.jpg', vendorId: vendor2.id, vendorName: 'Mysore Dosa Palace', status: 'pending' },
      { name: 'Vada Pav', description: 'Mumbai-style spiced potato fritter in a bun with chutneys', category: 'Street Food', foodType: 'VEG', price: 40, photoUrl: '/food/vadapav.jpg', vendorId: vendor3.id, vendorName: 'Mumbai Pav Bhaji Center', status: 'approved' },
      { name: 'Chole Bhature', description: 'Spicy chickpea curry served with deep-fried bread', category: 'North Indian', foodType: 'VEG', price: 130, photoUrl: '/food/chole.jpg', vendorId: vendor1.id, vendorName: 'Sharma Chaat Corner', status: 'rejected' },
      { name: 'Fish Curry', description: 'Fresh fish cooked in tangy coconut and tamarind gravy', category: 'Main Course', foodType: 'NONVEG', price: 280, photoUrl: '/food/fishcurry.jpg', vendorId: vendor2.id, vendorName: 'Mysore Dosa Palace', status: 'pending' },
      { name: 'Filter Coffee', description: 'Authentic South Indian filter coffee with frothed milk', category: 'Beverages', foodType: 'VEG', price: 50, photoUrl: '/food/coffee.jpg', vendorId: vendor2.id, vendorName: 'Mysore Dosa Palace', status: 'approved' },
      { name: 'Prawn Fry', description: 'Crispy fried prawns with spices and curry leaves', category: 'Starters', foodType: 'NONVEG', price: 320, photoUrl: '', vendorId: vendor3.id, vendorName: 'Mumbai Pav Bhaji Center', status: 'pending' },
      { name: 'Masala Dosa', description: 'Thin crispy crepe made from rice batter with spiced potato filling', category: 'South Indian', foodType: 'VEG', price: 90, photoUrl: '/food/masaladosa.jpg', vendorId: vendor2.id, vendorName: 'Mysore Dosa Palace', status: 'approved' },
      { name: 'Egg Fried Rice', description: 'Stir-fried rice with scrambled eggs and vegetables', category: 'Chinese', foodType: 'NONVEG', price: 160, photoUrl: '', vendorId: vendor1.id, vendorName: 'Sharma Chaat Corner', status: 'pending' },
    ]
    for (const item of menuItemsData) {
      await db.menuItem.create({ data: item })
    }

    // Seed Orders
    const customerNames = ['Priya M.', 'Arjun K.', 'Neha S.', 'Vikram R.', 'Sneha P.', 'Rahul D.', 'Anita G.', 'Suresh B.', 'Kavita T.', 'Deepak N.']
    const cancelledByOptions = ['Customer', 'Hotel', 'Rider']
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
    const vendors = [vendor1, vendor2, vendor3]
    const riders = [rider1, rider2, rider3]

    // Use a seeded random for consistent data
    let seed = 42
    function seededRandom() {
      seed = (seed * 16807) % 2147483647
      return (seed - 1) / 2147483646
    }

    for (let i = 1; i <= 35; i++) {
      const statusIdx = seededRandom()
      let status: string = 'completed'
      if (statusIdx < 0.3) status = 'live'
      else if (statusIdx < 0.8) status = 'completed'
      else status = 'cancelled'

      const isDelayed = status === 'live' && seededRandom() > 0.6
      const cancelledBy = status === 'cancelled' ? cancelledByOptions[Math.floor(seededRandom() * 3)] : null
      const day = Math.floor(seededRandom() * 28) + 1
      const month = Math.floor(seededRandom() * 3) + 1
      const hour = Math.floor(seededRandom() * 12) + 7
      const minute = Math.floor(seededRandom() * 60)
      const ampm = hour < 12 ? 'AM' : 'PM'
      const displayHour = hour > 12 ? hour - 12 : hour
      const amount = Math.floor(seededRandom() * 800) + 100

      const vendorIdx = Math.floor(seededRandom() * vendors.length)
      const riderIdx = Math.floor(seededRandom() * riders.length)
      const vendor = vendors[vendorIdx]
      const rider = riders[riderIdx]
      const itemStr = foodItemsList[Math.floor(seededRandom() * foodItemsList.length)]
      const itemParts = itemStr.split(', ').map(s => s.trim())
      const itemFoodTypes = itemParts.map(item => {
        const name = item.toLowerCase()
        if (name.includes('chicken') || name.includes('mutton') || name.includes('fish') || name.includes('prawn') || name.includes('egg') || name.includes('non-veg')) return 'NONVEG'
        return 'VEG'
      })

      await db.order.create({
        data: {
          id: `ORD-${String(1000 + i).padStart(4, '0')}`,
          status,
          delayed: isDelayed,
          cancelledBy,
          customerName: customerNames[Math.floor(seededRandom() * customerNames.length)],
          vendorId: vendor.id,
          vendorName: vendor.hotel,
          vendorOwner: vendor.owner,
          vendorPhone: vendor.phone,
          riderId: rider.id,
          riderName: rider.name,
          riderPhone: `+91-${rider.aadhaar?.slice(-4) || '0000'}${String(riderIdx + 1).padStart(6, '0')}`,
          items: itemStr,
          itemsFoodType: JSON.stringify(itemFoodTypes),
          orderTime: `${String(displayHour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${ampm}`,
          orderDate: `2025-0${month}-${String(day).padStart(2, '0')}`,
          amount,
        },
      })
    }

    const finalCounts = {
      vendors: await db.vendor.count(),
      riders: await db.rider.count(),
      menuItems: await db.menuItem.count(),
      orders: await db.order.count(),
    }

    return corsResponse({ success: true, message: 'Database seeded successfully', counts: finalCounts })
  } catch (err) {
    console.error('Seed error:', err)
    return corsError('Failed to seed database', 500)
  }
}
