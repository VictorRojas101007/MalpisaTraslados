import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut ,} from "firebase/auth";

export const registrarUsuario = async ({email, password, nombre, tiendaId}) => {
    const credenciales = await createUserWithEmailAndPassword(auth, email, password);
    const uid = credenciales.user.uid
    await setDoc(doc(db, "usuarios", uid),{
        nombre,
        tiendaId,
        email,
        rol: "empleado"
    });
    return uid;
};

export const iniciarSesion = async ({email, password}) => {
    const credenciales = await signInWithEmailAndPassword(auth, email, password)
    return credenciales.user;
};

export const cerrarSesion = () => signOut(auth);