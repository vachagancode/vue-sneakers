<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  onClickRemove: Function
})
</script>

<template>
  <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" :src="imageUrl" alt="Sneaker" />

    <div class="flex flex-col justify-between flex-1">
      <p>{{ title }}</p>

      <div class="flex justify-between mt-2">
        <b>{{ price }}</b>
        <img
          @click="() => onClickRemove()"
          class="opacity-40 hover:opacity-100 transition cursor-pointer"
          src="/img/btn-remove.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
