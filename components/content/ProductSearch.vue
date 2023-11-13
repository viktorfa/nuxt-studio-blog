<template>
  <div>
    <div class="space-y-6">
      <div v-for="item of psResults" :key="item.image">
        <div class="mb-4">
          <p class="text-lg">Test image</p>
          <img
            :src="getProductImageUrl(item.image)"
            class="object-contain object-top h-[256px]"
            height="256"
          />
        </div>
        <div class="mb-4">
          <p class="text-lg">Results Product Search</p>
          <div class="grid grid-cols-3 gap-1">
            <div v-for="result of item.results" :key="result.uri">
              <div>
                {{ result.title }}
                <img
                  :src="result.imageUrl"
                  height="160"
                  class="object-contain object-top h-[160px]"
                />
                Score: {{ result.score.toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
        <div>
          <p class="text-lg">Results Vertex multimodal embedding</p>
          <div class="grid grid-cols-3 gap-1">
            <div
              v-for="result of vertexResults.find((x) => x.image === item.image)
                .results"
              :key="result.uri"
            >
              <div class="flex flex-col items-start">
                {{ result.title }}
                <img
                  :src="result.imageUrl"
                  height="160"
                  class="object-contain object-top h-[160px]"
                />
                Score: {{ result.score.toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import vertexResults from "./vertex_results.json";
import psResults from "./ps_results.json";

const getProductImageUrl = (image: string) => {
  return `/product-search-images/${image.split(":")[1]}`;
};
</script>
