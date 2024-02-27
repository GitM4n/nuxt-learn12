<template>

    <div>
        <div class="products">
            <div class="container">
                <div  class="products__inner">
                  <ProductCardDB 
                  v-for="product in products"
                  :key="product.id"
                  :product="product"
                  />
                </div>
            </div>
        </div>
        <ul class="pagination flex justify-center gap-4">
        <li @click="changePage(i+1)" class="cursor-pointer hover:text-green-400 text-3xl font-mono " v-for="_, i in calculatePages()" :style="curPage === i+1 ? 'color: green' : ''" >
                {{ i+1 }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import ProductCardDB from './ProductCardDB.vue';
import { useMyProductsStore } from '../stores/products';



const {getProducts, productsCount, calculatePages} = useMyProductsStore()

const products = computed(()=>{
    return useMyProductsStore().products
})

console.log(productsCount)

const curPage = ref(1)

async function changePage(idx:number){
    await getProducts(idx)
    curPage.value = idx
}


</script>


<style scoped>
.products__inner{
    padding: 30px 0;
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(260px, 400px));
    gap: 10px;
}




</style>