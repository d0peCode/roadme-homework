<script setup lang="ts">
const { data: { value: travels } } = await useFetch('/api/travel')
console.log('data', travels)

await $fetch('/api/travel', { 
  method: "POST",
  body: {
    "aaa": "bbb"
  }
})
const columns = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'pictureURL',
  label: 'Picture'
}, {
  key: 'name',
  label: 'Name of the travel'
}, {
  key: 'description',
  label: 'Description',
}, {
  key: 'departureDate',
  label: 'Date of departure'
}, {
  key: 'returnDate',
  label: 'Date of return'
}, 
  { key: 'actions' }
]

const items = (row) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id)
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid'
  }]
]

const travelItems = [{
  id: 1,
  name: { value: 'Egyptian Odyssey: Pyramids, Pharaohs, Desert, and Marine Marvels', class: 'text-wrap' },
  description: { value: 'Embark on a captivating journey through Egypt\'s wonders on Egyptian Odyssey tour. From the iconic Pyramids of Giza to Cairo\'s bustling streets, delve into the nation\'s rich history and culture. Explore ancient marvels, ride camels through the desert, and visit a Bedouin village for a glimpse into traditional life. Experience the thrill of quad biking across the dunes before diving into the Red Sea\'s vibrant underwater world. Snorkel among coral reefs, swim with dolphins, and create lasting memories on this unforgettable adventure.', class: 'italic text-wrap' },
  departureDate: '01/07/2024',
  returnDate: '10/07/2024',
  pictureURL: '/egipt'
}, {
  id: 2,
  name: { value: 'Majestic Mallorca: Dive, Explore, and Soar', class: 'text-wrap' },
  description: { value: 'Experience the beauty of Mallorca with diving adventures in azure waters, exploring Orange Valley\'s citrus groves, and indulging in fresh orange ice cream. Discover Palma\'s historic treasures, including the Cathedral and Almudaina Palace, and explore the charming town of Alcudia. Visit the iconic Formentor Peninsula for stunning views and relax on pristine beaches. End your journey with a thrilling hot air balloon ride over Mallorca\'s landscapes.', class: 'italic text-wrap' },
  departureDate: '14/07/2024',
  returnDate: '28/07/2024',
  pictureURL: '/mallorca'
}, {
  id: 3,
  name: { value: 'Zesty Zakynthos: Sun, Sea, Serenity, and Sea Turtles', class: 'text-wrap' },
  description: { value: 'Embark on a rejuvenating journey to Zakynthos, where sun-kissed beaches, azure waters, and a touch of wildlife await. Dive into the crystal-clear seas for unforgettable snorkeling experiences, encountering vibrant marine life beneath the waves, including the majestic sea turtles that call these waters home. Explore the island\'s natural beauty with visits to the iconic Shipwreck Beach and the mesmerizing Blue Caves, where you may catch glimpses of these gentle creatures. Indulge in the island\'s culinary delights with fresh seafood and traditional Greek cuisine, all while soaking in the serene atmosphere of this Mediterranean paradise. Relax on sandy shores, bask in the Mediterranean sun, and immerse yourself in the laid-back vibe of Zakynthos. Experience a serene escape where every moment is infused with zest, tranquility, and the enchanting presence of sea turtles.', class: 'italic text-wrap' },
  departureDate: '14/06/2024',
  returnDate: '28/06/2024',
  pictureURL: '/zakynthos'
}, {
  id: 4,
  name: { value: 'Australian Adventure: Melbourne Wildlife, Outback Farm, Royal Gardens, and Vivid Sydney', class: 'text-wrap'},
  description: { value: 'Embark on an extraordinary journey through Australia\'s diverse landscapes and vibrant cities. Begin your adventure in Melbourne, where you\'ll visit the renowned zoo for a unique wildlife encounter with kangaroos and other native Australian animals. Take a stroll through the majestic Royal Botanic Gardens, immersing yourself in the beauty of its lush landscapes and exotic flora. Next, dive into the heart of the outback for an authentic farm experience, participating in daily activities and savoring farm-fresh meals, gaining insight into rural Australian life. Conclude your journey in Sydney for the mesmerizing Vivid festival, where the city transforms into a dazzling display of lights and creativity. Explore Sydney\'s renowned landmarks, including the iconic Opera House, and embark on a scenic harbor cruise to admire the city\'s skyline from the water.', class: 'italic text-wrap' },
  departureDate: '14/05/2024',
  returnDate: '07/06/2024',
  pictureURL: '/australia'
}
]

const q = ref('')

const isAddTravelModalOpen = ref(false)
const isTableLoading = ref(false)
const filteredRows = computed(() => {
  if (!q.value) {
    return travelItems
  }

  return travelItems.filter((item) => {
    return Object.values(item).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})
</script>

<template>
  <div>
    <NewTravelModal v-model="isAddTravelModalOpen" />
    <div class="flex justify-between px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filter people..." />
      <UButton @click="isAddTravelModalOpen = true">Add new travel</UButton>
    </div>
    
    <UTable 
        :rows="filteredRows" 
        :columns="columns" 
        :loading="isTableLoading"
        :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
        :progress="{ color: 'primary', animation: 'carousel' }" 
    >
      <template #picture-data="{ row }">
        {{ row }}
      </template>
      <template #name-data="{ row }">
        {{ row.name.value }}
      </template>
      <template #description-data="{ row }">
        {{ row.description.value }}
      </template>
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </div>
</template>

