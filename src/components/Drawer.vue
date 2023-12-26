<script setup>
import DrawerHead from './DrawerHead.vue'
import CardListItem from './CardListItem.vue'
import {computed, inject} from 'vue'
import InfoBlock from "@/components/InfoBlock.vue";

const { totalPrice } = inject('cart')
const { isCreatingOrder } = inject('cart')

const emit = defineEmits(['createOrder'])


const ButtonDisabled = computed(() => {
  if (isCreatingOrder.value) {
    return true
  }
  else {
    if (totalPrice.value > 0) {
      return false
    }
    else {
      return true
    }
  }
})
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <drawer-head />

    <div v-if="!totalPrice" class="flex h-full items-center">
      <info-block title="Корзина Пуста" description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ" image-url="/img/empty-cart.jpg"/>
    </div>

    <card-list-item v-if="totalPrice" />

    <div v-if="totalPrice" class="flex flex-col gap-5 mb-6 my-7">
      <div class="flex gap-2">
        <span>Итого։ </span>
        <div class="flex-1 border-bottom border-dashed"></div>
        <b>$ {{ totalPrice }}</b>
      </div>

      <div class="flex gap-2">
        <span>Налог 5% </span>
        <div class="flex-1 border-bottom border-dashed"></div>
        <b>$ {{ totalPrice * 0.05 }}</b>
      </div>

      <button
          :disabled="ButtonDisabled"
          @click="emit('createOrder')"
          class="my-4 bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 transition disabled:bg-slate-400 disabled:cursor-pointer"
      >
        Оформить Заказ
      </button>
    </div>
  </div>
</template>
