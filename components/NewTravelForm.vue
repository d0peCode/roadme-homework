<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const emit = defineEmits<{ "travel-add": () => void }>();

const initialState = {
  name: undefined,
  picture: undefined,
  dates: undefined,
  description: undefined,
  price: undefined,
  rating: undefined,
};

const state = ref({ ...initialState });

const schema = z.object({
  name: z.string().min(4).max(100),
  picture: z.string().url(),
  dates: z.object({
    start: z.date(),
    end: z.date(),
  }),
  description: z.string().min(10).max(1000),
  price: z.number().max(1000000),
  rating: z.number(),
});

type Schema = z.infer<typeof schema>;

const clearForm = () => {
  state.value = { ...initialState };
};

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
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
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
      <UTextarea v-model="state.description" rows="10" maxrows="10" />
    </UFormGroup>

    <UFormGroup name="price" label="Price per person">
      <UInput v-model.number="state.price" type="number">
        <template #trailing>
          <span class="text-gray-500 dark:text-gray-400 text-xs">EUR</span>
        </template>
      </UInput>
    </UFormGroup>

    <UFormGroup name="rating" label="User rating">
      <URange v-model="state.rating" />
    </UFormGroup>

    <UButton type="submit"> Submit </UButton>

    <UButton variant="outline" class="ml-2" @click="clearForm"> Clear </UButton>
  </UForm>
</template>
