<script setup lang="ts">
import UserDetailsModal from "./components/UserDetailsModal.vue";
import MainLayout from "./layout/MainLayout.vue";
import MainView from "./views/MainView.vue";

</script>

<template>
  <MainLayout>
    <MainView />
  </MainLayout>

  <!-- открытие модалки сделал глобально для масштабируемости, вдруг нужно будет еще откуда-то открывать ее -->
  <UserDetailsModal />
</template>
