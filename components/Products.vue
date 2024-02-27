<template>
    <div>
        <div class="products">
            <div class="container">
                <div  class="products__inner">
                  <ProductCard 
                  v-for="product in products"
                  :key="product.id"
                  :product="product"
                  />
                </div>
            </div>
        </div>>
    </div>
</template>

<script setup lang="ts">

import {useCartStore} from '../stores/cart'
import { ref, defineProps } from 'vue';
import {type IProducts} from '../interfaces'
const cartStore = useCartStore()






const props = defineProps({
    limit:{
        type:String,
        default:'6'
    }
})




const products = ref<IProducts[]>([])






const {data} = await useFetch('https://fakestoreapi.com/products?limit='+ props.limit)
products.value = data.value as IProducts[]
</script>


<style scoped>
.products__inner{
    padding: 30px 0;
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(260px, 400px));
    gap: 10px;
}




</style>../stores/cart