import { defineStore } from "pinia";
import {type DBProducts} from '../interfaces';
import {createClient} from '@supabase/supabase-js';


export interface ICart extends DBProducts {
  userId:number,
  count:number,
}

type Tbasket = {
  user_id:number, 
  product_id:number, 
  product_count:number
}



export const useCartStore = defineStore('cart', ()=>{
    const cfg = useRuntimeConfig().public
    const supabase = createClient(cfg.supaurl, cfg.supakey)
    const user = ref(JSON.parse(localStorage.getItem('user')!))

 
    const cart = ref<ICart[]>([])
    const basket = ref<Tbasket[]>([])

    function increaseProduct(product:DBProducts){
        if(!localStorage.getItem('user')){
            alert('Авторизуйтесь')
            return
        }

        const item = cart.value.find(obj => obj.id === product.id)
        if(item && item.count >= product.product_total_count - 1){
            item.count = product.product_total_count
            
        }else{
          if(item && item.count != 0 ){
            item.count ++
          }else{
          cart.value.push({...product, count:1, userId:user.value?.id})
          } 
        }

    }

    function decreaseProduct(product:DBProducts){
        if(!localStorage.getItem('user')){
            alert('Авторизуйтесь')
            return
        }
        const item = cart.value.find(obj => obj.id === product.id)
        const idx = cart.value.findIndex(obj => obj.id === product.id)
    
        if(item && item.count > 1){
             item.count-- 
          }else if (item && item.count <= 1 && idx !== -1){
            item.count--
            removeProduct(product.id)
          }

    }


    function removeProduct(id:number){
        const idx = cart.value.findIndex(obj => obj.id === id)
        cart.value.splice(idx, 1)
    }

    const totalPrice = computed(() => {
      return cart.value.reduce((acc, product) => {
          return acc + Math.trunc(product.product_price - product.product_price * product.product_sale / 100 ) * product.count
      }, 0)
  })


    



    async function checkAvailableProductFromCart(){
     
      console.log(basket.value)
      basket.value = (await supabase
                              .from('cart')
                              .select()
                              .eq('user_id', user.value.id)).data as Tbasket[]

      cart.value = (await supabase
                              .from('products')
                              .select()
                              .in('id', basket.value.map( product => product.product_id))).data as ICart[]


    
      cart.value.forEach(product => {
          const basketItem = basket.value.find(item => item.product_id === product.id);
          if (basketItem) {
                product.count = basketItem.product_count;
                product.userId = user.value.id
          }
      });


    }



    async function addToBD(){
      const productsToAdd = cart.value.filter(item => !basket.value.some(basketItem => basketItem.product_id === item.id)).map(({ userId, id, count }) => ({ user_id: userId, product_id: id, product_count: count }));
        
      const productsToUpdate = basket.value.filter(item => cart.value.some(cartItem => cartItem.id === item.product_id));
      productsToUpdate.forEach(product => {
        const cartItem = cart.value.find(item => item.id === product.product_id);
        if (cartItem) {
          product.product_count = cartItem.count;
        }
      });


      // Определение товаров, которые нужно удалить из базы данных
      const productsToDelete = basket.value.filter(item => !cart.value.some(product => product.id === item.product_id));

      // Удаление товаров из базы данных
      for (const productToDelete of productsToDelete) {
          await supabase.from('cart').delete().eq('user_id', productToDelete.user_id).eq('product_id', productToDelete.product_id);
      } 
        
        

      if(productsToUpdate && productsToUpdate.length > 0){
         const {data, error} = await supabase.from('cart').upsert(productsToUpdate, { onConflict: 'id' }).select()
         console.log(data, error)
      }

      const {data, error} = await supabase.from('cart').upsert(productsToAdd).select()
      console.log(data, error)
     
      

    }

 

    return {
        cart,
        increaseProduct,
        decreaseProduct,
        removeProduct,
        addToBD,
        checkAvailableProductFromCart,
        totalPrice,
        // calculateTotalPrice
        
       
    }
})

