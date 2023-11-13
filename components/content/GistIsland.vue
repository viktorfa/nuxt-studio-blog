<template>
  <NuxtIsland name="Gist" :props="{ gist }" lazy>
    <template #fallback>Fallback</template>
  </NuxtIsland>
</template>

<script setup lang="ts">
const props = defineProps({ gist: { type: String, required: true } });
</script>
