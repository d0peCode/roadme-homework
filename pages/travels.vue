<script setup lang="ts">
import type { Travel } from '@/types/travel';

const { data, refresh } = await useFetch<Travel[]>('/api/travel')

const columns = [{
  key: 'pictureUrl',
  label: 'Picture'
}, {
  key: 'name',
  label: 'Name of the travel'
}, {
  key: 'description',
  label: 'Description',
}, {
  key: 'departureDate',
  label: 'Date of departure'
}, {
  key: 'returnDate',
  label: 'Date of return'
}, 
  { key: 'actions' }
]

const removeTravel = async (id: number) => {
  try {
    await $fetch('/api/travel', {
      method: "DELETE",
      body: { id }
    })
    refresh()
  } catch (err) {
    alert(`Error adding new travel ${err}`)
  }
}

const actions = (row: { id: number }) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id)
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => removeTravel(row.id)
  }]
]

const query = ref('')

const isAddTravelModalOpen = ref(false)
const isTableLoading = ref(false)

const filteredRows = computed(() => {
  if (!query.value) {
    return data.value
  }

  return data.value.filter((item: Travel) => {
    return Object.values(item).some((value) => {
      return String(value).toLowerCase().includes(query.value.toLowerCase())
    })
  })
})
</script>

<template>
  <div>
    <NewTravelModal v-model="isAddTravelModalOpen" @submit="refresh" />
    <div class="flex justify-between px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="query" placeholder="Filter travel..." />
      <UButton @click="isAddTravelModalOpen = true">Add new travel</UButton>
    </div>
    
    <UTable
        :rows="filteredRows" 
        :columns="columns" 
        :loading="isTableLoading"
        :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
        :progress="{ color: 'primary', animation: 'carousel' }" 
    >
      <template #picture-data="{ row }">
        {{ row }}
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
      <template #actions-data="{ row }">
        <UDropdown :items="actions(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </div>
</template>

