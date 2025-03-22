import { tesloApi } from "@/api/tesloapi"
import type { AuthResponse, User } from "../interfaces"
import { isAxiosError } from "axios"

interface LoginError {
    ok: false,
    message: string
}

interface LoginSuccess {
    ok: true,
    user: User,
    token: string
}

export const LoginAction = async (email: string, password: string): Promise<LoginError | LoginSuccess> => {
    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
            email,
            password
        })

        return {
            ok: true,
            user: data.user,
            token: data.token
        }

    } catch (error) {

        if (isAxiosError(error) && error.response?.status === 401) {

            return {
                ok: false,
                message: 'Usuario o contraseña no encontrado'
            }
        }

        console.log(error);
        throw new Error('no se pudo realizar la peticion')
    }
}
