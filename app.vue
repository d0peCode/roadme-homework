<script setup lang="ts">
const { title, description } = useAppConfig()

useHead({
  titleTemplate: (titleChunk: string) => {
    return titleChunk ? `${titleChunk} - ${title}` : title
  },
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: description,
    },
  ],
})
</script>
<template>
  <Html lang="en" />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
