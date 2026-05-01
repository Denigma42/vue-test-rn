<script setup lang="ts">
import UserDetailsModal from '@/components/UserDetailsModal.vue'
import { provideUserDetailsModal } from '@/composables/useUserDetailsModal'

provideUserDetailsModal()
</script>

<template>
  <slot></slot>
  <UserDetailsModal />
</template>