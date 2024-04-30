<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const emit = defineEmits<{ "travel-add": () => void }>();

const state = reactive({
  name: undefined,
  picture: undefined,
  dates: undefined,
  description: undefined,
  price: undefined,
  rating: undefined,
});

const schema = z.object({
  name: z.string().min(4),
  picture: z.string().min(1),
  dates: z.object({
    start: z.date(),
    end: z.date(),
  }),
  description: z.string().min(10),
  price: z.number(),
  rating: z.number(),
});

type Schema = z.infer<typeof schema>;

const form = ref();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch("/api/travel", {
      method: "POST",
      body: event.data,
    });
    emit("travel-add");
  } catch (err) {
    alert(`Error adding new travel ${err}`);
  }
}
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup name="name" label="Name of the travel">
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup name="dates" label="Date of departure & return">
      <DatePickerRange v-model="state.dates" />
    </UFormGroup>

    <UFormGroup name="picture" label="Picture (Provide valid URL to photo)">
      <UInput v-model="state.picture" />
    </UFormGroup>

    <UFormGroup name="description" label="Description">
      <UTextarea v-model="state.description" />
    </UFormGroup>

    <UFormGroup name="price" label="Price per person">
      <UInput v-model.number="state.price">
        <template #trailing>
          <span class="text-gray-500 dark:text-gray-400 text-xs">EUR</span>
        </template>
      </UInput>
    </UFormGroup>

    <UFormGroup name="rating" label="User rating">
      <URange v-model="state.rating" />
    </UFormGroup>

    <UButton type="submit"> Submit </UButton>

    <UButton variant="outline" class="ml-2" @click="form.clear()">
      Clear
    </UButton>
  </UForm>
</template>
