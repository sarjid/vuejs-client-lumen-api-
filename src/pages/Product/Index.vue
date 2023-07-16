<template>
  <body
    class="flex flex-col w-screen min-h-screen p-20 bg-gray-100 text-gray-800"
  >
    <!-- Component Start -->
    <h1 class="text-xl text-center">Product List</h1>

    <div
      class="grid 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-6 w-full mt-6"
    >
      <!-- Product Tile Start -->
      <ProductItem
        v-for="(product, index) in getProducts"
        :key="index"
        :product="product"
        @destroy="destroy"
      />
    </div>
  </body>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/product";
import ProductItem from "@/components/ProductItem.vue";
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
