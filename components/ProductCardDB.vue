<template>
    <div class="product-card">
        <div class="product-card__inner">
            <h3 class="product-card__title text-2xl text-green-600">{{product.product_name}}</h3>
            <div class="procuct-card__content">
                <div class="product-card__img">
                    <img :src="product.product_img" :alt="product.product_name">
                </div>
                <div class="product-card__desc">
                    <p class="text-green-900">
                        {{product.product_name }}
                    </p>
                    <div class="cart__item_total font-medium text-emerald-500 ">
                        Товаров в наличии: {{ product.product_total_count }} шт.
                     </div>
                </div>
                <div class="product-card__price">
                    <small v-if="product.product_sale" class="product-card__category text-gray-500">SALE:-{{product.product_sale}}%</small>
                    <p class="text-green-900">
                        Price: {{ Math.trunc(product.product_price - product.product_price * product.product_sale / 100 )}}
                    </p>
                </div>
            </div>
            <div class="product__cart rounded-xl bg-white text-green-600 text-xl" v-if="getItem">
                <div class="cursor-pointer hover:text-green-400" @click="cartStore.decreaseProduct(product)"> MINUS</div>
                <input class="product__count text-green-600 rounded-xl" type="number" name="number" id="number" v-model="getItem" @change="updateCartItemQuantity($event, product.id)">
                <div class="cursor-pointer hover:text-green-400" @click="cartStore.increaseProduct(product)"> PLUS</div>
            </div>
        <div class="add-toCart rounded-xl bg-green-600 text-white text-xl" v-else @click="cartStore.increaseProduct(product)">  
                <button>Добавить в корзину</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { defineProps, computed} from "vue";
    import {useCartStore} from '../stores/cart'
    import {type DBProducts} from '../interfaces'

    const props = defineProps<{product:DBProducts}>()

    const cartStore = useCartStore()

    

    function updateCartItemQuantity(event: Event, id: number): void {
        const itemToUpdate = cartStore.cart.find(item => item.id === id);
        const value = (event.target as HTMLInputElement).value;

        if (itemToUpdate) {
            if (Number(value) === 0) {
                cartStore.removeProduct(id)
            } else if (Number(value) <= props.product.product_total_count) {
                itemToUpdate.count = Number(value);
            } else {
                itemToUpdate.count = props.product.product_total_count;
            }
        }

    }


    const getItem = computed(():number=>{
        const item = cartStore.cart.find(obj => obj.id === props.product.id)
        return item ? item.count : 0
    })



    





    

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

.product__count:focus{
    outline: none;
    border: 2px solid #16a34a;
}

</style>../stores/cart