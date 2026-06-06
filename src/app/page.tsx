'use client'

import { useState, useMemo } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Flame,
  LayoutDashboard,
  Store,
  Bike,
  ClipboardList,
  CreditCard,
  Search,
  Star,
  Eye,
  Trash2,
  Plus,
  Upload,
  Menu,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  MapPin,
  Phone,
  User,
  Banknote,
  IndianRupee,
  X,
  ChevronRight,
  Package,
  Truck,
  ShieldCheck,
  ShieldX,
  ShieldAlert,
  UtensilsCrossed,
  Image as ImageIcon,
  Download,
  Leaf,
  Drumstick,
  Tag,
  FileText,
  Accessibility,
} from 'lucide-react'

/* ───────────── TYPES ───────────── */
type VendorStatus = 'approved' | 'pending' | 'rejected'
type RiderStatus = 'approved' | 'pending' | 'rejected'
type OrderStatus = 'live' | 'completed' | 'cancelled'
type FoodType = 'VEG' | 'NONVEG'
type MenuItemStatus = 'approved' | 'pending' | 'rejected'

interface Vendor {
  id: number
  hotel: string
  phone: string
  owner: string
  aadhaar: string
  aadhaarFile: string
  pan: string
  panFile: string
  gst: string
  gstFile: string
  fssai: string
  fssaiFile: string
  address: string
  city: string
  state: string
  pin: string
  boardFile: string
  bankName: string
  accType: string
  accNo: string
  ifsc: string
  branch: string
  status: VendorStatus
  rating: number
  totalOrders: number
  cancelledHotelDelay: number
  totalRevenue: number
  commission: number
}

interface Rider {
  id: number
  name: string
  aadhaar: string
  aadhaarFile: string
  pan: string
  panFile: string
  photoFile: string
  vehicle: string
  vehicleFile: string
  rcFile: string
  dl: string
  dlFile: string
  city: string
  state: string
  pincode: string
  bankName: string
  accNo: string
  ifsc: string
  branch: string
  status: RiderStatus
  rating: number
  totalDeliveries: number
  cancelledDelay: number
  totalEarnings: number
  deliveryFee: number
  handicap: 'YES' | 'NO'
}

interface Order {
  id: string
  status: OrderStatus
  delayed: boolean
  cancelledBy: string
  customer: string
  vendor: string
  vendorOwner: string
  vendorPhone: string
  rider: string
  riderPhone: string
  items: string
  itemsFoodType: FoodType[]
  orderTime: string
  orderDate: string
  amount: number
}

interface MenuItem {
  id: number
  name: string
  description: string
  category: string
  foodType: FoodType
  price: number
  photoUrl: string
  vendorId: number
  vendorName: string
  status: MenuItemStatus
  createdAt: string
}

/* ───────────── MOCK DATA ───────────── */
const initialVendors: Vendor[] = [
  { id: 1, hotel: 'Sharma Chaat Corner', phone: '9876543210', owner: 'Ramesh Sharma', aadhaar: '1234-5678-9012', aadhaarFile: 'Aadhaar.pdf', pan: 'ABCDE1234F', panFile: 'PAN.pdf', gst: '', gstFile: '', fssai: 'FSSAI12345', fssaiFile: 'FSSAI.pdf', address: 'MG Road, Indiranagar', city: 'Bangalore', state: 'Karnataka', pin: '560038', boardFile: 'Board.jpg', bankName: 'SBI', accType: 'Current', accNo: '123456789012', ifsc: 'SBIN0001234', branch: 'MG Road Branch', status: 'approved', rating: 4.8, totalOrders: 1560, cancelledHotelDelay: 12, totalRevenue: 125000, commission: 15 },
  { id: 2, hotel: 'Mysore Dosa Palace', phone: '9876543211', owner: 'Arun Kumar', aadhaar: '2345-6789-0123', aadhaarFile: 'Aadhaar.pdf', pan: 'FGHIJ5678K', panFile: 'PAN.pdf', gst: 'GST98765', gstFile: 'GST.pdf', fssai: '', fssaiFile: '', address: 'Sayantha Nagar', city: 'Mysore', state: 'Karnataka', pin: '570001', boardFile: '', bankName: 'HDFC', accType: 'Savings', accNo: '987654321098', ifsc: 'HDFC0005678', branch: 'Mysore Main', status: 'pending', rating: 4.5, totalOrders: 800, cancelledHotelDelay: 5, totalRevenue: 450000, commission: 15 },
  { id: 3, hotel: 'Mumbai Pav Bhaji Center', phone: '9876543212', owner: 'Raj Thakur', aadhaar: '3456-7890-1234', aadhaarFile: 'Aadhaar.pdf', pan: 'KLMNO9012P', panFile: 'PAN.pdf', gst: '', gstFile: '', fssai: '', fssaiFile: '', address: 'Juhu Beach', city: 'Mumbai', state: 'Maharashtra', pin: '400049', boardFile: '', bankName: 'ICICI', accType: 'Current', accNo: '112233445566', ifsc: 'ICIC0001122', branch: 'Juhu Branch', status: 'rejected', rating: 3.2, totalOrders: 120, cancelledHotelDelay: 45, totalRevenue: 35000, commission: 15 },
]

const initialRiders: Rider[] = [
  { id: 1, name: 'Raju Singh', aadhaar: '3456-7890-1234', aadhaarFile: 'Aadhaar.pdf', pan: 'PQRST1234U', panFile: 'PAN.pdf', photoFile: 'Photo.jpg', vehicle: 'KA-01-AB-1234', vehicleFile: 'Vehicle.jpg', rcFile: 'RC.pdf', dl: 'DL12345', dlFile: 'DL.pdf', city: 'Bangalore', state: 'Karnataka', pincode: '560001', bankName: 'Kotak', accNo: '445566778899', ifsc: 'KKBK0001234', branch: 'Koramangala', status: 'approved', rating: 4.7, totalDeliveries: 920, cancelledDelay: 8, totalEarnings: 18500, deliveryFee: 30, handicap: 'NO' },
  { id: 2, name: 'Manoj Kumar', aadhaar: '4567-8901-2345', aadhaarFile: 'Aadhaar.pdf', pan: 'VWXYZ5678A', panFile: 'PAN.pdf', photoFile: 'Photo.jpg', vehicle: 'KA-01-CD-5678', vehicleFile: 'Vehicle.jpg', rcFile: 'RC.pdf', dl: 'DL67890', dlFile: 'DL.pdf', city: 'Bangalore', state: 'Karnataka', pincode: '560002', bankName: 'Axis', accNo: '998877665544', ifsc: 'UTIB0001234', branch: 'Whitefield', status: 'pending', rating: 0, totalDeliveries: 0, cancelledDelay: 0, totalEarnings: 0, deliveryFee: 30, handicap: 'YES' },
  { id: 3, name: 'Suresh Yadav', aadhaar: '5678-9012-3456', aadhaarFile: 'Aadhaar.pdf', pan: 'ABCDE9876B', panFile: 'PAN.pdf', photoFile: 'Photo.jpg', vehicle: 'KA-02-EF-9012', vehicleFile: 'Vehicle.jpg', rcFile: 'RC.pdf', dl: 'MH54321', dlFile: 'DL.pdf', city: 'Hubli', state: 'Karnataka', pincode: '580001', bankName: 'SBI', accNo: '556677889900', ifsc: 'SBIN0009876', branch: 'Hubli Main', status: 'approved', rating: 4.2, totalDeliveries: 450, cancelledDelay: 15, totalEarnings: 9500, deliveryFee: 30, handicap: 'NO' },
]

const initialMenuItems: MenuItem[] = [
  { id: 1, name: 'Butter Masala Dosa', description: 'Crispy dosa filled with buttery masala, served with coconut chutney and sambar', category: 'South Indian', foodType: 'VEG', price: 120, photoUrl: '/food/dosa.jpg', vendorId: 2, vendorName: 'Mysore Dosa Palace', status: 'approved', createdAt: '2025-01-15' },
  { id: 2, name: 'Chicken Biryani', description: 'Aromatic basmati rice cooked with tender chicken pieces, spices and saffron', category: 'Biryani', foodType: 'NONVEG', price: 250, photoUrl: '/food/biryani.jpg', vendorId: 1, vendorName: 'Sharma Chaat Corner', status: 'approved', createdAt: '2025-01-18' },
  { id: 3, name: 'Pav Bhaji', description: 'Spiced mashed vegetables served with buttered pav buns', category: 'Street Food', foodType: 'VEG', price: 140, photoUrl: '/food/pavbhaji.jpg', vendorId: 3, vendorName: 'Mumbai Pav Bhaji Center', status: 'pending', createdAt: '2025-02-01' },
  { id: 4, name: 'Paneer Tikka', description: 'Marinated cottage cheese cubes grilled in tandoor with bell peppers', category: 'Starters', foodType: 'VEG', price: 180, photoUrl: '/food/paneertikka.jpg', vendorId: 1, vendorName: 'Sharma Chaat Corner', status: 'approved', createdAt: '2025-02-05' },
  { id: 5, name: 'Mutton Rogan Josh', description: 'Slow-cooked mutton in rich Kashmiri spices and yogurt gravy', category: 'Main Course', foodType: 'NONVEG', price: 350, photoUrl: '/food/roganjosh.jpg', vendorId: 2, vendorName: 'Mysore Dosa Palace', status: 'pending', createdAt: '2025-02-10' },
  { id: 6, name: 'Vada Pav', description: 'Mumbai-style spiced potato fritter in a bun with chutneys', category: 'Street Food', foodType: 'VEG', price: 40, photoUrl: '/food/vadapav.jpg', vendorId: 3, vendorName: 'Mumbai Pav Bhaji Center', status: 'approved', createdAt: '2025-02-12' },
  { id: 7, name: 'Chole Bhature', description: 'Spicy chickpea curry served with deep-fried bread', category: 'North Indian', foodType: 'VEG', price: 130, photoUrl: '/food/chole.jpg', vendorId: 1, vendorName: 'Sharma Chaat Corner', status: 'rejected', createdAt: '2025-02-15' },
  { id: 8, name: 'Fish Curry', description: 'Fresh fish cooked in tangy coconut and tamarind gravy', category: 'Main Course', foodType: 'NONVEG', price: 280, photoUrl: '/food/fishcurry.jpg', vendorId: 2, vendorName: 'Mysore Dosa Palace', status: 'pending', createdAt: '2025-02-20' },
  { id: 9, name: 'Filter Coffee', description: 'Authentic South Indian filter coffee with frothed milk', category: 'Beverages', foodType: 'VEG', price: 50, photoUrl: '/food/coffee.jpg', vendorId: 2, vendorName: 'Mysore Dosa Palace', status: 'approved', createdAt: '2025-02-22' },
  { id: 10, name: 'Prawn Fry', description: 'Crispy fried prawns with spices and curry leaves', category: 'Starters', foodType: 'NONVEG', price: 320, photoUrl: '', vendorId: 3, vendorName: 'Mumbai Pav Bhaji Center', status: 'pending', createdAt: '2025-03-01' },
  { id: 11, name: 'Masala Dosa', description: 'Thin crispy crepe made from rice batter with spiced potato filling', category: 'South Indian', foodType: 'VEG', price: 90, photoUrl: '/food/masaladosa.jpg', vendorId: 2, vendorName: 'Mysore Dosa Palace', status: 'approved', createdAt: '2025-03-05' },
  { id: 12, name: 'Egg Fried Rice', description: 'Stir-fried rice with scrambled eggs and vegetables', category: 'Chinese', foodType: 'NONVEG', price: 160, photoUrl: '', vendorId: 1, vendorName: 'Sharma Chaat Corner', status: 'pending', createdAt: '2025-03-08' },
]

