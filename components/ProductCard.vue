<template>
    <div class="product-card">
        <div class="product-card__inner">
            <h3 class="product-card__title text-2xl text-green-600">{{props.product.title}}</h3>
            <div class="procuct-card__content">
                <div class="product-card__img">
                    <img :src="props.product.image" :alt="props.product.title">
                </div>
                <div class="product-card__desc">
                    <p class="text-green-900">
                        {{props.product.title }}
                    </p>
                    <small class="product-card__category text-gray-500">{{props.product.category}}</small>
                </div>
            </div>


            <div v-if="getItem" class="product__cart rounded-xl bg-white text-green-600 text-xl">
                <div @click="cartStore.decreaseProduct(props.product)"> MINUS</div>
                <input class="product__count text-green-600 rounded-xl" type="number" name="number" id="number" :value="getItem" @input="updateGetItem($event, props.product.id)">
                <div @click="cartStore.increaseProduct(props.product)"> PLUS</div>
            </div>
            <div class="add-toCart rounded-xl bg-green-600 text-white text-xl" v-else @click="cartStore.increaseProduct(props.product)">  
                <button >Добавить в корзину</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { defineProps, ref, computed} from "vue";
    import {useCartStore} from '../stores/store'
    import {type IProducts} from '../interfaces'

    const props = defineProps<{product:IProducts}>()


    const cartStore = useCartStore()


    
    const getItem = computed(()=>{
        const item = cartStore.cart.find(obj => obj.id === props.product.id)
        if(item){
            return item.count
        }
       
    })


    function updateGetItem(e:Event, id:number):void{
        const item = cartStore.cart.find(obj => obj.id === id)
        const value = (e.target as HTMLInputElement).value
        item ? item.count = Number(value) : 0
        if(Number(value) === 0){
            cartStore.decreaseProduct(props.product)
        }
    }




</script>

<style scoped>

.product-card{
    position: relative;
    min-width: 200px;
    padding: 15px 20px;
    border: 2px solid green;
}

.product-card__inner{
    height: 100%;
    display: flex;
    flex-direction: column;
}

.product-card__title{
    text-wrap: balance;
    overflow: hidden;
    max-height: 35px;
  
}



.product-card__img img{
    margin: auto;
    width: 200px;
    height: 200px;
    object-fit: contain;
}

.procuct-card__content{
    flex: 1 0 auto;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}


.add-toCart{
    transition: all .3s ease;
    text-align: center;
    padding: 10px;
}


.add-toCart:hover{
    color: #16a34a;
    outline: 2px solid #16a34a;
    background-color: white;
}



.product__cart{
    display: flex;
    justify-content: space-between;
}

input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
.product__count{
    max-width: 100px;
    text-align: center;
    border: 2px dashed #16a34a;
}

</style>../stores/cart