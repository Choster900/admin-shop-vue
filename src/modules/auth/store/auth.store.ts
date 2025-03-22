import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '../interfaces'
import { AuthStatus } from '../enum/auth-status.enum'
import { loginAction } from '../actions'
import { useLocalStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {

    const user = ref<User | undefined>()
    const authStatus = ref<AuthStatus>(AuthStatus.Checking)
    const token = ref(useLocalStorage('token', ''))


    const login = async (email: string, password: string) => {
        try {
            const loginResp = await loginAction(email, password);
            if (!loginResp.ok) {
                logout()
                return false
            }
            console.log(loginResp);

            user.value = loginResp.user
            token.value = loginResp.token
            authStatus.value = AuthStatus.Authenticated

            return true
        } catch (error) {
            console.log(error);
            return logout()

        }
    }

    const logout = () => {
        authStatus.value = AuthStatus.Unauthenticated
        user.value = undefined
        token.value = ''
        return false
    }

    return {
        user,
        token,
        authStatus,


        //Getters
        isChecking: computed(() => authStatus.value === AuthStatus.Checking),
        isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),


        // TODO: Getters para saber si es admin o no


        userName: computed(() => user.value?.fullName),

        login
    }
})
