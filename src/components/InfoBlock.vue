<script setup>
defineProps({
  title: String,
  imageUrl: String,
  description: String,
})
</script>

<template>
  <div class="flex items-center flex-col text-center w-72 mx-auto">
    <img height="80" width="80" class="" :src="imageUrl" alt="InfoImage">
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="text-gray-400">{{ description }}}</p>
  </div>
</template>