<script setup lang="ts">
import type { Booking } from "@/types/booking";
import type { Travel } from '@/types/travel';

const { data, refresh } = await useFetch<Booking[]>("/api/booking");
const { data: travels } = await useFetch<Travel[]>("/api/travel");

const isAddBookingModalOpen = ref(false);
</script>

<template>
  <div>
    <NewBookingModal 
      v-model="isAddBookingModalOpen" 
      :travels="travels" 
      @booking-add="refresh"
    />
    <BookingsTable
      :bookings="data"
      @booking-remove="refresh"
      @booking-add="isAddBookingModalOpen = true"
    />
  </div>
</template>
