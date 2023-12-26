<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart, removeFromCart } = inject('cart')
</script>

<template>
  <div class="grid grid-col flex-1 gap-4" v-auto-animate>
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :title="item.name"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :onClickRemove="() => removeFromCart(item)"
    />
  </div>
</template>
