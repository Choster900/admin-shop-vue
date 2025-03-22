<template>
    <div class="flex justify-center py-10 bg-gray-100 space-x-3">
        <button :disabled="page === 1" @click="$router.push({ query: { page: page - 1 } })"
            class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-blue-300 hover:bg-blue-600">
            <ArrowLeftIcon />
            <span class="">Anteriores</span>
        </button>
        <button :disabled="hasMoreData" @click="$router.push({ query: { page: page + 1 } })"
            class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-blue-300 hover:bg-blue-600">
            <span class="">Siguietes</span>
            <ArrowRigthIcon class="" />
        </button>
    </div>
</template>

<script setup lang="ts">
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue';
import ArrowRigthIcon from '@/icons/ArrowRigthIcon.vue';

interface Props {
    page: number;
    hasMoreData: boolean
}
defineProps<Props>()
</script>

<style scoped></style>
