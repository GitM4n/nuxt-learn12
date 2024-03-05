import {useCartStore} from '~/stores/cart'


export default defineNuxtRouteMiddleware(async (to, from) => {
   if(process.client){

      if(!localStorage.getItem('user')){
         switch (to.path) {
            case '/cartPage':
               alert('Авторизуйтесь')
               return navigateTo('/')
            case '/lk':
               alert('Авторизуйтесь')
               return navigateTo('/')
          
         }
      }else{
         switch (to.path) {
            case '/auth':
               alert('Вы уже в системе')
               return navigateTo('/')
            
         }
      }

      if(from.path === '/' || from.path === '/cartPage'){
         await useCartStore().addToBD()
      }
    
     
    
   }
 
  
})
