import { Client, Account, Databases, Query, Storage, ID } from "appwrite";

const client = new Client().setEndpoint(String(process.env.NEXT_PUBLIC_APPWRITE_URL)).setProject(`${process.env.NEXT_PUBLIC_PROJECT_ID}`);
const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { client, account, database, storage, Query, ID };


