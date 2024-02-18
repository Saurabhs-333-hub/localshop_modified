'use client'
import Image from "next/image";
import { useUser } from "./context/user";
import { useState } from "react";
import { ContainerScroll } from "@/lib/components/ui/register";

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const user = useUser()
  const handleSignUp = async () => {
    await user.useRegister(email, password, name)
  }
  const handleLogout = async () => {
    await user.logout()
  }
  const handleSignIn = async () => {
    await user.uselogin(email, password)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">


    </main>
  );
}
