<script setup lang="ts">
import { useUserDetailsModal } from '@/composables/useUserDetailsModal';
import type { User } from '@/types/User';

defineProps<{
    filteredUsers: User[];
    loading: boolean;
    error: string | null;
}>();

const { openModal } = useUserDetailsModal();

const handleRowClick = (row: User) => {
    openModal(row); 
};
</script>

<template>
    <div>
        <!-- скелетон при загрузке -->
        <el-skeleton :rows="5" animated v-if="loading" />

        <!-- если ошибка -->
        <el-alert v-else-if="error" :title="error" type="error" show-icon closable />

        <el-table v-else :data="filteredUsers" stripe highlight-current-row @row-click="handleRowClick">
            <el-table-column prop="name" label="Имя" />
            <el-table-column prop="email" label="Email" />
            <el-table-column prop="phone" label="Телефон" />
            <el-table-column prop="company.name" label="Компания" />
        </el-table>
    </div>
</template>