const foodItemMap: Record<string, FoodType> = {
  'Butter Masala Dosa': 'VEG',
  'Filter Coffee': 'VEG',
  'Pav Bhaji': 'VEG',
  'Lassi': 'VEG',
  'Chole Bhature': 'VEG',
  'Sweet Lassi': 'VEG',
  'Paneer Tikka': 'VEG',
  'Naan': 'VEG',
  'Raita': 'VEG',
  'Vada Pav': 'VEG',
  'Cutting Chai': 'VEG',
  'Masala Dosa': 'VEG',
  'Sambar': 'VEG',
  'Idli': 'VEG',
  'Chicken Biryani': 'NONVEG',
  'Mutton Rogan Josh': 'NONVEG',
  'Jeera Rice': 'VEG',
  'Aloo Paratha': 'VEG',
  'Curd': 'VEG',
  'Pickle': 'VEG',
  'Rajma Chawal': 'VEG',
  'Salad': 'VEG',
  'Pani Puri': 'VEG',
  'Sev Puri': 'VEG',
  'Dahi Puri': 'VEG',
  'Samosa': 'VEG',
  'Bread Pakora': 'VEG',
  'Chai': 'VEG',
  'Veg Thali': 'VEG',
  'Non-Veg Thali': 'NONVEG',
  'Egg Fried Rice': 'NONVEG',
  'Gobi Manchurian': 'VEG',
  'Mushroom Do Pyaza': 'VEG',
  'Roti': 'VEG',
  'Fish Curry': 'NONVEG',
  'Steamed Rice': 'VEG',
  'Prawn Fry': 'NONVEG',
  'Appam': 'VEG',
  'Dal Makhani': 'VEG',
  'Kadai Paneer': 'VEG',
  'Butter Naan': 'VEG',
}

function getFoodType(itemName: string): FoodType {
  const name = itemName.toLowerCase()
  if (name.includes('chicken') || name.includes('mutton') || name.includes('fish') || name.includes('prawn') || name.includes('egg') || name.includes('non-veg')) return 'NONVEG'
  if (name.includes('paneer') || name.includes('dosa') || name.includes('idli') || name.includes('sambar') || name.includes('veg') || name.includes('dal') || name.includes('paratha') || name.includes('puri') || name.includes('samosa')) return 'VEG'
  for (const [key, val] of Object.entries(foodItemMap)) {
    if (name.includes(key.toLowerCase())) return val
  }
  return 'VEG'
}

function generateOrders(): Order[] {
  const customerNames = ['Priya M.', 'Arjun K.', 'Neha S.', 'Vikram R.', 'Sneha P.', 'Rahul D.', 'Anita G.', 'Suresh B.', 'Kavita T.', 'Deepak N.']
  const cancelledByOptions = ['Customer', 'Hotel', 'Rider']
  const foodItems = [
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
  const orders: Order[] = []

  for (let i = 1; i <= 35; i++) {
    const statusIdx = Math.random()
    let status: OrderStatus = 'completed'
    if (statusIdx < 0.3) status = 'live'
    else if (statusIdx < 0.8) status = 'completed'
    else status = 'cancelled'

    const isDelayed = status === 'live' && Math.random() > 0.6
    const cancelledBy = status === 'cancelled' ? cancelledByOptions[Math.floor(Math.random() * 3)] : ''
    const day = Math.floor(Math.random() * 28) + 1
    const month = Math.floor(Math.random() * 3) + 1
    const hour = Math.floor(Math.random() * 12) + 7
    const minute = Math.floor(Math.random() * 60)
    const ampm = hour < 12 ? 'AM' : 'PM'
    const displayHour = hour > 12 ? hour - 12 : hour
    const amount = Math.floor(Math.random() * 800) + 100

    const vendorIdx = Math.floor(Math.random() * initialVendors.length)
    const riderIdx = Math.floor(Math.random() * initialRiders.length)
    const vendor = initialVendors[vendorIdx]
    const rider = initialRiders[riderIdx]
    const itemStr = foodItems[Math.floor(Math.random() * foodItems.length)]
    const itemParts = itemStr.split(', ').map(s => s.trim())
    const itemFoodTypes = itemParts.map(item => getFoodType(item))

    orders.push({
      id: `ORD-${String(1000 + i).padStart(4, '0')}`,
      status,
      delayed: isDelayed,
      cancelledBy,
      customer: customerNames[Math.floor(Math.random() * customerNames.length)],
      vendor: vendor.hotel,
      vendorOwner: vendor.owner,
      vendorPhone: vendor.phone,
      rider: rider.name,
      riderPhone: `+91-${rider.aadhaar.slice(-4)}${String(rider.id).padStart(6, '0')}`,
      items: itemStr,
      itemsFoodType: itemFoodTypes,
      orderTime: `${String(displayHour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${ampm}`,
      orderDate: `2025-0${month}-${String(day).padStart(2, '0')}`,
      amount,
    })
  }
  return orders
}

/* ───────────── FORM DEFAULTS ───────────── */
const emptyVendorForm = {
  hotel: '', phone: '', owner: '', aadhaar: '', aadhaarFile: '', pan: '', panFile: '',
  gst: '', gstFile: '', fssai: '', fssaiFile: '', address: '', city: '', state: '', pin: '',
  boardFile: '', bankName: '', accType: 'Savings', accNo: '', ifsc: '', branch: '',
}

const emptyRiderForm = {
  name: '', aadhaar: '', aadhaarFile: '', pan: '', panFile: '', photoFile: '',
  vehicle: '', vehicleFile: '', rcFile: '', dl: '', dlFile: '', city: '', state: '', pincode: '',
  bankName: '', accNo: '', ifsc: '', branch: '', handicap: 'NO' as 'YES' | 'NO',
}

const emptyMenuItemForm = {
  name: '', description: '', category: '', foodType: 'VEG' as FoodType, price: '',
  photoUrl: '', vendorId: '', vendorName: '',
}

/* ───────────── NAV ITEMS ───────────── */
const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'vendors', label: 'Vendors', icon: Store },
  { key: 'menuItems', label: 'Food Items', icon: UtensilsCrossed },
  { key: 'riders', label: 'Delivery Partners', icon: Bike },
  { key: 'orders', label: 'Order History', icon: ClipboardList },
  { key: 'payments', label: 'Payments', icon: CreditCard },
] as const

/* ───────────── VEG/NONVEG BADGE ───────────── */
function VegNonVegBadge({ type }: { type: FoodType }) {
  const isVeg = type === 'VEG'
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${isVeg ? 'bg-green-500/15 text-green-400 border border-green-500/30' : 'bg-red-500/15 text-red-400 border border-red-500/30'}`}>
      <span className={`flex size-2.5 items-center justify-center rounded-sm border ${isVeg ? 'border-green-500' : 'border-red-500'}`}>
        <span className={`size-1.5 rounded-full ${isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
      </span>
      {type === 'VEG' ? 'VEG' : 'NON-VEG'}
    </span>
  )
}

