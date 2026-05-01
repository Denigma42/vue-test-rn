<script setup lang="ts">
import { computed } from 'vue';
import { useUserDetailsModal } from '@/composables/useUserDetailsModal';

const modal = useUserDetailsModal();
const { isOpen, selectedUser } = modal;

const visible = computed({
    get: () => isOpen.value,
    set: (value) => {
        if (!value) modal.closeModal();
    }
});

const modalField = computed(() => {
    const user = selectedUser.value;
    if (!user) return [];
    return [
        { label: "Name", text: user.name },
        { label: "Username", text: user.username },
        { label: "Email", text: user.email },
        { label: "Phone", text: user.phone },
        { label: "Website", text: user.website },
        { label: "Address", text: `${user.address.city}, ${user.address.street}` },
        { label: "Company", text: `${user.company.name} — ${user.company.catchPhrase}` }
    ];
});
</script>

<template>
    <Teleport to="body">
        <el-dialog v-model="visible" title="Детали пользователя" width="500px" destroy-on-close>
            <el-descriptions v-if="selectedUser" :column="1" border>
                <el-descriptions-item v-for="field in modalField" :key="field.label" :label="field.label">
                    {{ field.text }}
                </el-descriptions-item>
            </el-descriptions>
        </el-dialog>
    </Teleport>
</template>