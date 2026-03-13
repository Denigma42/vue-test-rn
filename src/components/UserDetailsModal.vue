<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { User } from '@/types/User';

const props = defineProps<{ user: User | null }>();

const visible = ref(false);

const modalField = computed(() => {
    if (!props.user) return [];
    return [
        { label: "Имя", text: props.user.name },
        { label: "Username", text: props.user.username },
        { label: "Email", text: props.user.email },
        { label: "Телефон", text: props.user.phone },
        { label: "Веб-сайт", text: props.user.website },
        { label: "Адрес", text: `${props.user.address.city}, ${props.user.address.street}` },
        { label: "Компания", text: `${props.user.company.name} — ${props.user.company.catchPhrase}` }
    ];
});

watch(() => props.user, (val) => {
    visible.value = !!val;
});

</script>

<template>
    <el-dialog v-model="visible" title="Детали пользователя" width="500px" destroy-on-close>
        <el-descriptions v-if="user" :column="1" border>
            <el-descriptions-item v-for="field in modalField" :key="field.label" :label="field.label">
                {{ field.text }}
            </el-descriptions-item>
        </el-descriptions>
    </el-dialog>
</template>
