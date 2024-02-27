<template>
    <TransitionGroup>
        <error v-if="err"/>
        <loadIndicator v-else-if="isLoad"/>
        <div class="wrapper" v-else>
            <NuxtLayout >
                <NuxtPage  />
            </NuxtLayout>
        </div>
    </TransitionGroup>
    
   
</template>



<script setup lang="ts">
import loadIndicator from '~/components/UI/loadIndicator.vue'
import error from '~/components/error.vue'
import { useMyProductsStore } from '~/stores/products';
import { useMyUserStore } from './stores/user';
import {useCartStore} from '~/stores/cart'


const isLoad = ref(true)
const err = ref(false)

const userStore = useMyUserStore()
const productsStore = useMyProductsStore()







onMounted(async()=>{
  try {

      const {productsLoaded, error} = await productsStore.getProducts()
      if(localStorage.getItem('user')) await useCartStore().checkAvailableProductFromCart()
    

      if(!localStorage.getItem('user')){
        await userStore.getUser()
      }else{
        userStore.user = JSON.parse(localStorage.getItem('user')!)
        userStore.userIsLoad = true
      }

      if(userStore.userIsLoad && productsLoaded.value) isLoad.value = false
       

  } catch (error) {
      if(userStore.userIsLoad){
        isLoad.value = false
      }else{
        err.value = true
      }
      
   
  }
 


    
})

onBeforeRouteLeave(() =>{
   useCartStore().addToBD()
})




</script>

<style>

body:has(.load-indicator),
body:has(.error) {
  overflow: hidden;
}


.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#__nuxt{
  height: 100vh;
}
.wrapper{
  display: flex;
  flex-direction: column;
  min-height: 100%;

}

.container{
  max-width: 1440px;
  padding: 0 30px;
  margin: 0 auto;
}



</style>