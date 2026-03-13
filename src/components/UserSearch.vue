<script setup lang="ts">
import { ref, watch } from 'vue';
import { Search } from '@element-plus/icons-vue';

const props = defineProps<{ search: string }>();

const emit = defineEmits<{ (e: 'update:search', value: string): void }>();

const localSearch = ref(props.search);

watch(() => props.search, (val) => {
    localSearch.value = val;
});

const handleInput = (value: string) => {
    emit('update:search', value);
};
</script>

<template>
    <el-input 
        v-model="localSearch" 
        placeholder="Поиск по имени или email" 
        :prefix-icon="Search" 
        clearable
        @input="handleInput"
    />
</template>