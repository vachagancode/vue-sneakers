<script setup>
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function
})
</script>

<template>
  <div
    class="relative m-10 bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition"
  >
    <img
      class="absolute top-8 left-8"
      :src="isFavorite ? '/img/liked.svg' : '/img/unliked.svg'"
      alt="[Not]Liked"
      @click="onClickFavorite"
    />
    <!-- /img/liked.svg -->
    <img :src="imageUrl" alt="Sneaker" />
    <p>{{ title }}</p>

    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена</span>
        <b>$ {{ price }}</b>
      </div>
      <img
        @click="onClickAdd"
        :src="!isAdded ? '/img/plus.svg' : '/img/btn-checked.svg'"
        alt="Plus"
      />
    </div>
  </div>
</template>

<!-- /img/sneakers/1.jpg -->
