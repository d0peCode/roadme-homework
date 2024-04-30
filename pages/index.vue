<template>
  <main>
    <h2 class="font-600">Hello!</h2>
    <p>This project is recruitment task. I used:</p>
    <ul class="list-disc ml-6">
      <li>Nuxt3</li>
      <li>Nuxt3 UI Kit</li>
      <li>Nuxt3 server routes</li>
      <li>Typescript</li>
      <li>Tailwind</li>
    </ul>
    <p>I also used some developer tools:</p>
    <ul class="list-disc ml-6">
      <li>Eslit</li>
      <li>Prettier</li>
      <li>Husky</li>
    </ul>
    <p>Use navigation bar on top to check out two available pages.</p>
    <p>I hope you like it! :)</p>
    <nuxt-link
      to="/travels"
      class="flex items-center justify-center rounded mt-4 w-24 h-10 text-white font-bold italic text-lg bg-gradient-to-r from-lime-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
      >Start</nuxt-link
    >
  </main>
</template>
