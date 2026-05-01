import type { InjectionKey, Ref } from 'vue'
import { inject, provide, ref } from 'vue'
import type { User } from '@/types/User'

export type UserDetailsModalApi = {
  isOpen: Ref<boolean>
  selectedUser: Ref<User | null>
  openModal: (user: User) => void
  closeModal: () => void
}

export const UserDetailsModalKey: InjectionKey<UserDetailsModalApi> = Symbol('UserDetailsModal')

export function provideUserDetailsModal(): UserDetailsModalApi {
  const isOpen = ref(false)
  const selectedUser = ref<User | null>(null)

  function openModal(user: User) {
    selectedUser.value = user
    isOpen.value = true
  }

  function closeModal() {
    selectedUser.value = null
    isOpen.value = false
  }

  const api: UserDetailsModalApi = { isOpen, selectedUser, openModal, closeModal }
  provide(UserDetailsModalKey, api)
  return api
}

export function useUserDetailsModal(): UserDetailsModalApi {
  const api = inject(UserDetailsModalKey, null)
  if (!api) {
    throw new Error('UserDetailsModalContext: провайдер не найден. Оберните дерево в <UserDetailsModalContext>.')
  }
  return api
}