<template>
  <li class="cart__item">
    <div class="cart__item_remove text-dark-600 cursor-pointer hover:text-red-500" @click="removeItem(product.id)">DELETE ITEM</div>
    <div class="cart__item_wrapper">
        <div class="cart__item_img">
            <img :src="product.product_img" :alt="product.product_name">
        </div>
        <div class="cart__item_title ">
            {{ product.product_name }}
        </div>
       
        <div class="cart__item_total font-medium text-emerald-500 ">
           Товаров в наличии: {{ product.product_total_count }} шт.
        </div>

        <div class="cart__item_count">
            Количество: {{ product.count }}
        </div>

        <div class="cart__item_price font-medium text-dark-500">
            Цена:   {{ salePrice(product.product_price, product.product_sale) }} руб.
          
         </div>
         <div class="cart__input rounded-xl bg-white text-green-600 text-xl" v-if="getItem">
            <div class="cursor-pointer hover:text-green-400" @click="cartStore.decreaseProduct(product)"> MINUS</div>
            <input class="product__count text-green-600 rounded-xl" type="number" name="number" id="number" v-model="getItem" @change="updateCartItemQuantity($event, product)">
            <div class="cursor-pointer hover:text-green-400" @click="cartStore.increaseProduct(product)"> PLUS</div>
        </div>

    </div>

</li>
</template>

<script lang="ts" setup>
import type { ICart } from '../stores/cart';
import {useCartStore} from '../stores/cart'



const props = defineProps<{product:ICart}>()

const cartStore = useCartStore()

function salePrice (price: number, sale: number):number {
    return Math.trunc(price - price * sale / 100 )
}

const removeItem = (id: number) => {
    cartStore.removeProduct(id)
}

function updateCartItemQuantity(event: Event, product:ICart): void {
        const itemToUpdate = cartStore.cart.find(item => item.id === product.id);
        const value = (event.target as HTMLInputElement).value;

        if (itemToUpdate) {
            if (Number(value) === 0) {
                cartStore.removeProduct(product.id)
            } else if (Number(value) <= product.product_total_count) {
                itemToUpdate.count = Number(value);
            } else {
                itemToUpdate.count = product.product_total_count;
            }
        }

    }


    const getItem = computed(():number=>{
        const item = cartStore.cart.find(obj => obj.id === props.product.id)
        return item ? item.count : 0
    })


    






</script>

<style>

</style>