'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { account, ID } from "@/lib/AppwriteClient";
import { useRouter } from "next/navigation";
import { User, UserContextTypes } from "@/types/types";
import getUserByUserID from "../hooks/useGetUserByUserID";
import saveUsertoDatabase from "../hooks/useSaveUserToDatabase";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const UserContext = createContext<UserContextTypes | null>(null);


const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const [googleResponse, setGoogleResponse] = useState<any>(null);
    useEffect(() => {
        checkUser();
    },);

    const useRegister = async (email: string, password: string, name: string) => {
        try {
            const promise = await account.create(ID.unique(), email, password, name);
            await account.createEmailSession(email, password);
            await saveUsertoDatabase(promise?.$id, email, name, String(process.env.NEXT_PUBLIC_PLACEHOLDER_DEAFULT_IMAGE_ID));
            await checkUser();
        } catch (err: any) {
            console.error(err);
            setError(err.message)
        }
    };
    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            // try {
            setGoogleResponse(codeResponse.access_token)
            if (googleResponse) {
                await axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleResponse}`, {
                        headers: {
                            Authorization: `Bearer ${googleResponse}`,
                            Accept: 'application/json'
                        }
                    }).then(async (response) => {
                        console.log(response.data)
                        const promise = await account.create(ID.unique(), response.data.email, response.data.email, response.data.name);
                        await account.createEmailSession(response.data.email, response.data.email,);
                        await saveUsertoDatabase(promise?.$id, response.data.email, response.data.name, String(process.env.NEXT_PUBLIC_PLACEHOLDER_DEAFULT_IMAGE_ID));
                        await checkUser();
                    }).
                    catch((err) => {
                        console.error(err);
                    })
            }
            // } catch (err) {
            //     console.error(err);
            // }
        },
        onError: (error) => console.log('Login Failed:', error)
    });
    const uselogin = async (email: string, password: string) => {
        try {
            await account.createEmailSession(email, password);
            await checkUser();
        } catch (err: any) {
            console.error(err);
            setError(err.message)
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession("current");
            googleLogout();
            setUser(null);
            // router.refresh();
            router.replace("/")
            router.refresh();

        } catch (err) {
            console.error(err);
        }
    };

    const checkUser = async () => {
        try {
            const currentSession = await account.getSession('current');
            if (!currentSession) return;
            const promise = await account.get();
            const user = await getUserByUserID(promise?.$id);
            const data = await account.get();

            setUser({ profileImage: user?.profileImage, email: user?.email, username: promise?.name, userid: promise?.$id } as User);
            router.replace("/home")
        } catch (err) {
            console.error(err);
            setUser(null);
        }
    };

    return (
        <UserContext.Provider value={{ user, useRegister, uselogin, logout, checkUser, error }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};