import { tesloApi } from "@/api/tesloapi"
import type { AuthResponse } from "../interfaces"
import { isAxiosError } from "axios"

interface RequiredData {
    fullName: string
    email: string
    password: string
}


export const actionRegister = async (requiredData: RequiredData) => {
    try {

        //const { email, password, fullName } = requiredData

        const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
            email: requiredData.email,
            password: requiredData.password,
            fullName: requiredData.fullName
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