/* ───────────── STAR RATING ───────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star
          key={s}
          className={`size-3.5 ${s <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-600'}`}
        />
      ))}
      <span className="ml-1 text-xs text-neutral-400">{rating.toFixed(1)}</span>
    </span>
  )
}

/* ───────────── STATUS BADGE ───────────── */
function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
    approved: { bg: 'bg-green-500/10', text: 'text-green-400', icon: <CheckCircle2 className="size-3" /> },
    pending: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', icon: <Clock className="size-3" /> },
    rejected: { bg: 'bg-red-500/10', text: 'text-red-400', icon: <XCircle className="size-3" /> },
    live: { bg: 'bg-blue-500/10', text: 'text-blue-400', icon: <Clock className="size-3" /> },
    completed: { bg: 'bg-green-500/10', text: 'text-green-400', icon: <CheckCircle2 className="size-3" /> },
    cancelled: { bg: 'bg-red-500/10', text: 'text-red-400', icon: <XCircle className="size-3" /> },
  }
  const c = cfg[status] || cfg.pending
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${c.bg} ${c.text}`}>
      {c.icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

/* ───────────── FILE UPLOAD BUTTON ───────────── */
function FileUpload({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-neutral-400">{label}</label>
      <div className="flex items-center gap-2">
        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-neutral-400 transition hover:border-[#f97316]/40 hover:text-[#f97316]">
          <Upload className="size-3.5" />
          Choose File
          <input
            type="file"
            className="hidden"
            onChange={e => {
              const f = e.target.files?.[0]
              if (f) onChange(f.name)
            }}
          />
        </label>
        {value && <span className="text-xs text-neutral-500">{value}</span>}
      </div>
    </div>
  )
}

/* ───────────── EXCEL DOWNLOAD HELPER ───────────── */
function downloadCSV(data: Record<string, string | number>[], filename: string) {
  if (data.length === 0) {
    toast.error('No data to export')
    return
  }
  const headers = Object.keys(data[0])
  const csvRows = [
    headers.join(','),
    ...data.map(row => headers.map(h => {
      const val = String(row[h] ?? '')
      return val.includes(',') || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val
    }).join(','))
  ]
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.csv`
  a.click()
  URL.revokeObjectURL(url)
  toast.success(`${filename}.csv downloaded!`)
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function Home() {
  /* ── State ── */
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [vendors, setVendors] = useState<Vendor[]>(initialVendors)
  const [riders, setRiders] = useState<Rider[]>(initialRiders)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [orders] = useState<Order[]>(generateOrders)

  const [vendorSearch, setVendorSearch] = useState('')
  const [vendorSort, setVendorSort] = useState('name-asc')
  const [riderSearch, setRiderSearch] = useState('')
  const [riderSort, setRiderSort] = useState('name-asc')
  const [menuItemSearch, setMenuItemSearch] = useState('')
  const [menuItemSort, setMenuItemSort] = useState('name-asc')
  const [menuItemFilter, setMenuItemFilter] = useState<string>('all')
  const [orderTab, setOrderTab] = useState<string>('live')
  const [orderSearch, setOrderSearch] = useState('')
  const [orderSort, setOrderSort] = useState('date-desc')
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null)
  const [paymentTab, setPaymentTab] = useState<string>('hotel')

  const [showAddVendor, setShowAddVendor] = useState(false)
  const [showAddRider, setShowAddRider] = useState(false)
  const [showAddMenuItem, setShowAddMenuItem] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [detailItem, setDetailItem] = useState<Vendor | Rider | null>(null)
  const [detailType, setDetailType] = useState<'vendor' | 'rider'>('vendor')
  const [showFoodDetail, setShowFoodDetail] = useState(false)
  const [selectedFoodItem, setSelectedFoodItem] = useState<MenuItem | null>(null)

  const [globalCommission, setGlobalCommission] = useState('15')
  const [globalDeliveryFee, setGlobalDeliveryFee] = useState('30')

  const [vendorForm, setVendorForm] = useState({ ...emptyVendorForm })
  const [riderForm, setRiderForm] = useState({ ...emptyRiderForm })
  const [menuItemForm, setMenuItemForm] = useState({ ...emptyMenuItemForm })

  /* ── Computed ── */
  const filteredVendors = useMemo(() => {
    let list = [...vendors]
    if (vendorSearch) {
      const q = vendorSearch.toLowerCase()
      list = list.filter(v =>
        v.hotel.toLowerCase().includes(q) ||
        v.city.toLowerCase().includes(q) ||
        v.pin.includes(q) ||
        v.state.toLowerCase().includes(q)
      )
    }
    switch (vendorSort) {
      case 'name-asc': list.sort((a, b) => a.hotel.localeCompare(b.hotel)); break
      case 'rating-desc': list.sort((a, b) => b.rating - a.rating); break
      case 'orders-desc': list.sort((a, b) => b.totalOrders - a.totalOrders); break
      case 'cancelled-desc': list.sort((a, b) => b.cancelledHotelDelay - a.cancelledHotelDelay); break
    }
    return list
  }, [vendors, vendorSearch, vendorSort])

  const filteredRiders = useMemo(() => {
    let list = [...riders]
    if (riderSearch) {
      const q = riderSearch.toLowerCase()
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.pincode.includes(q) ||
        r.state.toLowerCase().includes(q)
      )
    }
    switch (riderSort) {
      case 'name-asc': list.sort((a, b) => a.name.localeCompare(b.name)); break
      case 'rating-desc': list.sort((a, b) => b.rating - a.rating); break
      case 'deliveries-desc': list.sort((a, b) => b.totalDeliveries - a.totalDeliveries); break
      case 'cancelled-desc': list.sort((a, b) => b.cancelledDelay - a.cancelledDelay); break
    }
    return list
  }, [riders, riderSearch, riderSort])

  const filteredMenuItems = useMemo(() => {
    let list = [...menuItems]
    if (menuItemSearch) {
      const q = menuItemSearch.toLowerCase()
      list = list.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.vendorName.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      )
    }
    if (menuItemFilter !== 'all') {
      list = list.filter(m => m.foodType === menuItemFilter)
    }
    switch (menuItemSort) {
      case 'name-asc': list.sort((a, b) => a.name.localeCompare(b.name)); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'hotel-asc': list.sort((a, b) => a.vendorName.localeCompare(b.vendorName)); break
    }
    return list
  }, [menuItems, menuItemSearch, menuItemSort, menuItemFilter])

  const filteredOrders = useMemo(() => {
    let list = orders.filter(o => o.status === orderTab)
    if (orderSearch) {
      const q = orderSearch.toLowerCase()
      list = list.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.vendor.toLowerCase().includes(q) ||
        o.vendorOwner.toLowerCase().includes(q) ||
        o.vendorPhone.includes(q) ||
        o.rider.toLowerCase().includes(q) ||
        o.riderPhone.includes(q) ||
        o.items.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.orderDate.includes(q) ||
        o.orderTime.toLowerCase().includes(q) ||
        String(o.amount).includes(q)
      )
    }
    switch (orderSort) {
      case 'date-desc': list.sort((a, b) => b.orderDate.localeCompare(a.orderDate) || b.orderTime.localeCompare(a.orderTime)); break
      case 'date-asc': list.sort((a, b) => a.orderDate.localeCompare(b.orderDate) || a.orderTime.localeCompare(b.orderTime)); break
      case 'price-desc': list.sort((a, b) => b.amount - a.amount); break
      case 'price-asc': list.sort((a, b) => a.amount - b.amount); break
      case 'hotel-asc': list.sort((a, b) => a.vendor.localeCompare(b.vendor)); break
      case 'rider-asc': list.sort((a, b) => a.rider.localeCompare(b.rider)); break
    }
    return list
  }, [orders, orderTab, orderSearch, orderSort])

  /* ── Dashboard stats ── */
  const pendingMenuItems = menuItems.filter(m => m.status === 'pending').length
  const stats = useMemo(() => [
    { label: 'Hotels Tie-up', count: vendors.length, icon: Store, color: 'text-[#f97316]', bg: 'bg-[#f97316]/10' },
    { label: 'Delivery Partners', count: riders.length, icon: Bike, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Food Items', count: menuItems.length, icon: UtensilsCrossed, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Orders Done', count: orders.filter(o => o.status === 'completed').length, icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Ongoing Orders', count: orders.filter(o => o.status === 'live').length, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Pending Food Approvals', count: pendingMenuItems, icon: AlertTriangle, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ], [vendors, riders, menuItems, orders, pendingMenuItems])

  /* ── Handlers ── */
  function handleDeleteVendor(id: number) {
    setVendors(prev => prev.filter(v => v.id !== id))
    toast.success('Vendor deleted successfully')
  }

  function handleDeleteRider(id: number) {
    setRiders(prev => prev.filter(r => r.id !== id))
    toast.success('Delivery partner deleted successfully')
  }

  function handleDeleteMenuItem(id: number) {
    setMenuItems(prev => prev.filter(m => m.id !== id))
    toast.success('Food item deleted successfully')
  }

  function handleApprove(id: number, type: 'vendor' | 'rider') {
    if (type === 'vendor') {
      setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'approved' as VendorStatus } : v))
    } else {
      setRiders(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' as RiderStatus } : r))
    }
    toast.success(`${type === 'vendor' ? 'Vendor' : 'Delivery partner'} approved successfully`)
    setShowDetailModal(false)
  }

  function handleReject(id: number, type: 'vendor' | 'rider') {
    if (type === 'vendor') {
      setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'rejected' as VendorStatus } : v))
    } else {
      setRiders(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' as RiderStatus } : r))
    }
    toast.success(`${type === 'vendor' ? 'Vendor' : 'Delivery partner'} rejected`)
    setShowDetailModal(false)
  }

  function handleApproveMenuItem(id: number) {
    setMenuItems(prev => prev.map(m => m.id === id ? { ...m, status: 'approved' as MenuItemStatus } : m))
    toast.success('Food item approved')
  }

  function handleRejectMenuItem(id: number) {
    setMenuItems(prev => prev.map(m => m.id === id ? { ...m, status: 'rejected' as MenuItemStatus } : m))
    toast.success('Food item rejected')
  }

  function handleAddVendor() {
    if (!vendorForm.hotel || !vendorForm.phone || !vendorForm.owner || !vendorForm.aadhaar || !vendorForm.pan || !vendorForm.address || !vendorForm.city || !vendorForm.state || !vendorForm.pin || !vendorForm.bankName || !vendorForm.accNo || !vendorForm.ifsc || !vendorForm.branch) {
      toast.error('Please fill in all required fields')
      return
    }
    const newVendor: Vendor = {
      id: Date.now(),
      hotel: vendorForm.hotel,
      phone: vendorForm.phone,
      owner: vendorForm.owner,
      aadhaar: vendorForm.aadhaar,
      aadhaarFile: vendorForm.aadhaarFile || 'Aadhaar.pdf',
      pan: vendorForm.pan,
      panFile: vendorForm.panFile || 'PAN.pdf',
      gst: vendorForm.gst,
      gstFile: vendorForm.gstFile,
      fssai: vendorForm.fssai,
      fssaiFile: vendorForm.fssaiFile,
      address: vendorForm.address,
      city: vendorForm.city,
      state: vendorForm.state,
      pin: vendorForm.pin,
      boardFile: vendorForm.boardFile,
      bankName: vendorForm.bankName,
      accType: vendorForm.accType,
      accNo: vendorForm.accNo,
      ifsc: vendorForm.ifsc,
      branch: vendorForm.branch,
      status: 'pending',
      rating: 0,
      totalOrders: 0,
      cancelledHotelDelay: 0,
      totalRevenue: 0,
      commission: parseFloat(globalCommission) || 15,
    }
    setVendors(prev => [...prev, newVendor])
    setShowAddVendor(false)
    setVendorForm({ ...emptyVendorForm })
    toast.success('Vendor added successfully')
  }

  function handleAddRider() {
    if (!riderForm.name || !riderForm.aadhaar || !riderForm.pan || !riderForm.vehicle || !riderForm.dl || !riderForm.city || !riderForm.state || !riderForm.pincode || !riderForm.bankName || !riderForm.accNo || !riderForm.ifsc || !riderForm.branch) {
      toast.error('Please fill in all required fields')
      return
    }
    const newRider: Rider = {
      id: Date.now(),
      name: riderForm.name,
      aadhaar: riderForm.aadhaar,
      aadhaarFile: riderForm.aadhaarFile || 'Aadhaar.pdf',
      pan: riderForm.pan,
      panFile: riderForm.panFile || 'PAN.pdf',
      photoFile: riderForm.photoFile || 'Photo.jpg',
      vehicle: riderForm.vehicle,
      vehicleFile: riderForm.vehicleFile || 'Vehicle.jpg',
      rcFile: riderForm.rcFile || 'RC.pdf',
      dl: riderForm.dl,
      dlFile: riderForm.dlFile || 'DL.pdf',
      city: riderForm.city,
      state: riderForm.state,
      pincode: riderForm.pincode,
      bankName: riderForm.bankName,
      accNo: riderForm.accNo,
      ifsc: riderForm.ifsc,
      branch: riderForm.branch,
      status: 'pending',
      rating: 0,
      totalDeliveries: 0,
      cancelledDelay: 0,
      totalEarnings: 0,
      deliveryFee: parseFloat(globalDeliveryFee) || 30,
      handicap: riderForm.handicap,
    }
    setRiders(prev => [...prev, newRider])
    setShowAddRider(false)
    setRiderForm({ ...emptyRiderForm })
    toast.success('Delivery partner added successfully')
  }

  function handleAddMenuItem() {
    if (!menuItemForm.name || !menuItemForm.category || !menuItemForm.price || !menuItemForm.vendorId) {
      toast.error('Please fill in all required fields')
      return
    }
    const vendor = vendors.find(v => v.id === Number(menuItemForm.vendorId))
    const newItem: MenuItem = {
      id: Date.now(),
      name: menuItemForm.name,
      description: menuItemForm.description,
      category: menuItemForm.category,
      foodType: menuItemForm.foodType,
      price: parseFloat(menuItemForm.price) || 0,
      photoUrl: menuItemForm.photoUrl,
      vendorId: Number(menuItemForm.vendorId),
      vendorName: vendor?.hotel || menuItemForm.vendorName || 'Unknown',
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    }
    setMenuItems(prev => [...prev, newItem])
    setShowAddMenuItem(false)
    setMenuItemForm({ ...emptyMenuItemForm })
    toast.success('Food item added successfully')
  }

  function handlePayVendor(id: number) {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, totalRevenue: 0 } : v))
    toast.success('Payment processed successfully')
  }

  function handlePayRider(id: number) {
    setRiders(prev => prev.map(r => r.id === id ? { ...r, totalEarnings: 0 } : r))
    toast.success('Payment processed successfully')
  }

  function handleApplyCommission() {
    const c = parseFloat(globalCommission) || 0
    setVendors(prev => prev.map(v => ({ ...v, commission: c })))
    toast.success(`Commission set to ${c}% for all vendors`)
  }

  function handleApplyDeliveryFee() {
    const f = parseFloat(globalDeliveryFee) || 0
    setRiders(prev => prev.map(r => ({ ...r, deliveryFee: f })))
    toast.success(`Delivery fee set to ₹${f} for all riders`)
  }

  function openDetail(item: Vendor | Rider, type: 'vendor' | 'rider') {
    setDetailItem(item)
    setDetailType(type)
    setShowDetailModal(true)
  }

  function openFoodDetail(item: MenuItem) {
    setSelectedFoodItem(item)
    setShowFoodDetail(true)
  }

  function handleExportRiders() {
    const data = filteredRiders.map(r => ({
      Name: r.name,
      Handicap: r.handicap,
      Vehicle: r.vehicle,
      City: r.city,
      Pincode: r.pincode,
      State: r.state,
      Rating: r.rating,
      Deliveries: r.totalDeliveries,
      Cancelled: r.cancelledDelay,
      Earnings: r.totalEarnings,
      DeliveryFee: r.deliveryFee,
      Status: r.status,
      BankName: r.bankName,
      AccountNo: r.accNo,
      IFSC: r.ifsc,
      Branch: r.branch,
    }))
    downloadCSV(data, `delivery_partners_${new Date().toISOString().split('T')[0]}`)
  }

  function handleExportMenuItems() {
    const data = filteredMenuItems.map(m => ({
      FoodName: m.name,
      Category: m.category,
      FoodType: m.foodType,
      Price: m.price,
      Hotel: m.vendorName,
      Description: m.description,
      Status: m.status,
      AddedDate: m.createdAt,
    }))
    downloadCSV(data, `food_items_${new Date().toISOString().split('T')[0]}`)
  }

  /* ═══════════════════════════════════════════
     LANDING SCREEN
     ═══════════════════════════════════════════ */
  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f0f1a] p-4">
        <div className="animate-fade-in text-center">
          <div className="mb-8 flex justify-center">
            <div className="animate-pulse-orange flex size-28 items-center justify-center rounded-3xl bg-[#1e1e30] shadow-2xl">
              <Flame className="size-16 text-[#f97316]" />
            </div>
          </div>
          <h1 className="mb-2 text-5xl font-bold tracking-tight">
            <span className="text-[#f97316]">Street</span>
            <span className="text-white">Bite</span>
          </h1>
          <p className="mb-10 text-neutral-500">Food Delivery Admin Dashboard</p>
          <button
            onClick={() => { setIsLoggedIn(true); toast.success('Welcome to StreetBite Admin!') }}
            className="rounded-xl bg-[#f97316] px-10 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#f97316]/25 transition hover:bg-[#ea6c0b] hover:shadow-xl hover:shadow-[#f97316]/30 active:scale-95"
          >
            Admin Login
          </button>
        </div>
      </div>
    )
  }

  /* ═══════════════════════════════════════════
     DASHBOARD LAYOUT
     ═══════════════════════════════════════════ */
  return (
    <div className="flex min-h-screen bg-[#0f0f1a]">
      {/* ── SIDEBAR ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`fixed z-50 flex h-full w-64 flex-col border-r border-white/5 bg-[#1e1e30] transition-transform duration-300 md:static md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 border-b border-white/5 px-5 py-5">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#f97316]/15">
            <Flame className="size-5 text-[#f97316]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">StreetBite</h2>
            <p className="text-[10px] tracking-widest text-neutral-500 uppercase">Admin Panel</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map(item => {
            const Icon = item.icon
            const active = activeSection === item.key
            const pendingBadge = item.key === 'menuItems' ? pendingMenuItems : 0
            return (
              <button
                key={item.key}
                onClick={() => { setActiveSection(item.key); setSidebarOpen(false) }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  active
                    ? 'bg-[#f97316]/10 text-[#f97316]'
                    : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'
                }`}
              >
                <Icon className="size-4.5" />
                <span className="flex-1 text-left">{item.label}</span>
                {pendingBadge > 0 && (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">{pendingBadge}</span>
                )}
              </button>
            )
          })}
        </nav>
        <div className="border-t border-white/5 px-3 py-4">
          <button
            onClick={() => { setIsLoggedIn(false); toast.info('Logged out') }}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <X className="size-4.5" />
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-[#0f0f1a]/80 px-4 py-3 backdrop-blur-lg md:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-neutral-400 hover:bg-white/5 md:hidden">
              <Menu className="size-5" />
            </button>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <span>Home</span>
              <ChevronRight className="size-3.5" />
              <span className="text-white font-medium">{navItems.find(n => n.key === activeSection)?.label}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-[#f97316]/15">
              <User className="size-4 text-[#f97316]" />
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6">
          {/* ── DASHBOARD SECTION ── */}
          {activeSection === 'dashboard' && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-sm text-neutral-500">Welcome back! Here&apos;s your overview.</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map(s => {
                  const Icon = s.icon
                  return (
                    <div key={s.label} className="rounded-2xl border border-white/5 bg-[#1e1e30] p-5 transition hover:border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">{s.label}</p>
                          <p className="mt-2 text-3xl font-bold text-white">{s.count}</p>
                        </div>
                        <div className={`flex size-12 items-center justify-center rounded-2xl ${s.bg}`}>
                          <Icon className={`size-6 ${s.color}`} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── VENDORS SECTION ── */}
          {activeSection === 'vendors' && (
            <div className="animate-fade-in space-y-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Vendors</h1>
                  <p className="text-sm text-neutral-500">Manage hotel and restaurant partners</p>
                </div>
                <button
                  onClick={() => setShowAddVendor(true)}
                  className="flex items-center gap-2 rounded-xl bg-[#f97316] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#f97316]/20 transition hover:bg-[#ea6c0b] active:scale-95"
                >
                  <Plus className="size-4" /> Add Vendor
                </button>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Search by name, city, pincode, state..."
                    value={vendorSearch}
                    onChange={e => setVendorSearch(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-[#f97316]/50 focus:ring-1 focus:ring-[#f97316]/25"
                  />
                </div>
                <Select value={vendorSort} onValueChange={setVendorSort}>
                  <SelectTrigger className="w-full rounded-xl border-white/10 bg-white/5 text-sm text-neutral-300 sm:w-52">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#1a1a2e]">
                    <SelectItem value="name-asc">Name A-Z</SelectItem>
                    <SelectItem value="rating-desc">Rating High-Low</SelectItem>
                    <SelectItem value="orders-desc">Orders High-Low</SelectItem>
                    <SelectItem value="cancelled-desc">Cancelled High-Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#1e1e30]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Hotel Name</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Rating</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Orders</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Cancelled</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Pincode</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">State</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">City</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Status</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredVendors.length === 0 && (
                      <tr><td colSpan={9} className="px-4 py-12 text-center text-neutral-500">No vendors found</td></tr>
                    )}
                    {filteredVendors.map(v => (
                      <tr key={v.id} className="transition hover:bg-white/[0.02]">
                        <td className="px-4 py-3 font-medium text-white">{v.hotel}</td>
                        <td className="px-4 py-3"><StarRating rating={v.rating} /></td>
                        <td className="px-4 py-3 text-neutral-300">{v.totalOrders}</td>
                        <td className="px-4 py-3 text-red-400">{v.cancelledHotelDelay}</td>
                        <td className="px-4 py-3 text-neutral-300">{v.pin}</td>
                        <td className="px-4 py-3 text-neutral-300">{v.state}</td>
                        <td className="px-4 py-3 text-neutral-300">{v.city}</td>
                        <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => openDetail(v, 'vendor')} className="rounded-lg p-1.5 text-neutral-400 transition hover:bg-[#f97316]/10 hover:text-[#f97316]" title="View">
                              <Eye className="size-4" />
                            </button>
                            <button onClick={() => handleDeleteVendor(v.id)} className="rounded-lg p-1.5 text-neutral-400 transition hover:bg-red-500/10 hover:text-red-400" title="Delete">
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── FOOD ITEMS / MENU ITEMS SECTION ── */}
          {activeSection === 'menuItems' && (
            <div className="animate-fade-in space-y-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Food Items</h1>
                  <p className="text-sm text-neutral-500">Manage hotel food menus - approve photos, descriptions & categories</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleExportMenuItems}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-neutral-300 transition hover:bg-white/10 hover:text-white"
                  >
                    <Download className="size-4" /> Export
                  </button>
                  <button
                    onClick={() => setShowAddMenuItem(true)}
                    className="flex items-center gap-2 rounded-xl bg-[#f97316] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#f97316]/20 transition hover:bg-[#ea6c0b] active:scale-95"
                  >
                    <Plus className="size-4" /> Add Food Item
                  </button>
                </div>
              </div>

              {/* Search, Filter & Sort */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Search by food name, category, hotel, description..."
                    value={menuItemSearch}
                    onChange={e => setMenuItemSearch(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-[#f97316]/50 focus:ring-1 focus:ring-[#f97316]/25"
                  />
                </div>
                <Select value={menuItemFilter} onValueChange={setMenuItemFilter}>
                  <SelectTrigger className="w-full rounded-xl border-white/10 bg-white/5 text-sm text-neutral-300 sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#1a1a2e]">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="VEG">VEG Only</SelectItem>
                    <SelectItem value="NONVEG">NON-VEG Only</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={menuItemSort} onValueChange={setMenuItemSort}>
                  <SelectTrigger className="w-full rounded-xl border-white/10 bg-white/5 text-sm text-neutral-300 sm:w-52">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#1a1a2e]">
                    <SelectItem value="name-asc">Name A-Z</SelectItem>
                    <SelectItem value="price-desc">Price High-Low</SelectItem>
                    <SelectItem value="price-asc">Price Low-High</SelectItem>
                    <SelectItem value="hotel-asc">Hotel A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Menu Items Table */}
              <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#1e1e30]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Food Name</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Photo</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">VEG/NON-VEG</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Category</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Price</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Hotel</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Description</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Status</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredMenuItems.length === 0 && (
                      <tr><td colSpan={9} className="px-4 py-12 text-center text-neutral-500">No food items found</td></tr>
                    )}
                    {filteredMenuItems.map(m => (
                      <tr key={m.id} className="transition hover:bg-white/[0.02]">
                        <td className="px-4 py-3">
                          <button onClick={() => openFoodDetail(m)} className="font-medium text-[#f97316] hover:underline cursor-pointer text-left">
                            {m.name}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          {m.photoUrl ? (
                            <div className="flex size-12 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5">
                              <ImageIcon className="size-5 text-neutral-500" />
                            </div>
                          ) : (
                            <div className="flex size-12 items-center justify-center rounded-lg border border-dashed border-white/10 bg-white/[0.02]">
                              <ImageIcon className="size-5 text-neutral-600" />
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3"><VegNonVegBadge type={m.foodType} /></td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#f97316]/10 px-2 py-0.5 text-xs font-medium text-[#f97316]">
                            <Tag className="size-2.5" /> {m.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-bold text-white">₹{m.price}</td>
                        <td className="px-4 py-3 text-neutral-300">{m.vendorName}</td>
                        <td className="px-4 py-3 text-neutral-400 max-w-[200px] truncate text-xs">{m.description || '-'}</td>
                        <td className="px-4 py-3"><StatusBadge status={m.status} /></td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => openFoodDetail(m)} className="rounded-lg p-1.5 text-neutral-400 transition hover:bg-[#f97316]/10 hover:text-[#f97316]" title="View Details">
                              <Eye className="size-4" />
                            </button>
                            {m.status === 'pending' && (
                              <>
                                <button onClick={() => handleApproveMenuItem(m.id)} className="rounded-lg p-1.5 text-neutral-400 transition hover:bg-green-500/10 hover:text-green-400" title="Approve">
                                  <CheckCircle2 className="size-4" />
                                </button>
                                <button onClick={() => handleRejectMenuItem(m.id)} className="rounded-lg p-1.5 text-neutral-400 transition hover:bg-red-500/10 hover:text-red-400" title="Reject">
                                  <XCircle className="size-4" />
                                </button>
                              </>
                            )}
                            <button onClick={() => handleDeleteMenuItem(m.id)} className="rounded-lg p-1.5 text-neutral-400 transition hover:bg-red-500/10 hover:text-red-400" title="Delete">
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pending Food Approvals Summary */}
              {pendingMenuItems > 0 && (
                <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="size-5 text-yellow-400" />
                    <div>
                      <p className="text-sm font-medium text-yellow-400">{pendingMenuItems} food item(s) pending approval</p>
                      <p className="text-xs text-neutral-500">Review food photos and descriptions before approving</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── DELIVERY PARTNERS SECTION ── */}
          {activeSection === 'riders' && (
            <div className="animate-fade-in space-y-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Delivery Partners</h1>
                  <p className="text-sm text-neutral-500">Manage riders and delivery personnel</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleExportRiders}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-neutral-300 transition hover:bg-white/10 hover:text-white"
                  >
                    <Download className="size-4" /> Export
                  </button>
                  <button
                    onClick={() => setShowAddRider(true)}
                    className="flex items-center gap-2 rounded-xl bg-[#f97316] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#f97316]/20 transition hover:bg-[#ea6c0b] active:scale-95"
                  >
                    <Plus className="size-4" /> Add Partner
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Search by name, city, pincode, state..."
                    value={riderSearch}
                    onChange={e => setRiderSearch(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-[#f97316]/50 focus:ring-1 focus:ring-[#f97316]/25"
                  />
                </div>
                <Select value={riderSort} onValueChange={setRiderSort}>
                  <SelectTrigger className="w-full rounded-xl border-white/10 bg-white/5 text-sm text-neutral-300 sm:w-52">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#1a1a2e]">
                    <SelectItem value="name-asc">Name A-Z</SelectItem>
                    <SelectItem value="rating-desc">Rating High-Low</SelectItem>
                    <SelectItem value="deliveries-desc">Deliveries High-Low</SelectItem>
                    <SelectItem value="cancelled-desc">Cancelled High-Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#1e1e30]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Name</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Handicap</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Rating</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Deliveries</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Cancelled</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">City</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Pincode</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">State</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Status</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredRiders.length === 0 && (
                      <tr><td colSpan={10} className="px-4 py-12 text-center text-neutral-500">No delivery partners found</td></tr>
                    )}
                    {filteredRiders.map(r => (
                      <tr key={r.id} className="transition hover:bg-white/[0.02]">
                        <td className="px-4 py-3 font-medium text-white">{r.name}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${r.handicap === 'YES' ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30' : 'bg-neutral-500/10 text-neutral-400 border border-neutral-500/20'}`}>
                            {r.handicap === 'YES' ? <Accessibility className="size-3" /> : null}
                            {r.handicap}
                          </span>
                        </td>
                        <td className="px-4 py-3"><StarRating rating={r.rating} /></td>
                        <td className="px-4 py-3 text-neutral-300">{r.totalDeliveries}</td>
                        <td className="px-4 py-3 text-red-400">{r.cancelledDelay}</td>
                        <td className="px-4 py-3 text-neutral-300">{r.city}</td>
                        <td className="px-4 py-3 text-neutral-300">{r.pincode}</td>
                        <td className="px-4 py-3 text-neutral-300">{r.state}</td>
                        <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => openDetail(r, 'rider')} className="rounded-lg p-1.5 text-neutral-400 transition hover:bg-[#f97316]/10 hover:text-[#f97316]" title="View">
                              <Eye className="size-4" />
                            </button>
                            <button onClick={() => handleDeleteRider(r.id)} className="rounded-lg p-1.5 text-neutral-400 transition hover:bg-red-500/10 hover:text-red-400" title="Delete">
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── ORDER HISTORY SECTION ── */}
          {activeSection === 'orders' && (
            <div className="animate-fade-in space-y-5">
              <div>
                <h1 className="text-2xl font-bold text-white">Order History</h1>
                <p className="text-sm text-neutral-500">Track and manage all orders</p>
              </div>
              {/* Sub-tabs */}
              <div className="flex gap-1 rounded-xl bg-[#1e1e30] p-1">
                {(['live', 'completed', 'cancelled'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setOrderTab(tab)}
                    className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
                      orderTab === tab
                        ? 'bg-[#f97316] text-white shadow-lg shadow-[#f97316]/20'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {tab === 'live' ? 'Live Orders' : tab === 'completed' ? 'Completed' : 'Cancelled'}
                    <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs">
                      {orders.filter(o => o.status === tab).length}
                    </span>
                  </button>
                ))}
              </div>
              {/* Search & Sort */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Search by Order No, Hotel, Owner, Rider, Items, Date..."
                    value={orderSearch}
                    onChange={e => setOrderSearch(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-[#f97316]/50 focus:ring-1 focus:ring-[#f97316]/25"
                  />
                </div>
                <Select value={orderSort} onValueChange={setOrderSort}>
                  <SelectTrigger className="w-full rounded-xl border-white/10 bg-white/5 text-sm text-neutral-300 sm:w-52">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#1a1a2e]">
                    <SelectItem value="date-desc">Date (Newest)</SelectItem>
                    <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                    <SelectItem value="price-desc">Price (High-Low)</SelectItem>
                    <SelectItem value="price-asc">Price (Low-High)</SelectItem>
                    <SelectItem value="hotel-asc">Hotel (A-Z)</SelectItem>
                    <SelectItem value="rider-asc">Rider (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Order list table */}
              <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#1e1e30]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3 whitespace-nowrap">Order No</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3 whitespace-nowrap">Status</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3 whitespace-nowrap">Hotel Name</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3 whitespace-nowrap">Owner Name</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3 whitespace-nowrap">Owner Contact</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3 whitespace-nowrap">Delivery Partner</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3 whitespace-nowrap">Partner Contact</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3 whitespace-nowrap">Items Ordered</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3 whitespace-nowrap">Order Date</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3 whitespace-nowrap">Order Time</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3 whitespace-nowrap text-right">Price</th>
                      <th className="sticky top-0 bg-[#1e1e30] px-4 py-3 whitespace-nowrap text-right">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredOrders.length === 0 && (
                      <tr><td colSpan={12} className="px-4 py-12 text-center text-neutral-500">No {orderTab} orders found</td></tr>
                    )}
                    {filteredOrders.map(o => {
                      const itemParts = o.items.split(', ')
                      return (
                        <tr key={o.id} className="transition hover:bg-white/[0.02]">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#f97316]">{o.id}</span>
                              {o.delayed && (
                                <span className="inline-flex items-center gap-0.5 rounded-full bg-purple-500/10 px-1.5 py-0.5 text-[10px] font-medium text-purple-400">
                                  <AlertTriangle className="size-2.5" /> Delayed
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <StatusBadge status={o.status} />
                              {o.cancelledBy && (
                                <span className="inline-flex items-center gap-0.5 rounded-full bg-red-500/10 px-1.5 py-0.5 text-[10px] font-medium text-red-400">
                                  By: {o.cancelledBy}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap font-medium text-white">{o.vendor}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-neutral-300">{o.vendorOwner}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-neutral-300">{o.vendorPhone}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-neutral-300">{o.rider}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-neutral-300">{o.riderPhone}</td>
                          <td className="px-4 py-3 text-neutral-300 min-w-[220px]">
                            <div className="flex flex-wrap items-start gap-1.5">
                              <ShoppingBag className="size-3.5 mt-0.5 shrink-0 text-[#f97316]/60" />
                              <div className="flex flex-wrap gap-1">
                                {itemParts.map((item, idx) => {
                                  const ft = o.itemsFoodType?.[idx] || getFoodType(item)
                                  return (
                                    <span key={idx} className="inline-flex items-center gap-1">
                                      <VegNonVegBadge type={ft} />
                                      <span className="whitespace-normal leading-snug text-xs">{item}</span>
                                      {idx < itemParts.length - 1 && <span className="text-neutral-600">,</span>}
                                    </span>
                                  )
                                })}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-neutral-400">{o.orderDate}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-neutral-400">{o.orderTime}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-right font-bold text-[#f97316]">₹{o.amount}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-right">
                            <button
                              onClick={() => setInvoiceOrder(o)}
                              className="inline-flex items-center gap-1 rounded-lg bg-[#f97316]/10 px-2.5 py-1.5 text-xs font-semibold text-[#f97316] border border-[#f97316]/20 transition hover:bg-[#f97316] hover:text-white"
                            >
                              <Eye className="size-3" /> View
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── PAYMENTS SECTION ── */}
          {activeSection === 'payments' && (
            <div className="animate-fade-in space-y-5">
              <div>
                <h1 className="text-2xl font-bold text-white">Payments</h1>
                <p className="text-sm text-neutral-500">Manage commissions and delivery fees</p>
              </div>
              <div className="flex gap-1 rounded-xl bg-[#1e1e30] p-1">
                {(['hotel', 'delivery'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setPaymentTab(tab)}
                    className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
                      paymentTab === tab
                        ? 'bg-[#f97316] text-white shadow-lg shadow-[#f97316]/20'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {tab === 'hotel' ? 'Hotel Commission' : 'Delivery Fee'}
                  </button>
                ))}
              </div>

              {paymentTab === 'hotel' && (
                <div className="space-y-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-400">Global Commission %</label>
                      <input
                        type="number"
                        value={globalCommission}
                        onChange={e => setGlobalCommission(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition focus:border-[#f97316]/50 sm:w-40"
                      />
                    </div>
                    <button
                      onClick={handleApplyCommission}
                      className="rounded-xl bg-[#f97316] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ea6c0b] active:scale-95"
                    >
                      Apply
                    </button>
                  </div>
                  <div className="space-y-3">
                    {vendors.filter(v => v.status === 'approved').map(v => {
                      const commissionAmt = Math.round(v.totalRevenue * v.commission / 100)
                      const vendorShare = v.totalRevenue - commissionAmt
                      return (
                        <div key={v.id} className="rounded-2xl border border-white/5 bg-[#1e1e30] p-4">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="space-y-1">
                              <h3 className="font-semibold text-white">{v.hotel}</h3>
                              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-neutral-400">
                                <span>Total Revenue: <span className="text-white font-medium">₹{v.totalRevenue.toLocaleString()}</span></span>
                                <span>Commission ({v.commission}%): <span className="text-[#f97316] font-medium">₹{commissionAmt.toLocaleString()}</span></span>
                                <span>Vendor Share: <span className="text-green-400 font-medium">₹{vendorShare.toLocaleString()}</span></span>
                              </div>
                            </div>
                            <button
                              onClick={() => handlePayVendor(v.id)}
                              className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 transition hover:bg-green-500/20 active:scale-95"
                            >
                              <IndianRupee className="size-3.5" /> Pay
                            </button>
                          </div>
                        </div>
                      )
                    })}
                    {vendors.filter(v => v.status === 'approved').length === 0 && (
                      <div className="rounded-2xl border border-white/5 bg-[#1e1e30] py-12 text-center text-neutral-500">
                        No approved vendors
                      </div>
                    )}
                  </div>
                </div>
              )}

              {paymentTab === 'delivery' && (
                <div className="space-y-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-400">Global Delivery Fee ₹</label>
                      <input
                        type="number"
                        value={globalDeliveryFee}
                        onChange={e => setGlobalDeliveryFee(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition focus:border-[#f97316]/50 sm:w-40"
                      />
                    </div>
                    <button
                      onClick={handleApplyDeliveryFee}
                      className="rounded-xl bg-[#f97316] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ea6c0b] active:scale-95"
                    >
                      Apply
                    </button>
                  </div>
                  <div className="space-y-3">
                    {riders.filter(r => r.status === 'approved').map(r => (
                      <div key={r.id} className="rounded-2xl border border-white/5 bg-[#1e1e30] p-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="space-y-1">
                            <h3 className="font-semibold text-white">{r.name}</h3>
                            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-neutral-400">
                              <span>Total Deliveries: <span className="text-white font-medium">{r.totalDeliveries}</span></span>
                              <span>Fee/delivery: <span className="text-[#f97316] font-medium">₹{r.deliveryFee}</span></span>
                              <span>Total Earnings: <span className="text-green-400 font-medium">₹{r.totalEarnings.toLocaleString()}</span></span>
                            </div>
                          </div>
                          <button
                            onClick={() => handlePayRider(r.id)}
                            className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 transition hover:bg-green-500/20 active:scale-95"
                          >
                            <IndianRupee className="size-3.5" /> Pay
                          </button>
                        </div>
                      </div>
                    ))}
                    {riders.filter(r => r.status === 'approved').length === 0 && (
                      <div className="rounded-2xl border border-white/5 bg-[#1e1e30] py-12 text-center text-neutral-500">
                        No approved delivery partners
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* ═══════════════════════════════════════════
         ADD VENDOR MODAL
         ═══════════════════════════════════════════ */}
      <Dialog open={showAddVendor} onOpenChange={setShowAddVendor}>
        <DialogContent className="max-h-[85vh] overflow-y-auto bg-[#1a1a2e] border-white/10 text-white sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Add New Vendor</DialogTitle>
            <DialogDescription className="text-neutral-400">Fill in the vendor details below. Fields marked with * are required.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-[#f97316]">
              <Store className="size-4" /> Hotel Information
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">Hotel Name *</label>
                <input value={vendorForm.hotel} onChange={e => setVendorForm(p => ({ ...p, hotel: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">Phone *</label>
                <input value={vendorForm.phone} onChange={e => setVendorForm(p => ({ ...p, phone: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">Owner Name *</label>
                <input value={vendorForm.owner} onChange={e => setVendorForm(p => ({ ...p, owner: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">Aadhaar Number *</label>
                <input value={vendorForm.aadhaar} onChange={e => setVendorForm(p => ({ ...p, aadhaar: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <FileUpload label="Aadhaar Document *" value={vendorForm.aadhaarFile} onChange={v => setVendorForm(p => ({ ...p, aadhaarFile: v }))} />
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">PAN Number *</label>
                <input value={vendorForm.pan} onChange={e => setVendorForm(p => ({ ...p, pan: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <FileUpload label="PAN Document *" value={vendorForm.panFile} onChange={v => setVendorForm(p => ({ ...p, panFile: v }))} />
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">GST Number (optional)</label>
                <input value={vendorForm.gst} onChange={e => setVendorForm(p => ({ ...p, gst: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <FileUpload label="GST Document" value={vendorForm.gstFile} onChange={v => setVendorForm(p => ({ ...p, gstFile: v }))} />
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">FSSAI Number (optional)</label>
                <input value={vendorForm.fssai} onChange={e => setVendorForm(p => ({ ...p, fssai: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <FileUpload label="FSSAI Document" value={vendorForm.fssaiFile} onChange={v => setVendorForm(p => ({ ...p, fssaiFile: v }))} />
            </div>
          </div>
          <div className="space-y-4 pt-2">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-[#f97316]">
              <MapPin className="size-4" /> Address
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-medium text-neutral-400">Full Address *</label>
                <input value={vendorForm.address} onChange={e => setVendorForm(p => ({ ...p, address: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">City *</label>
                <input value={vendorForm.city} onChange={e => setVendorForm(p => ({ ...p, city: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">State *</label>
                <input value={vendorForm.state} onChange={e => setVendorForm(p => ({ ...p, state: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">Pin Code *</label>
                <input value={vendorForm.pin} onChange={e => setVendorForm(p => ({ ...p, pin: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <FileUpload label="Name Board Photo (optional)" value={vendorForm.boardFile} onChange={v => setVendorForm(p => ({ ...p, boardFile: v }))} />
            </div>
          </div>
          <div className="space-y-4 pt-2">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-[#f97316]">
              <Banknote className="size-4" /> Bank Details
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">Bank Name *</label>
                <input value={vendorForm.bankName} onChange={e => setVendorForm(p => ({ ...p, bankName: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">Account Type *</label>
                <Select value={vendorForm.accType} onValueChange={v => setVendorForm(p => ({ ...p, accType: v }))}>
                  <SelectTrigger className="rounded-xl border-white/10 bg-white/5 text-sm text-neutral-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#1a1a2e]">
                    <SelectItem value="Savings">Savings</SelectItem>
                    <SelectItem value="Current">Current</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">Account Number *</label>
                <input value={vendorForm.accNo} onChange={e => setVendorForm(p => ({ ...p, accNo: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">IFSC Code *</label>
                <input value={vendorForm.ifsc} onChange={e => setVendorForm(p => ({ ...p, ifsc: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-medium text-neutral-400">Branch Name *</label>
                <input value={vendorForm.branch} onChange={e => setVendorForm(p => ({ ...p, branch: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
            </div>
          </div>
          <DialogFooter className="pt-4">
            <button onClick={() => { setShowAddVendor(false); setVendorForm({ ...emptyVendorForm }) }} className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-neutral-400 transition hover:bg-white/5">
              Cancel
            </button>
            <button onClick={handleAddVendor} className="rounded-xl bg-[#f97316] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ea6c0b] active:scale-95">
              Add Vendor
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══════════════════════════════════════════
         ADD RIDER MODAL
         ═══════════════════════════════════════════ */}
      <Dialog open={showAddRider} onOpenChange={setShowAddRider}>
        <DialogContent className="max-h-[85vh] overflow-y-auto bg-[#1a1a2e] border-white/10 text-white sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Add New Delivery Partner</DialogTitle>
            <DialogDescription className="text-neutral-400">Fill in the rider details below. Fields marked with * are required.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-[#f97316]">
              <Bike className="size-4" /> Personal Information
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">Full Name *</label>
                <input value={riderForm.name} onChange={e => setRiderForm(p => ({ ...p, name: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">Aadhaar Number *</label>
                <input value={riderForm.aadhaar} onChange={e => setRiderForm(p => ({ ...p, aadhaar: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <FileUpload label="Aadhaar Document *" value={riderForm.aadhaarFile} onChange={v => setRiderForm(p => ({ ...p, aadhaarFile: v }))} />
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">PAN Number *</label>
                <input value={riderForm.pan} onChange={e => setRiderForm(p => ({ ...p, pan: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <FileUpload label="PAN Document *" value={riderForm.panFile} onChange={v => setRiderForm(p => ({ ...p, panFile: v }))} />
              <FileUpload label="Photo *" value={riderForm.photoFile} onChange={v => setRiderForm(p => ({ ...p, photoFile: v }))} />
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">Vehicle Number *</label>
                <input value={riderForm.vehicle} onChange={e => setRiderForm(p => ({ ...p, vehicle: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <FileUpload label="Vehicle Photo *" value={riderForm.vehicleFile} onChange={v => setRiderForm(p => ({ ...p, vehicleFile: v }))} />
              <FileUpload label="RC Document *" value={riderForm.rcFile} onChange={v => setRiderForm(p => ({ ...p, rcFile: v }))} />
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">DL Number *</label>
                <input value={riderForm.dl} onChange={e => setRiderForm(p => ({ ...p, dl: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <FileUpload label="DL Document *" value={riderForm.dlFile} onChange={v => setRiderForm(p => ({ ...p, dlFile: v }))} />
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">City *</label>
                <input value={riderForm.city} onChange={e => setRiderForm(p => ({ ...p, city: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">State *</label>
                <input value={riderForm.state} onChange={e => setRiderForm(p => ({ ...p, state: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">Pincode *</label>
                <input value={riderForm.pincode} onChange={e => setRiderForm(p => ({ ...p, pincode: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              {/* Handicap Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">Handicap *</label>
                <Select value={riderForm.handicap} onValueChange={v => setRiderForm(p => ({ ...p, handicap: v as 'YES' | 'NO' }))}>
                  <SelectTrigger className="rounded-xl border-white/10 bg-white/5 text-sm text-neutral-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#1a1a2e]">
                    <SelectItem value="NO">NO</SelectItem>
                    <SelectItem value="YES">YES</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="space-y-4 pt-2">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-[#f97316]">
              <Banknote className="size-4" /> Bank Details
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">Bank Name *</label>
                <input value={riderForm.bankName} onChange={e => setRiderForm(p => ({ ...p, bankName: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">Account Number *</label>
                <input value={riderForm.accNo} onChange={e => setRiderForm(p => ({ ...p, accNo: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">IFSC Code *</label>
                <input value={riderForm.ifsc} onChange={e => setRiderForm(p => ({ ...p, ifsc: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-medium text-neutral-400">Branch Name *</label>
                <input value={riderForm.branch} onChange={e => setRiderForm(p => ({ ...p, branch: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" />
              </div>
            </div>
          </div>
          <DialogFooter className="pt-4">
            <button onClick={() => { setShowAddRider(false); setRiderForm({ ...emptyRiderForm }) }} className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-neutral-400 transition hover:bg-white/5">
              Cancel
            </button>
            <button onClick={handleAddRider} className="rounded-xl bg-[#f97316] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ea6c0b] active:scale-95">
              Add Partner
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══════════════════════════════════════════
         ADD MENU ITEM MODAL
         ═══════════════════════════════════════════ */}
      <Dialog open={showAddMenuItem} onOpenChange={setShowAddMenuItem}>
        <DialogContent className="max-h-[85vh] overflow-y-auto bg-[#1a1a2e] border-white/10 text-white sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Add New Food Item</DialogTitle>
            <DialogDescription className="text-neutral-400">Add a food item to a hotel menu. All food items need admin approval.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-[#f97316]">
              <UtensilsCrossed className="size-4" /> Food Details
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">Food Name *</label>
                <input value={menuItemForm.name} onChange={e => setMenuItemForm(p => ({ ...p, name: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" placeholder="e.g., Chicken Biryani" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">Category *</label>
                <input value={menuItemForm.category} onChange={e => setMenuItemForm(p => ({ ...p, category: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" placeholder="e.g., Biryani, South Indian" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">VEG / NON-VEG *</label>
                <Select value={menuItemForm.foodType} onValueChange={v => setMenuItemForm(p => ({ ...p, foodType: v as FoodType }))}>
                  <SelectTrigger className="rounded-xl border-white/10 bg-white/5 text-sm text-neutral-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#1a1a2e]">
                    <SelectItem value="VEG">VEG</SelectItem>
                    <SelectItem value="NONVEG">NON-VEG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">Price (₹) *</label>
                <input type="number" value={menuItemForm.price} onChange={e => setMenuItemForm(p => ({ ...p, price: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50" placeholder="e.g., 250" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-medium text-neutral-400">Description</label>
                <textarea value={menuItemForm.description} onChange={e => setMenuItemForm(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#f97316]/50 resize-none" placeholder="Describe the food item..." />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-400">Hotel / Vendor *</label>
                <Select value={menuItemForm.vendorId} onValueChange={v => {
                  const vendor = vendors.find(vd => vd.id === Number(v))
                  setMenuItemForm(p => ({ ...p, vendorId: v, vendorName: vendor?.hotel || '' }))
                }}>
                  <SelectTrigger className="rounded-xl border-white/10 bg-white/5 text-sm text-neutral-300">
                    <SelectValue placeholder="Select Hotel" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#1a1a2e]">
                    {vendors.map(v => (
                      <SelectItem key={v.id} value={String(v.id)}>{v.hotel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <FileUpload label="Food Photo" value={menuItemForm.photoUrl} onChange={v => setMenuItemForm(p => ({ ...p, photoUrl: v }))} />
            </div>
          </div>
          <DialogFooter className="pt-4">
            <button onClick={() => { setShowAddMenuItem(false); setMenuItemForm({ ...emptyMenuItemForm }) }} className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-neutral-400 transition hover:bg-white/5">
              Cancel
            </button>
            <button onClick={handleAddMenuItem} className="rounded-xl bg-[#f97316] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ea6c0b] active:scale-95">
              Add Food Item
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══════════════════════════════════════════
         FOOD DETAIL MODAL
         ═══════════════════════════════════════════ */}
      <Dialog open={showFoodDetail} onOpenChange={setShowFoodDetail}>
        <DialogContent className="max-h-[85vh] overflow-y-auto bg-[#1a1a2e] border-white/10 text-white sm:max-w-lg">
          {selectedFoodItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl text-white flex items-center gap-3">
                  {selectedFoodItem.name}
                  <VegNonVegBadge type={selectedFoodItem.foodType} />
                </DialogTitle>
                <DialogDescription className="text-neutral-400">Food item details</DialogDescription>
              </DialogHeader>

              {/* Food Photo */}
              <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                {selectedFoodItem.photoUrl ? (
                  <div className="flex items-center justify-center bg-black/20 p-4 min-h-[200px]">
                    <div className="text-center">
                      <ImageIcon className="size-16 text-neutral-500 mx-auto mb-2" />
                      <p className="text-xs text-neutral-500">Photo: {selectedFoodItem.photoUrl}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-8 min-h-[200px]">
                    <div className="text-center">
                      <ImageIcon className="size-16 text-neutral-600 mx-auto mb-2" />
                      <p className="text-xs text-neutral-500">No photo uploaded</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Food Details */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-wide">Category</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-[#f97316]">
                      <Tag className="size-3.5" /> {selectedFoodItem.category}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-wide">Price</p>
                    <p className="mt-1 text-sm font-bold text-white">₹{selectedFoodItem.price}</p>
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-wide">Hotel</p>
                  <p className="mt-1 text-sm font-medium text-white">{selectedFoodItem.vendorName}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-wide">Description</p>
                  <p className="mt-1 text-sm text-neutral-300">{selectedFoodItem.description || 'No description provided'}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-wide">Approval Status</p>
                  <div className="mt-1"><StatusBadge status={selectedFoodItem.status} /></div>
                </div>
              </div>

              {/* Approve/Reject for pending items */}
              {selectedFoodItem.status === 'pending' && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => { handleApproveMenuItem(selectedFoodItem.id); setSelectedFoodItem({ ...selectedFoodItem, status: 'approved' }) }}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-2.5 text-sm font-semibold text-green-400 transition hover:bg-green-500/20 active:scale-95"
                  >
                    <CheckCircle2 className="size-4" /> Approve Food
                  </button>
                  <button
                    onClick={() => { handleRejectMenuItem(selectedFoodItem.id); setSelectedFoodItem({ ...selectedFoodItem, status: 'rejected' }) }}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 active:scale-95"
                  >
                    <XCircle className="size-4" /> Reject Food
                  </button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ═══════════════════════════════════════════
         DETAIL MODAL (VENDOR / RIDER)
         ═══════════════════════════════════════════ */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-h-[85vh] overflow-y-auto bg-[#1a1a2e] border-white/10 text-white sm:max-w-lg">
          {detailItem && detailType === 'vendor' && (() => {
            const v = detailItem as Vendor
            return (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl text-white">{v.hotel}</DialogTitle>
                  <DialogDescription className="text-neutral-400">Vendor details</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                  <InfoRow icon={User} label="Owner" value={v.owner} />
                  <InfoRow icon={Phone} label="Phone" value={v.phone} />
                  <InfoRow icon={MapPin} label="Address" value={v.address} />
                  <InfoRow icon={MapPin} label="City" value={v.city} />
                  <InfoRow icon={MapPin} label="State" value={v.state} />
                  <InfoRow icon={MapPin} label="Pincode" value={v.pin} />
                  <InfoRow icon={Star} label="Rating" value={v.rating.toFixed(1)} />
                  <InfoRow icon={ShoppingBag} label="Total Orders" value={String(v.totalOrders)} />
                  <InfoRow icon={XCircle} label="Cancelled" value={String(v.cancelledHotelDelay)} />
                  <InfoRow icon={IndianRupee} label="Revenue" value={`₹${v.totalRevenue.toLocaleString()}`} />
                  <InfoRow icon={TrendingUp} label="Commission" value={`${v.commission}%`} />
                  <div className="border-t border-white/5 pt-3">
                    <h3 className="text-sm font-semibold text-[#f97316] mb-2">Bank Details</h3>
                    <InfoRow icon={Banknote} label="Bank" value={v.bankName} />
                    <InfoRow icon={Banknote} label="Account" value={`${v.accType} - ${v.accNo}`} />
                    <InfoRow icon={Banknote} label="IFSC" value={v.ifsc} />
                    <InfoRow icon={Banknote} label="Branch" value={v.branch} />
                  </div>
                  <div className="border-t border-white/5 pt-3">
                    <h3 className="text-sm font-semibold text-[#f97316] mb-2">Status</h3>
                    <StatusBadge status={v.status} />
                  </div>
                </div>
                {v.status === 'pending' && (
                  <div className="flex gap-3 pt-4">
                    <button onClick={() => handleApprove(v.id, 'vendor')} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-2.5 text-sm font-semibold text-green-400 transition hover:bg-green-500/20 active:scale-95">
                      <CheckCircle2 className="size-4" /> Approve
                    </button>
                    <button onClick={() => handleReject(v.id, 'vendor')} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 active:scale-95">
                      <XCircle className="size-4" /> Reject
                    </button>
                  </div>
                )}
              </>
            )
          })()}
          {detailItem && detailType === 'rider' && (() => {
            const r = detailItem as Rider
            return (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl text-white">{r.name}</DialogTitle>
                  <DialogDescription className="text-neutral-400">Delivery partner details</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                  <InfoRow icon={Bike} label="Vehicle" value={r.vehicle} />
                  <InfoRow icon={Accessibility} label="Handicap" value={r.handicap} />
                  <InfoRow icon={MapPin} label="City" value={r.city} />
                  <InfoRow icon={MapPin} label="Pincode" value={r.pincode} />
                  <InfoRow icon={Star} label="Rating" value={r.rating.toFixed(1)} />
                  <InfoRow icon={Truck} label="Deliveries" value={String(r.totalDeliveries)} />
                  <InfoRow icon={XCircle} label="Cancelled" value={String(r.cancelledDelay)} />
                  <InfoRow icon={IndianRupee} label="Earnings" value={`₹${r.totalEarnings.toLocaleString()}`} />
                  <InfoRow icon={IndianRupee} label="Delivery Fee" value={`₹${r.deliveryFee}`} />
                  <div className="border-t border-white/5 pt-3">
                    <h3 className="text-sm font-semibold text-[#f97316] mb-2">Bank Details</h3>
                    <InfoRow icon={Banknote} label="Bank" value={r.bankName} />
                    <InfoRow icon={Banknote} label="Account" value={r.accNo} />
                    <InfoRow icon={Banknote} label="IFSC" value={r.ifsc} />
                    <InfoRow icon={Banknote} label="Branch" value={r.branch} />
                  </div>
                  <div className="border-t border-white/5 pt-3">
                    <h3 className="text-sm font-semibold text-[#f97316] mb-2">Status</h3>
                    <StatusBadge status={r.status} />
                  </div>
                </div>
                {r.status === 'pending' && (
                  <div className="flex gap-3 pt-4">
                    <button onClick={() => handleApprove(r.id, 'rider')} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-2.5 text-sm font-semibold text-green-400 transition hover:bg-green-500/20 active:scale-95">
                      <CheckCircle2 className="size-4" /> Approve
                    </button>
                    <button onClick={() => handleReject(r.id, 'rider')} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 active:scale-95">
                      <XCircle className="size-4" /> Reject
                    </button>
                  </div>
                )}
              </>
            )
          })()}
        </DialogContent>
      </Dialog>

      {/* ═══════════════════════════════════════════
         INVOICE MODAL
         ═══════════════════════════════════════════ */}
      <Dialog open={!!invoiceOrder} onOpenChange={() => setInvoiceOrder(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto bg-[#1a1a2e] border-white/10 text-white sm:max-w-md">
          {invoiceOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl text-white">Invoice</DialogTitle>
                <DialogDescription className="text-neutral-400">{invoiceOrder.id}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="text-center border-b border-white/5 pb-4">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Flame className="size-5 text-[#f97316]" />
                    <span className="text-lg font-bold text-white">StreetBite</span>
                  </div>
                  <p className="text-xs text-neutral-500">Tax Invoice</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><span className="text-neutral-500">Order No:</span> <span className="text-white font-medium">{invoiceOrder.id}</span></div>
                  <div><span className="text-neutral-500">Date:</span> <span className="text-white font-medium">{invoiceOrder.orderDate}</span></div>
                  <div><span className="text-neutral-500">Time:</span> <span className="text-white font-medium">{invoiceOrder.orderTime}</span></div>
                  <div><span className="text-neutral-500">Status:</span> <StatusBadge status={invoiceOrder.status} /></div>
                </div>
                <div className="border-t border-white/5 pt-3 text-xs">
                  <p className="text-neutral-500 mb-1">Customer</p>
                  <p className="text-white font-medium">{invoiceOrder.customer}</p>
                </div>
                <div className="border-t border-white/5 pt-3 text-xs">
                  <p className="text-neutral-500 mb-1">Vendor</p>
                  <p className="text-white font-medium">{invoiceOrder.vendor}</p>
                  <p className="text-neutral-400">Owner: {invoiceOrder.vendorOwner} | {invoiceOrder.vendorPhone}</p>
                </div>
                <div className="border-t border-white/5 pt-3 text-xs">
                  <p className="text-neutral-500 mb-1">Delivery Partner</p>
                  <p className="text-white font-medium">{invoiceOrder.rider} - {invoiceOrder.riderPhone}</p>
                </div>
                <div className="border-t border-white/5 pt-3 text-xs">
                  <p className="text-neutral-500 mb-2">Items</p>
                  <div className="flex flex-wrap gap-1">
                    {invoiceOrder.items.split(', ').map((item, idx) => {
                      const ft = invoiceOrder.itemsFoodType?.[idx] || getFoodType(item)
                      return (
                        <span key={idx} className="inline-flex items-center gap-1 text-white">
                          <VegNonVegBadge type={ft} />
                          {item}
                          {idx < invoiceOrder.items.split(', ').length - 1 && <span className="text-neutral-600">,</span>}
                        </span>
                      )
                    })}
                  </div>
                </div>
                <div className="border-t border-white/5 pt-3 text-xs space-y-1">
                  <div className="flex justify-between"><span className="text-neutral-500">Subtotal</span><span className="text-white">₹{invoiceOrder.amount - 35}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500">Delivery Fee</span><span className="text-white">₹30</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500">Platform Fee</span><span className="text-white">₹5</span></div>
                  <div className="flex justify-between pt-2 border-t border-white/10 font-bold"><span className="text-white">Total</span><span className="text-[#f97316]">₹{invoiceOrder.amount}</span></div>
                </div>
              </div>
              <DialogFooter className="pt-4">
                <button onClick={() => window.print()} className="flex items-center gap-2 rounded-xl bg-[#f97316] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ea6c0b] active:scale-95">
                  Print Invoice
                </button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

/* ── Info Row Helper ── */
function InfoRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <Icon className="size-3.5 text-neutral-500" />
      <span className="text-neutral-500 min-w-[80px]">{label}:</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  )
}
