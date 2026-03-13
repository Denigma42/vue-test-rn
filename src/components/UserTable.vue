<script setup lang="ts">
import type { User } from '@/types/User';

defineProps<{
    filteredUsers: User[];
    loading: boolean;
    error: string | null;
}>();

const emit = defineEmits<{
    (e: 'select-user', user: User): void;
    (e: 'retry'): void;
}>();

const handleRowClick = (row: User) => {
    emit('select-user', row);
};
</script>

<template>
    <div>
        <!-- скелетон -->
        <el-skeleton :rows="5" animated v-if="loading" />

        <!-- если ошибка -->
        <el-alert v-else-if="error" :title="error" type="error" show-icon closable @close="$emit('retry')" />

        <el-table v-else :data="filteredUsers" stripe highlight-current-row @row-click="handleRowClick">
            <el-table-column prop="name" label="Имя" />
            <el-table-column prop="email" label="Email" />
            <el-table-column prop="phone" label="Телефон" />
            <el-table-column prop="company.name" label="Компания" />
        </el-table>
    </div>
</template>
