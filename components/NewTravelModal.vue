<script setup lang="ts">
const isModalOpen = defineModel()

const emit = defineEmits<{ 'submit': void }>()

function newTravelAdded () {
  console.log('newTravelAdded')
  isModalOpen.value = false
  emit('submit')  
}
</script>

<template>
  <UModal v-model="isModalOpen" class="relative">
    <div class="absolute top-2 right-1">
      <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isModalOpen = false" />
    </div>

    <div class="p-4">
      <NewTravelForm @submit="newTravelAdded" />
    </div>
  </UModal>
</template>

