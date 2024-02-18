export interface UserContextTypes {
    user: User | null;
    useRegister: (email: string, password: string, name: string) => Promise<void>;
    uselogin: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkUser: () => Promise<void>;
    error: string;
}

export interface User {
    userid: string;
    username: string;
    email: string;
    profileImage: string;
    // registration: number;
    // status: number;
    // roles: string[];
    // prefs: {
    //     theme: string;
    // }
}