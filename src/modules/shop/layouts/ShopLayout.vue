<template>

    <!-- component -->
    <TopMenu />

    <body class="bg-white">

        <RouterView></RouterView>

        <CustomFooter />

    </body>
</template>

<script setup lang="ts">
import CustomFooter from '../components/CustomFooter.vue';
import TopMenu from '../components/TopMenu.vue'
</script>
