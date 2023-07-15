<script setup>
import HeaderPart from "@/components/Header/Index.vue";
import FooterPart from "@/components/Footer/Index.vue";
</script>
<template>
  <div>
    <HeaderPart />
    <main>
      <slot />
    </main>
    <FooterPart />
  </div>
</template>
