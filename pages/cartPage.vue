<template>
 <section class="cart">
    <div class="container">
        <div class="cart__inner">
            <h2 class="cart__title text-6xl text-green-600 font-mono font-bold md:text-8xl">Корзина</h2>
            <ul class="cart__items" v-if="cartProducts.length > 0">
                <cartProduct 
                  v-for="product in cartProducts"
                  :key="product.id"
                  :product="product"
                />
            </ul>
            <p class="cart__empty text-3xl text-red-600 font-mono font-bold" v-else> Ваша корзина пуста</p>
        </div>
         <p class="cart__total text-3xl text-green-600 font-mono font-bold">ИТОГО: {{totalPrice}} руб.</p>
         <button @click="basket()">SAVE BASKET</button>
    </div>
        
  
 </section>
</template>

<script setup lang="ts">
import {useCartStore} from '../stores/cart'
import cartProduct from '../components/cartProduct.vue';

const cartProducts = useCartStore().cart
const totalPrice = useCartStore().totalPrice









async function basket(){
  await useCartStore().addToBD()
  
}



onMounted(async()=> {
  await useCartStore().checkAvailableProductFromCart()
})








</script>

<style scoped>
.cart__title{
    text-align: center;
}

.cart__items{
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 40px;
}

.cart__item{
    padding: 15px 20px;
    border-bottom: 2px solid green;
}
.cart__item_wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
}

button{
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    background-color: green;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  button:hover{
    background-color: rgb(240, 236, 236);
    color: green;
  }
</style>../stores/cart