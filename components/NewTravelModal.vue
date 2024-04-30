<script setup lang="ts">
const isModalOpen = defineModel<boolean>()

const emit = defineEmits<{ 'travel-add': () => void }>()

function newTravelAdded () {
  isModalOpen.value = false
  emit('travel-add')  
}
</script>

<template>
  <UModal v-model="isModalOpen" class="relative">
    <div class="absolute top-2 right-1">
      <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isModalOpen = false" />
    </div>

    <div class="p-4">
      <NewTravelForm @travel-add="newTravelAdded" />
    </div>
  </UModal>
</template>

