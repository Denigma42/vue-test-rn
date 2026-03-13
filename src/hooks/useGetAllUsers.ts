import Axios from "@/services/apiClient";
import type { User } from "@/types/User";
import { ref } from "vue";

export const useGetAllUsers = () => {
    const isLoading = ref(true);
    const users = ref<User[]>([]);
    const error = ref<string | null>(null);

    const getAllUsers = async () => {
        try {
            const { data } = await Axios.get('/');
            users.value = data;
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Unknown error';
        } finally {
            isLoading.value = false;
        }
    }

    return {
        getAllUsers,
        users,
        isLoading,
        error,
    };
}