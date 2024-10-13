"use client"

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useEffect } from 'react'

const Dashboard = () => {
    const session = useSession()
    const router = useRouter()

    const handleLogout = async () => {
        await signOut()
    }

    useEffect(() => {
        if (session.status === "unauthenticated") {
            router.replace("/login")
        }
    }, [session.status, router])

    if (session.status === "loading") {
        return (
            <div className=' text-white text-3xl flex flex-row min-h-screen justify-center items-center'>
                <h1 className=' text-white text-3xl'>
                    loading ....
                </h1>
            </div>
        )
    }

    return (
        session.status === "authenticated" && (
            <div className=' flex flex-row items-center justify-center min-h-screen'>
                <div className=' text-white flex flex-col'>
                    <h1 className=' text-white'>Dashboard</h1>
                    {session.data?.user?.id}
                    <button className=' bg-white text-black' onClick={handleLogout}>Log out</button>
                </div>
            </div>
        )
    )
}

export default Dashboard
