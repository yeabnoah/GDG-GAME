import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const response = await fetch('https://hethon.tech/gdg/randomPair', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching random pair:', error)
        return NextResponse.json({ error: 'Failed to fetch random pair' }, { status: 500 })
    }
}