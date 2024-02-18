'use client'
import React from 'react'
import { useUser } from '../context/user'

const Home = () => {
    const user = useUser()

    const handleLogout = async () => {
        await user.logout()
    }
    return (
        <div>      <button className="bg-cyan-200 p-2 rounded-lg text-black" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home