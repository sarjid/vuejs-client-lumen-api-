<template>
  <div class="bg-white">
    <div
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
      <h2
        class="text-2xl font-bold tracking-tight text-gray-900 text-center mb-2"
      >
        Product Lists
      </h2>
      <div class="grid grid-cols-6 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <div
          v-for="product in getProducts"
          :key="product.id"
          class="max-w-md mx-auto bg-white rounded-lg shadow-lg"
        >
          <div class="px-4 py-4">
            <h2 class="text-xl font-semibold text-gray-800">
              {{ product.product_name }}
            </h2>

            <p class="text-green-600 font-bold mt-2">{{ product.price }}$</p>
            <p class="text-gray-500 text-sm">
              {{ product.product_code }}
            </p>
            <div class="flex justify-between items-center mt-4">
              <!-- Delete Icon -->
              <button
                class="text-red-500 hover:text-red-700"
                title="Delete Product"
                @click="destroy(product.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/product";
const product = useProductStore();
const { getProducts } = storeToRefs(product);

onMounted(() => {
  product.index();
});

const destroy = (id) => {
  if (confirm("are you shure to delete ? ")) {
    product.destroy(id);
  }
};
</script>
