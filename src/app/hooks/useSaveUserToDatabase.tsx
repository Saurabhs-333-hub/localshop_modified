import { Query, database } from '@/lib/AppwriteClient'
import { AppwriteException, ID } from 'appwrite';
import React from 'react'

const saveUsertoDatabase = async (userID: string, email: string, name: string, profileImage: string) => {
    try {
        const response = await database.createDocument(String(process.env.NEXT_PUBLIC_DATABASE_ID), String(process.env.NEXT_PUBLIC_COLLECTION_ID_USERS), ID.unique(), {
            userid: userID,
            username: name,
            email: email,
            profileImage: profileImage
        });
        // const document = response.documents;
        // return {
        //     id: document[0].$id,
        //     userid: document[0].userid,
        //     username: document[0].username,
        //     email: document[0].email,
        //     profileImage: document[0].profileImage
        // }

    } catch (error: AppwriteException | any) {
        console.error(error);
        throw new Error(error)

    }
}

export default saveUsertoDatabase