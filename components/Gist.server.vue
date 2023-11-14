<template>
  <div v-if="!!gistData">
    <div v-html="cleanGistHtml"></div>
    <link rel="stylesheet" :href="gistData.stylesheet" type="text/css" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  gist: { type: String, required: true },
  file: { type: String, required: false },
});

const gistUrl = props.file
  ? `https://gist.github.com/${props.gist}/${props.file}.json`
  : `https://gist.github.com/${props.gist}.json`;

const { data: gistData } = await useFetch(gistUrl);

const cleanGistHtml = computed(() => {
  try {
    return gistData.value.div.replace("{{ revealButtonHref }}", "#");
  } catch (e) {
    console.error(e);
    return "";
  }
});
</script>
