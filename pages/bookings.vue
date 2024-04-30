<script setup lang="ts">
const {
  data: { value: travels },
} = await useFetch("/api/travel");
console.log("data", travels);

await $fetch("/api/travel", {
  method: "POST",
  body: {
    aaa: "bbb",
  },
});
const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name of the travel",
  },
  {
    key: "departureDate",
    label: "Date of departure",
  },
  {
    key: "returnDate",
    label: "Date of return",
  },
  {
    key: "role",
    label: "Picture",
  },
  { key: "actions" },
];

const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
    },
  ],
];

const people = [
  {
    id: 1,
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    id: 2,
    name: "Courtney Henry",
    title: "Designer",
    email: "courtney.henry@example.com",
    role: "Admin",
  },
  {
    id: 3,
    name: "Tom Cook",
    title: "Director of Product",
    email: "tom.cook@example.com",
    role: "Member",
  },
  {
    id: 4,
    name: "Whitney Francis",
    title: "Copywriter",
    email: "whitney.francis@example.com",
    role: "Admin",
  },
  {
    id: 5,
    name: "Leonard Krasner",
    title: "Senior Designer",
    email: "leonard.krasner@example.com",
    role: "Owner",
  },
  {
    id: 6,
    name: "Floyd Miles",
    title: "Principal Designer",
    email: "floyd.miles@example.com",
    role: "Member",
  },
];

const q = ref("");

const isAddTravelModalOpen = ref(false);

const filteredRows = computed(() => {
  if (!q.value) {
    return people;
  }

  return people.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});
</script>

<template>
  <div>
    <NewTravelModal :modal-open="isAddTravelModalOpen" />
    <div
      class="flex justify-between px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
    >
      <UInput v-model="q" placeholder="Filter people..." />
      <UButton @click="isAddTravelModalOpen = true">Add new booking</UButton>
    </div>

    <UTable
      :rows="filteredRows"
      :columns="columns"
      loading
      :loading-state="{
        icon: 'i-heroicons-arrow-path-20-solid',
        label: 'Loading...',
      }"
      :progress="{ color: 'primary', animation: 'carousel' }"
    >
      <template #picture-data="{ row }">
        {{ row }}
      </template>
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
    </UTable>
  </div>
</template>
