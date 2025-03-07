import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { LoginPayload } from "../types/login.type";
import { auth } from "../firebase/firebase.config";

type AuthContextType = {
    currentUser: any;
    loading: boolean,
    registerUser: (payload: LoginPayload) => Promise<void>;
    login: (payload: LoginPayload) => Promise<void>;
    logout: () => void;
    signInWithGoogle: () => Promise<void>;
};

const defaultAuthContext: AuthContextType = {
    currentUser: null,
    loading: false,
    registerUser: async () => {
        console.warn("Register user");
    },
    login: async () => {
        console.warn("login() chưa được cung cấp!");
    },
    logout: () => {
        console.warn("logout() chưa được cung cấp!");
    },
    signInWithGoogle: async () => {
        console.warn("signInWithGoogle() chưa được cung cấp!");
    }
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => {
    return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();

type AuthProviderProps = {
    children: ReactNode;
}

// authProvider
const AuthProvider = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);


    // register a user
    const registerUser = async (payload: LoginPayload): Promise<void> => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
            setCurrentUser(userCredential.user);
            console.log("Đăng ký thành công:", userCredential.user);
        } catch (error) {
            console.error("Lỗi khi đăng ký:", error);
            throw error;
        }
    }

    // login user
    const loginUser = async (payload: LoginPayload): Promise<void> => {
        try {
            await signInWithEmailAndPassword(auth, payload.email, payload.password);
        } catch (error) {
            console.error("Lỗi khi đăng nhập:", error);
            throw error;
        }
    }

    // sign up with google
    const signInWithGoogle = async (): Promise<void> => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Lỗi khi đăng nhập với google:", error);
            throw error;
        }
    }

    // logout the user
    const logout = () => {
        return signOut(auth)
    }

    // manage user
    useEffect(() => {
        const unSubcribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unSubcribe();
    }, [])

    const val: AuthContextType = {
        currentUser: currentUser, // Bạn có thể thay đổi logic tại đây
        loading,
        registerUser,
        login: loginUser,
        logout: logout,
        signInWithGoogle
    }

    return (
        <AuthContext.Provider value={val}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider