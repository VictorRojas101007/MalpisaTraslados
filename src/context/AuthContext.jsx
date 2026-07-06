import { useState, createContext, useEffect } from "react"
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

 // eslint-disable-next-line react-refresh/only-export-components
 export const AuthContext = createContext()

export function AuthProvider ({children}){

    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async (user)=>{
            if (user) {
                const snap = await getDoc(doc(db, "usuarios", user.uid));
                setUsuario({uid: user.uid, email: user.email, ...snap.data()});
            }else {
                setUsuario(null)
            }
               setCargando(false)
        });
     return ()=> unsubscribe();
    },[]);

    return (
        <AuthContext.Provider value={{usuario, cargando}}>
            {children}
        </AuthContext.Provider>
    );
}
