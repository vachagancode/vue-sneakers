<script setup>
defineProps({
  totalPrice: Number
})
const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 border px-8 py-8 rounded-xl">
    <div class="flex items-center gap-4">
      <img src="/img/logo.png" alt="Logo" class="w-10" />
      <div>
        <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
        <p class="text-slate-400">Магазин Лучших Кросовок</p>
      </div>
    </div>
    <ul class="flex items-center gap-10">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer"
      >
        <img src="/img/cart.svg" alt="Card" />
        <b>$ {{ totalPrice }}</b>
      </li>
    </ul>
  </header>
</template>
