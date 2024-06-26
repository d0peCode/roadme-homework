<script setup lang="ts">
import type { Booking } from "@/types/booking";

const props = defineProps<{ bookings: Booking[] }>();
const emit = defineEmits<{
  "booking-add": () => void;
  "booking-remove": () => void;
}>();

const columns = [
  { key: "id", label: "Booking ID" },
  { key: "travelName", label: "Travel name" },
  { key: "customerName", label: "Customer name" },
  { key: "customerEmail", label: "Customer email" },
  { key: "customerPhone", label: "Customer phone" },
  { key: "customerAge", label: "Customer age" },
  { key: "customerGender", label: "Customer gender" },
  { key: "paymentType", label: "Payment type" },
  { key: "notes", label: "Internal notes" },
  { key: "actions" },
];
const query = ref("");
const isTableLoading = ref(false);

const addBooking = () => {
  emit("booking-add");
};

const removeBooking = async (id: number) => {
  try {
    await $fetch("/api/booking", {
      method: "DELETE",
      body: { id },
    });
    emit("booking-remove");
  } catch (err) {
    alert(`Error adding new booking ${err}`);
  }
};

const filteredRows = computed(() => {
  if (!query.value) {
    return props.bookings;
  }

  return props.bookings.filter((item: Booking) => {
    return Object.values(item).some((value) => {
      return String(value).toLowerCase().includes(query.value.toLowerCase());
    });
  });
});
</script>
<template>
  <div
    class="flex justify-between px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
  >
    <UInput v-model="query" placeholder="Filter booking..." />
    <UButton @click="addBooking">Add new booking</UButton>
  </div>

  <UTable
    :rows="filteredRows"
    :columns="columns"
    :loading="isTableLoading"
    :loading-state="{
      icon: 'i-heroicons-arrow-path-20-solid',
      label: 'Loading...',
    }"
    :progress="{ color: 'primary', animation: 'carousel' }"
  >
    <template #travelName-data="{ row }">
      {{ row.travelName.name }}
    </template>
    <template #actions-data="{ row }">
      <UButton
        color="gray"
        variant="ghost"
        icon="i-heroicons-trash-20-solid"
        @click="removeBooking(row.id)"
      />
    </template>
  </UTable>
</template>
