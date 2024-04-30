<template>
  <div class="w-full h-16 shadow-md flex">
    <AppLogo />
    <div
      class="flex items-center space-x-4 ml-14 text-xl font-bold text-gray-400"
    >
      <nuxt-link to="/travels" exact-active-class="active-link"
        >Travels</nuxt-link
      >
      <nuxt-link to="/bookings" exact-active-class="active-link"
        >Bookings</nuxt-link
      >
    </div>
  </div>
</template>

<style>
.active-link {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  background-image: linear-gradient(to right, #84cc16, #4299e1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
}
</style>
