// открытие модалки сделал глобально для масштабируемости, вдруг нужно будет еще откуда-то открывать ее

import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/User';

export const useUserModalStore = defineStore('userModal', () => {
    const isOpen = ref(false)
    const selectedUser = ref<User | null>(null);

    function openModal(user: User) {
        selectedUser.value = user;
        isOpen.value = true
    }

    function closeModal() {
        selectedUser.value = null;
        isOpen.value = false
    }

    return { isOpen, selectedUser, openModal, closeModal }
})