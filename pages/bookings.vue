<script setup lang="ts">
import type { Booking } from "@/types/booking";

const { data, refresh } = await useFetch<Booking[]>("/api/booking");

const isAddBookingModalOpen = ref(false);
const isEditBookingModalOpen = ref(false);
const editBookingData = ref<Booking>();

const editBooking = (booking: Booking) => {
  editBookingData.value = booking;
  isEditBookingModalOpen.value = true;
};
</script>

<template>
  <div>
    <NewBookingModal v-model="isAddBookingModalOpen" @booking-add="refresh" />
    <EditBookingModal
        v-if="editBookingData"
        v-model="isEditBookingModalOpen"
        :booking="editBookingData"
        @booking-edit="refresh"
    />
    <BookingsTable
        :bookings="data"
        @booking-remove="refresh"
        @booking-edit="editBooking"
        @booking-add="isAddBookingModalOpen = true"
    />
  </div>
</template>
