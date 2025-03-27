<template>
    <h1 class="text-2xl font-semibold mb-4">Nueva Cuenta</h1>
    <form @submit.prevent="register">
        <!-- Username Input -->
        <div class="mb-4">
            <label for="name" class="block text-gray-600">Nombre</label>
            <input ref="fullnameInputRef" v-model="registerForm.fullName" type="text" id="name" name="name"
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off" />
        </div>

        <!-- Username Input -->
        <div class="mb-4">
            <label for="username" class="block text-gray-600">Email</label>
            <input ref="emailInputRef" v-model="registerForm.email" type="text" id="username" name="username"
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off" />
        </div>
        <!-- Password Input -->
        <div class="mb-4">
            <label for="password" class="block text-gray-600">Password</label>
            <input ref="passwordInputRef" v-model="registerForm.password" type="password" id="password" name="password"
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off" />
        </div>
        <!-- Remember Me Checkbox -->
        <div class="mb-4 flex items-center">
            <input v-model="registerForm.rememberMe" type="checkbox" id="remember" name="remember"
                class="text-blue-500" />
            <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
        </div>
        <!-- Forgot Password Link -->
        <div class="mb-6 text-blue-500">
            <a href="#" class="hover:underline">Forgot Password?</a>
        </div>
        <!-- Login Button -->
        <button type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
            Crear cuenta
        </button>
    </form>
    <!-- Sign up  Link -->
    <div class="mt-6 text-blue-500 text-center">
        <RouterLink :to="{ name: 'login' }" class="hover:underline">Ingresar por aqui</RouterLink>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue';
import { useAuthStore } from '../store/auth.store';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore()
const toast = useToast()

const registerForm = reactive({
    email: '',
    password: '',
    fullName: '',
    rememberMe: false
})

const emailInputRef = ref<HTMLInputElement | null>(null)
const passwordInputRef = ref<HTMLInputElement | null>(null)
const fullNameInputRef = ref<HTMLInputElement | null>(null)

const register = async () => {


    const { rememberMe: __, ...rest } = registerForm

    if (registerForm.email == '') {
        return emailInputRef.value?.focus()
    }

    if (registerForm.password.length < 6) {
        return passwordInputRef.value?.focus()
    }

    if (registerForm.fullName == '') {
        return fullNameInputRef.value?.focus()
    }

    if (registerForm.rememberMe) {
        localStorage.setItem('email', registerForm.email)
    } else {
        localStorage.removeItem('email')
    }

    //console.log(registerForm);

    const ok = await authStore.register(rest)


    console.log({ ok });


    if (ok) return

    toast.error('Error en registrarse')

};

watchEffect(() => {
    const email = localStorage.getItem('email')
    if (email) {
        registerForm.email = email
        registerForm.rememberMe = true
    }
})
</script>
