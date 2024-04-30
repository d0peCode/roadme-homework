<script setup lang="ts">
const props = defineProps<{ modalOpen: boolean }>();
const isModalOpen = ref(false);

const items = [
  {
    label: "Tab1",
    content: "This is the content shown for Tab1",
  },
  {
    label: "Tab2",
    disabled: true,
    content: "And, this is the content for Tab2",
  },
  {
    label: "Tab3",
    content: "Finally, this is the content for Tab3",
  },
];

watch(
  () => props.modalOpen,
  (newVal: boolean) => {
    isModalOpen.value = newVal;
  },
);
</script>

<template>
  <UModal v-model="isModalOpen">
    <div class="p-4">
      <UTabs :items="items" />
    </div>
  </UModal>
</template>
