<template>
  <div v-if="!!gistData">
    <div v-html="gistData.div"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ gist: { type: String, required: true } });

const { data: gistData } = await useFetch(
  `https://gist.github.com/${props.gist}.json`
);
</script>
