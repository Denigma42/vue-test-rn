<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useGetAllUsers } from '@/hooks/useGetAllUsers';
import type { User } from '@/types/User';
import UserSearch from '@/components/UserSearch.vue';
import CompanyFilter from '@/components/CompanyFilter.vue';
import UserTable from '@/components/UserTable.vue';
import UserDetailsModal from '@/components/UserDetailsModal.vue';

const { getAllUsers, users, isLoading, error } = useGetAllUsers();

const searchQuery = ref('');
const selectedCompany = ref<string | null>(null);
const selectedUser = ref<User | null>(null);

const uniqueCompanies = computed(() => {
    const companies = users.value.map(u => u.company.name);
    return [...new Set(companies)].sort();
});

// Фильтрация пользователей
const filteredUsers = computed(() => {
    let result = users.value;

    if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(
            user => user.name.toLowerCase().includes(query) || 
            user.email.toLowerCase().includes(query)
        );
    }

    if (selectedCompany.value) {
        result = result.filter(user => user.company.name === selectedCompany.value);
    }

    return result;
});

const openDetails = (user: User) => {
    selectedUser.value = user;
};

onMounted(() => {
    getAllUsers();
});
</script>

<template>
    <div class="space-y-4">
        <h1 class="text-2xl text-center mb-10">Список пользователей</h1>

        <div class="w-full flex gap-4 ">
            <UserSearch v-model:search="searchQuery" class="flex-3" />
            <CompanyFilter v-model="selectedCompany" :companies="uniqueCompanies" class="flex-1"/>
        </div>

        <UserTable :filtered-users="filteredUsers" :loading="isLoading" :error="error" @select-user="openDetails" />

        <UserDetailsModal :user="selectedUser" @close="selectedUser = null" />
    </div>
</template>