<script setup lang="ts">
import { z } from "zod";
import type { Travel } from "@/types/travel";

const props = defineProps<{ travels: Travel[] }>();
const emit = defineEmits<{ "booking-add": () => void }>();

const isModalOpen = defineModel<boolean>();

const tabs = [
  {
    key: "relatedTravel",
    label: "Related travel",
    description: "Select related travel",
  },
  {
    key: "customerInfo",
    label: "Customer info",
    description: "Provide customer info",
  },
  {
    key: "paymentType",
    label: "Payment type",
    description: "Select payment type",
  },
];

const bookingForm = reactive({
  id: undefined,
  travelName: undefined,
  customerName: undefined,
  customerEmail: undefined,
  customerPhone: undefined,
  customerAge: undefined,
  customerGender: undefined,
  paymentType: undefined,
  notes: undefined,
});

const schema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.number(),
  customerAge: z
    .number()
    .positive({ message: "Please provide a valid customer age" }),
});

const paymentTypes = [
  {
    name: "Credit transfer",
    value: "transfer",
  },
  {
    name: "Revolut",
    value: "revolut",
  },
  {
    name: "PayPal",
    value: "payPal",
  },
];

const genders = [
  {
    name: "Female",
    value: "Female",
  },
  {
    name: "Male",
    value: "Male",
  },
  {
    name: "Other",
    value: "Other",
  },
];
const route = useRoute();
const router = useRouter();

const selectedTab = computed({
  get() {
    const index = tabs.findIndex((item) => item.label === route.query.tab);
    if (index === -1) {
      return 0;
    }

    return index;
  },
  set(value) {
    router.replace({ query: { tab: tabs[value].label } });
  },
});

const goToNextTab = () => {
  const nextIndex = (selectedTab.value + 1) % tabs.length;
  selectedTab.value = nextIndex;
  router.replace({ query: { tab: tabs[nextIndex].label } });
};

watch(isModalOpen, (newValue) => {
  if (!newValue) {
    const currentQuery = { ...route.query };
    delete currentQuery.tab;
    router.replace({ query: currentQuery });
  }
});

async function onSubmit() {
  try {
    await $fetch("/api/booking", {
      method: "POST",
      body: bookingForm,
    });
    isModalOpen.value = false;
    emit("booking-add");
  } catch (err) {
    alert(`Error adding new booking ${err}`);
  }
}

const travelsOptions = computed(() => {
  return props.travels.map((travel: Travel) => {
    return {
      id: travel.id,
      name: travel.name,
    };
  });
});
</script>

<template>
  <!--  <UModal v-model="isModalOpen" :prevent-close="shouldPreventClose()">-->
  <UModal v-model="isModalOpen">
    <div class="p-4">
      <UTabs v-model="selectedTab" :items="tabs" class="w-full">
        <template #item="{ item }">
          <UCard @submit.prevent="() => onSubmit(bookingForm)">
            <template #header>
              <p
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                {{ item.label }}
              </p>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ item.description }}
              </p>
            </template>

            <div v-if="item.key === 'relatedTravel'" class="space-y-3">
              <UForm :state="bookingForm" @submit="goToNextTab">
                <USelectMenu
                  v-model="bookingForm.travelName"
                  searchable
                  searchable-placeholder="Search a travel..."
                  class="w-full lg:w-48"
                  placeholder="Select a travel"
                  :options="travelsOptions"
                  option-attribute="name"
                  by="id"
                  required
                />

                <UButton type="submit" class="mt-4"> Next </UButton>
              </UForm>
            </div>

            <div v-else-if="item.key === 'customerInfo'" class="space-y-3">
              <UForm
                :schema="schema"
                :state="bookingForm"
                @submit="goToNextTab"
              >
                <UFormGroup label="Customer name" name="customerName" required>
                  <UInput
                    v-model="bookingForm.customerName"
                    type="text"
                    required
                  />
                </UFormGroup>

                <UFormGroup
                  label="Customer email"
                  name="customerEmail"
                  required
                >
                  <UInput
                    v-model="bookingForm.customerEmail"
                    type="email"
                    required
                  />
                </UFormGroup>

                <UFormGroup
                  label="Customer phone number"
                  name="customerPhone"
                  required
                >
                  <UInput
                    v-model="bookingForm.customerPhone"
                    type="number"
                    required
                  />
                </UFormGroup>

                <UFormGroup label="Customer age" name="customerAge" required>
                  <UInput
                    v-model="bookingForm.customerAge"
                    type="number"
                    required
                  />
                </UFormGroup>

                <UFormGroup
                  label="Customer gender"
                  name="customerGender"
                  required
                >
                  <USelect
                    v-model="bookingForm.customerGender"
                    :options="genders"
                    option-attribute="name"
                    required
                  />
                </UFormGroup>

                <UButton type="submit" class="mt-4"> Next </UButton>
              </UForm>
            </div>

            <div v-else-if="item.key === 'paymentType'" class="space-y-3">
              <UForm :state="bookingForm" @submit="onSubmit">
                <UFormGroup label="Payment type" name="paymentType" required>
                  <USelect
                    v-model="bookingForm.paymentType"
                    :options="paymentTypes"
                    option-attribute="name"
                    required
                  />
                </UFormGroup>

                <UFormGroup label="Notes" name="notes">
                  <UTextarea v-model="bookingForm.notes" />
                </UFormGroup>

                <UButton type="submit" class="mt-4"> Save booking </UButton>
              </UForm>
            </div>
          </UCard>
        </template>
      </UTabs>
    </div>
  </UModal>
</template>
