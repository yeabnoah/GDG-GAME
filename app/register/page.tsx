"use client"
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

type Props = {}

const RegisterPage = (props: Props) => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleGithubSignIn = async () => {
        const response = await signIn("github")
        console.log(response)
    }

    const handleGoogleSignIn = async () => {
        const response = await signIn("google")
        console.log(response)
    }

    const registerUser = async () => {
        const response = await axios.post("/api", {
            name: fullName,
            email,
            password
        })

        return response
    }

    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            console.log('User registered:', data);
        },
        onError: (error) => {
            console.error('Error registering user:', error);
        }
    })


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        mutate();
    }

    return (
        <div className=' flex flex-row justify-center items-center min-h-screen'>
            <div>
                <h1 className=' text-xl'>
                    Register
                </h1>
                <form onSubmit={handleSubmit} className=' bg-white/5 p-5 my-5 rounded-md'>
                    <div className=' flex flex-row gap-5 py-3 items-center justify-between'>
                        <label className=' text-base'>Full Name</label>
                        <input
                            type='text'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder='John Doe'
                            className=' bg-transparent border-white border outline-none focus:outline-none px-5 py-2 '
                        />
                    </div>

                    <div className=' flex flex-row gap-5 py-3 items-center justify-between'>
                        <label className=' text-base'>Email</label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='example@example.com'
                            className=' bg-transparent border-white border outline-none focus:outline-none px-5 py-2 '
                        />
                    </div>

                    <div className=' flex flex-row gap-5 py-3 items-center justify-between'>
                        <label className=' text-base'>Password</label>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='*******'
                            className=' bg-transparent border-white border outline-none focus:outline-none px-5 py-2 '
                        />
                    </div>

                    <button disabled={isPending} type='submit' className=' bg-slate-500 px-5 py-2 font-bold text-black w-full justify-center items-center'>
                        {isPending ? "Loading ..." : "Register"}
                    </button>
                </form>

                <div className=' flex gap-5'>
                    <button disabled={isPending} onClick={handleGoogleSignIn} className=' bg-white px-5 py-2 text-black'>sign in with google</button>
                    <button disabled={isPending} onClick={handleGithubSignIn} className=' bg-gray-700 px-5 py-2 text-white'>sign in with github</button>
                </div>
                <div className=' flex justify-center gap-5'>
                    <Link href="/login" className=' text-yellow-500 mt-5'>Sign In</Link>
                    <Link href="/dashboard" className=' text-blue-500 mt-5'>Go to Dashboard</Link>

                </div>
            </div>
        </div>
    )
}

export default RegisterPage
