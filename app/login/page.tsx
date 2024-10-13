"use client"
import { signIn } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {}

const LoginPage = (props: Props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleGithubSignIn = async () => {
        const response = await signIn("github")
        console.log(response)
    }

    const handleGoogleSignIn = async () => {
        const response = await signIn("google")
        console.log(response)
    }

    const handleCredential = async () => {
        const response = await signIn("credentials", {
            email,
            password,
            redirect: false
        })

        if (response?.error) {
            console.error("Sign in error:", response.error)
        } else {
            router.replace('/dashboard')
        }
    }

    return (
        <div className=' flex flex-row justify-center items-center min-h-screen'>
            <div>
                <h1 className=' text-xl'>
                    SignIn
                </h1>
                <div className=' bg-white/5 p-5 my-5 rounded-md'>
                    <div className=' flex flex-row gap-5 py-3 items-center justify-between'>
                        <label className=' text-base'>Email</label>
                        <input
                            placeholder='example@example.com'
                            className=' bg-transparent border-white border outline-none focus:outline-none px-5 py-2 '
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className=' flex flex-row gap-5 py-3 items-center justify-between'>
                        <label className=' text-base'>Password</label>
                        <input
                            type='password'
                            placeholder='*******'
                            className=' bg-transparent border-white border outline-none focus:outline-none px-5 py-2 '
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleCredential}
                        className=' bg-slate-500 px-5 py-2 font-bold text-black w-full justify-center items-center'
                        disabled={!email || !password}
                    >
                        Login
                    </button>
                </div>

                <div className=' flex gap-5'>
                    <button onClick={handleGoogleSignIn} className=' bg-white px-5 py-2 text-black'>sign in with google</button>
                    <button onClick={handleGithubSignIn} className=' bg-gray-700 px-5 py-2 text-white'>sign in with github</button>
                </div>
                <div className=' flex justify-center gap-5'>
                    <Link href="/register" className=' text-green-400 mt-5'>Register</Link>
                    <Link href="/dashboard" className=' text-blue-500 mt-5'>Go to Dashboard</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
