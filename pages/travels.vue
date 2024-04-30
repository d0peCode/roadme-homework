<script setup lang="ts">
import type { Travel } from "@/types/travel";

const { data, refresh } = await useFetch<Travel[]>("/api/travel");

const isAddTravelModalOpen = ref(false);
const isEditTravelModalOpen = ref(false);
const editTravelData = ref<Travel>();

const editTravel = (travel: Travel) => {
  editTravelData.value = travel;
  isEditTravelModalOpen.value = true;
};
</script>

<template>
  <div>
    <NewTravelModal v-model="isAddTravelModalOpen" @travel-add="refresh" />
    <EditTravelModal
      v-if="editTravelData"
      v-model="isEditTravelModalOpen"
      :travel="editTravelData"
      @travel-edit="refresh"
    />
    <TravelsTable
      :travels="data"
      @travel-remove="refresh"
      @travel-edit="editTravel"
      @travel-add="isAddTravelModalOpen = true"
    />
  </div>
</template>
