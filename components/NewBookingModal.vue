<script setup lang="ts">
import { z } from "zod";
import type { Travel } from "@/types/travel";

const props = defineProps<{ travels: Travel[] }>();
const emit = defineEmits<{ "booking-add": () => void }>();

const isModalOpen = defineModel<boolean>();

const initialStateRelatedTravel = {
  travelName: undefined,
};

const initialStateCustomerInfo = {
  customerName: undefined,
  customerEmail: undefined,
  customerPhone: undefined,
  customerAge: undefined,
  customerGender: undefined,
};

const initialStatePaymentType = {
  paymentType: undefined,
  notes: undefined,
};

const bookingFormRelatedTravel = ref({ ...initialStateRelatedTravel });
const bookingFormCustomerInfo = ref({ ...initialStateCustomerInfo });
const bookingFormPaymentType = ref({ ...initialStatePaymentType });

const schemaRelatedTravel = z.object({
  travelName: z.object({
    id: z.number(),
    name: z.string().min(1),
  }),
});

const schemaCustomerInfo = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.number(),
  customerAge: z
    .number()
    .positive({ message: "Please provide a valid customer age" }),
});

const schemaPaymentType = z.object({
  paymentType: z.string().min(1),
});

const tabs = computed(() => [
  {
    key: "relatedTravel",
    label: "Related travel",
    description: "Select related travel",
  },
  {
    key: "customerInfo",
    label: "Customer info",
    description: "Provide customer info",
    disabled: !schemaRelatedTravel.safeParse(bookingFormRelatedTravel.value)
      .success,
  },
  {
    key: "paymentType",
    label: "Payment type",
    description: "Select payment type",
    disabled: !schemaCustomerInfo.safeParse(bookingFormCustomerInfo.value)
      .success,
  },
]);

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
    const index = tabs.value.findIndex(
      (item) => item.label === route.query.tab,
    );
    if (index === -1) {
      return 0;
    }

    return index;
  },
  set(value) {
    router.replace({ query: { tab: tabs.value[value].label } });
  },
});

const goToNextTab = () => {
  const nextIndex = (selectedTab.value + 1) % tabs.value.length;
  selectedTab.value = nextIndex;
  router.replace({ query: { tab: tabs.value[nextIndex].label } });
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
      body: {
        ...bookingFormRelatedTravel.value,
        ...bookingFormCustomerInfo.value,
        ...bookingFormPaymentType.value,
      },
    });
    bookingFormRelatedTravel.value = ref({ ...initialStateRelatedTravel });
    bookingFormCustomerInfo.value = ref({ ...initialStateCustomerInfo });
    bookingFormPaymentType.value = ref({ ...initialStatePaymentType });
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
  <UModal v-model="isModalOpen">
    <div class="p-4">
      <UTabs v-model="selectedTab" :items="tabs" class="w-full">
        <template #item="{ item }">
          <UCard>
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
              <UForm
                :state="bookingFormRelatedTravel"
                :schema="schemaRelatedTravel"
                @submit="goToNextTab"
              >
                <USelectMenu
                  v-model="bookingFormRelatedTravel.travelName"
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
                :schema="schemaCustomerInfo"
                :state="bookingFormCustomerInfo"
                @submit="goToNextTab"
              >
                <UFormGroup label="Customer name" name="customerName" required>
                  <UInput
                    v-model="bookingFormCustomerInfo.customerName"
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
                    v-model="bookingFormCustomerInfo.customerEmail"
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
                    v-model="bookingFormCustomerInfo.customerPhone"
                    type="number"
                    required
                  />
                </UFormGroup>

                <UFormGroup label="Customer age" name="customerAge" required>
                  <UInput
                    v-model="bookingFormCustomerInfo.customerAge"
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
                    v-model="bookingFormCustomerInfo.customerGender"
                    :options="genders"
                    option-attribute="name"
                    required
                  />
                </UFormGroup>

                <UButton type="submit" class="mt-4"> Next </UButton>
              </UForm>
            </div>

            <div v-else-if="item.key === 'paymentType'" class="space-y-3">
              <UForm
                :state="bookingFormPaymentType"
                :schema="schemaPaymentType"
                @submit="onSubmit"
              >
                <UFormGroup label="Payment type" name="paymentType" required>
                  <USelect
                    v-model="bookingFormPaymentType.paymentType"
                    :options="paymentTypes"
                    option-attribute="name"
                    required
                  />
                </UFormGroup>

                <UFormGroup label="Notes" name="notes">
                  <UTextarea v-model="bookingFormPaymentType.notes" />
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
