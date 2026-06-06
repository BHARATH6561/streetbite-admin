import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept, Origin',
    'Access-Control-Max-Age': '86400',
  }
}

export function corsResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: corsHeaders() })
}

export function corsError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status, headers: corsHeaders() })
}
