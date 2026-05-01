<script setup lang="ts">
import MainLayout from "./layout/MainLayout.vue";
import MainView from "./views/MainView.vue";
import UserDetailsModalContext from "./context/UserDetailsModalContext.vue";
</script>

<template>
  <MainLayout>
    <UserDetailsModalContext>
        <MainView />
    </UserDetailsModalContext>
  </MainLayout>
</template>
