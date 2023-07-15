<template>
  <div>
    <DefaultLayout>
      <RouterView v-slot="{ Component }"> </RouterView>
    </DefaultLayout>
  </div>
</template>

<script setup>
import DefaultLayout from "@/layouts/default.vue";
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
