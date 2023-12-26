<script setup>
import { onMounted, reactive, watch, provide, computed } from 'vue'
import axios from 'axios'
import { ref } from 'vue'

import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'

const items = ref([])
const cart = ref([])
const isCreatingOrder = ref(false)

const drawerIsOpened = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const filters = reactive({
  sortBy: 'name',
  searchQuery: ''
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post("https://7a2a36ce090bf5dc.mokky.dev/orders", {
      items: cart.value,
      totalPrice: totalPrice.value
    })

    cart.value = []

    // return data
  } catch (err) {
    console.log(`An error has occurred ${err}`)
  } finally {
    isCreatingOrder.value = false
    console.log(isCreatingOrder.value)
  }
}


const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://7a2a36ce090bf5dc.mokky.dev/favorites`)

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (e) {
    console.log(`An error has occurred: ${e}`)
  }
}

const addToCart = (item) => {
  item.isAdded = true
  cart.value.push(item)
}

const removeFromCart = (item) => {
  item.isAdded = false
  cart.value.splice(cart.value.indexOf(item), 1)
}

const onClickAddToCart = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const checkOnFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id
      }
      item.isFavorite = true
      const { data } = await axios.post(`https://7a2a36ce090bf5dc.mokky.dev/favorites`, obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://7a2a36ce090bf5dc.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}
const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.name = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://7a2a36ce090bf5dc.mokky.dev/items`, {
      params
    })

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false,
      favoriteId: null
    }))
  } catch (e) {
    console.log(`An error has occurred: ${e}`)
  }
}

// Drawer Functionality

const openDrawer = () => {
  drawerIsOpened.value = true
}

const closeDrawer = () => {
  drawerIsOpened.value = false
}

onMounted(async () => {
  const localCartValues = localStorage.getItem('cart')
  cart.value = localCartValues ? JSON.parse(localCartValues) : []

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})
watch(filters, fetchItems)
watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(cart, () => {
  localStorage.setItem('cart', JSON.stringify(cart.value))
}, {
  deep: true
})

provide('checkOnFavorite', checkOnFavorite)
provide('onClickAddToCart', onClickAddToCart)
provide('cart', {
  cart,
  openDrawer,
  closeDrawer,
  addToCart,
  removeFromCart,
  totalPrice,
  isCreatingOrder,
})
</script>

<template>
  <Drawer v-if="drawerIsOpened" @createOrder="createOrder"/>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все Кроссовки</h2>
        <div class="flex gap-4">
          <select
            @change="onChangeSelect"
            class="py-2 px-3 border rounded-md outline-none"
            name=""
            id=""
          >
            <option class="" value="name">По Названию</option>
            <option value="price">По Цене (дешёвые)</option>
            <option value="-price">По Цене (дорогие)</option>
          </select>
        </div>
        <div class="relative">
          <img class="absolute left-3 top-3" src="/img/search.svg" alt="Search" />
          <input
            @input="onChangeSearchInput"
            type="text"
            placeholder="Поиск..."
            class="border rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400 transition"
          />
        </div>
      </div>

      <div class="mt-10">
        <CardList :items="items" />
      </div>

    </div>
  </div>
</template>
