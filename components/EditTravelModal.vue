<script setup lang="ts">
import type { Travel } from '@/types/travel';

const isModalOpen = defineModel()

const props = defineProps<{ 'travel': Travel }>()
const emit = defineEmits<{ 'travel-edit': () => void }>()

function travelEdited () {
  isModalOpen.value = false
  emit('travel-edit')
}
</script>

<template>
  <UModal v-model="isModalOpen" class="relative">
    <div class="absolute top-2 right-1">
      <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isModalOpen = false" />
    </div>

    <div class="p-4">
      <EditTravelForm :travel="travel" @travel-add="travelEdited" />
    </div>
  </UModal>
</template>

