<template>
  <div>
    <a href="#" class="block h-48 rounded-lg shadow-lg bg-white">
      <button
        class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full"
        @click="deleteItem(product.id)"
      >
        Delete
      </button>
    </a>
    <div class="flex items-center justify-between mt-3">
      <div>
        <a href="#" class="font-medium">{{ product.product_name }}</a>
        <a class="flex items-center" href="#">
          <span class="text-xs font-medium ml-1 text-indigo-500">{{
            product.product_code
          }}</span>
        </a>
      </div>
      <span
        class="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded"
        >${{ product.price }}</span
      >
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
  },
});
const emit = defineEmits(["destroy"]);
const deleteItem = (id) => {
  emit("destroy", id);
};
</script>
