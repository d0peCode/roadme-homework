<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const state = reactive({
  name: undefined,
  picture: undefined,
  description: undefined,
  price: undefined,
  rating: undefined
})

const schema = z.object({
  name: z.string().min(10),
  description: z.string().min(10),
  price: z.number(),
  range: z.number().max(20, { message: 'Must be less than 20' })
})

type Schema = z.infer<typeof schema>

const form = ref()

async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}
</script>

<template>
  <UForm ref="form" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup name="input" label="Name of the travel">
      <UInput v-model="state.name" />
    </UFormGroup>   
    
    <UFormGroup name="input" label="Date of departure & return">
      <DatePickerRange />
    </UFormGroup>

    <UFormGroup name="inputMenu" label="Picture (Provide valid URL to photo)">
      <UInput v-model="state.picture" />
    </UFormGroup>

    <UFormGroup name="textarea" label="Description">
      <UTextarea v-model="state.description" />
    </UFormGroup>
    
    <UFormGroup name="textarea" label="Price per person">
      <UInput v-model="state.price">
        <template #trailing>
          <span class="text-gray-500 dark:text-gray-400 text-xs">EUR</span>
        </template>
      </UInput>
    </UFormGroup>

    <UFormGroup name="range" label="User rating">
      <URange v-model="state.rating" />
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>

    <UButton variant="outline" class="ml-2" @click="form.clear()">
      Clear
    </UButton>
  </UForm>
</template>
