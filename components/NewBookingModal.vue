<script setup lang="ts">
const isModalOpen = defineModel<boolean>();

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

</script>

<template>
  <UModal v-model="isModalOpen">
    <div class="p-4">
      <UTabs :items="items" />
    </div>
  </UModal>
</template>
