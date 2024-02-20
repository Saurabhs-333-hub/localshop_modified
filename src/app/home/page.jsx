'use client'
import React from 'react'
import { useUser } from '../context/user'

const Home = () => {
    const user = useUser()

    const handleLogout = async () => {
        await user.logout()
    }
    return (
        <div>
        </div>
    )
}

export default Home