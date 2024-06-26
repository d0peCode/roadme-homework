<script setup lang="ts">
import { sub, format, isSameDay, add, type Duration } from "date-fns";

const props = defineProps<{ modelValue?: { start: Date; end: Date } }>();
const emit = defineEmits<{ "update:modelValue": { start: Date; end: Date } }>();

const ranges = [
  { label: "Next 7 days", duration: { days: 7 } },
  { label: "Next 14 days", duration: { days: 14 } },
  { label: "Next 30 days", duration: { days: 30 } },
  { label: "Next 3 months", duration: { months: 3 } },
  { label: "Next 6 months", duration: { months: 6 } },
  { label: "Next year", duration: { years: 1 } },
];

const selected = ref(
  props.modelValue || { start: new Date(), end: add(new Date(), { days: 14 }) },
);

function isRangeSelected(duration: Duration) {
  return (
    isSameDay(selected.value.start, sub(new Date(), duration)) &&
    isSameDay(selected.value.end, new Date())
  );
}

function selectRange(duration: Duration) {
  selected.value = { start: new Date(), end: add(new Date(), duration) };
  emit("update:modelValue", selected);
}

onMounted(() => {
  emit("update:modelValue", selected);
});
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton icon="i-heroicons-calendar-days-20-solid">
      {{ format(selected.start, "d MMM, yyy") }} -
      {{ format(selected.end, "d MMM, yyy") }}
    </UButton>

    <template #panel="{ close }">
      <div
        class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800"
      >
        <div class="hidden sm:flex flex-col py-4">
          <UButton
            v-for="(range, index) in ranges"
            :key="index"
            :label="range.label"
            color="gray"
            variant="ghost"
            class="rounded-none px-6"
            :class="[
              isRangeSelected(range.duration)
                ? 'bg-gray-100 dark:bg-gray-800'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
            ]"
            truncate
            @click="selectRange(range.duration)"
          />
        </div>

        <DatePicker v-model="selected" @close="close" />
      </div>
    </template>
  </UPopover>
</template>
