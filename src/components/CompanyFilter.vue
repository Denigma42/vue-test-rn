<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ modelValue: string | null; companies: string[] }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: string | null): void }>();

const localCompany = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
    localCompany.value = val;
});

const handleChange = (value: string | null) => {
    emit('update:modelValue', value);
};
</script>

<template>
    <el-select v-model="localCompany" placeholder="Все компании" clearable @change="handleChange">
        <el-option v-for="company in companies" :key="company" :label="company" :value="company" />
    </el-select>
</template>
