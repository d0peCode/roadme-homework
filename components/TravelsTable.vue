<script setup lang="ts">
import type { Travel } from '@/types/travel';
import { defineEmits } from '@vue/runtime-core';

const props = defineProps<{ travels: Travel[] }>()
const emit = defineEmits<{ 
  'travel-add': () => void
  'travel-remove': () => void
  'travel-edit': (travel: Travel) => void
}>()

const columns = [
  { key: 'picture', label: 'Picture' },
  { key: 'name', label: 'Name of the travel' },
  { key: 'description', label: 'Description', },
  { key: 'departureDate', label: 'Date of departure' },
  { key: 'returnDate', label: 'Date of return' },
  { key: 'price', label: 'Price per person' },
  { key: 'rating', label: 'Avg. rating' },
  { key: 'actions' }
]
const query = ref('')
const isTableLoading = ref(false)

const addTravel = () => {
  emit('travel-add')
}

const editTravel = (travel: Travel) => {
  emit('travel-edit', travel)
}

const removeTravel = async (id: number) => {
  try {
    await $fetch('/api/travel', {
      method: "DELETE",
      body: { id }
    })
    emit('remove-travel')
  } catch (err) {
    alert(`Error adding new travel ${err}`)
  }
}

const actions = (row: Travel) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => editTravel(row)
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => removeTravel(row.id)
  }]
]

const filteredRows = computed(() => {
  if (!query.value) {
    return props.travels
  }

  return props.travels.filter((item: Travel) => {
    return Object.values(item).some((value) => {
      return String(value).toLowerCase().includes(query.value.toLowerCase())
    })
  })
})
</script>
<template>
  <div class="flex justify-between px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
    <UInput v-model="query" placeholder="Filter travel..." />
    <UButton @click="addTravel">Add new travel</UButton>
  </div>

  <UTable
      :rows="filteredRows"
      :columns="columns"
      :loading="isTableLoading"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
      :progress="{ color: 'primary', animation: 'carousel' }"
  >
    <template #picture-data="{ row }">
      {{ row.picture }}
    </template>
    <template #name-data="{ row }">
      <p class="text-wrap">
        {{ row.name }}
      </p>
    </template>
    <template #description-data="{ row }">
      <p class="text-wrap">
        {{ row.description }}
      </p>
    </template>
    <template #rating-data="{ row }">
      <p class="text-wrap">
        {{ row.rating / 10 }} / 10
      </p>
    </template>
    <template #actions-data="{ row }">
      <UDropdown :items="actions(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
</template>
