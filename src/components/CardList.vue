<script setup>
import Card from './Card.vue'
import { inject } from 'vue'

defineProps({
  items: Array
})

const checkOnFavoriteItem = inject('checkOnFavorite')
const onClickAddToCart = inject('onClickAddToCart')
</script>

<template>
  <div v-auto-animate class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :imageUrl="item.imageUrl"
      :title="item.name"
      :price="item.price"
      :onClickFavorite="() => checkOnFavoriteItem(item)"
      :isFavorite="item.isFavorite"
      :onClickAdd="() => onClickAddToCart(item)"
      :isAdded="item.isAdded"
    />
  </div>
</template>
