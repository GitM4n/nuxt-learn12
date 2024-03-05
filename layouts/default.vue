<template>
            <header class="header shadow-lg h-[60px] bg-green-500 ">
                <div class="container">
                   <div class="header__inner">
                        <NuxtLink to="/">
                            <div class="logo text-white font-mono font-bold text-3xl">
                                LOGO
                            </div>
                        </NuxtLink>
                        <div class="left-side">
                            <div class="items">
                                <NuxtLink to="/cartPage">
                                    <div class="cart-icon text-white font-mono font-bold text-3xl">
                                        КОРЗИНА
                                    </div>
                                </NuxtLink> 
                                <div class="account" ref="myAccount">
                                   <div class="account__inner" >  
                                         <div class="avatar">
                                            <img v-if="user" class="avatar__img" width="50" height="50" alt="profileImg" :src="user.avatar ? user.avatar : defaultAvatar">
                                            <p v-else class="account__text text-white font-mono font-bold text-3xl">АККАУНТ</p>
                                          
                                         </div>
                                        <Transition name="fade">
                                            <div class="account-hover" v-show="flag">
                                                <div class="account-hover__inner">
                                                    <userProfileCard v-if="user" />
                                                    <NuxtLink to="/auth" v-else>
                                                        <p class="account__login text-green-600 font-mono font-bold text-3xl cursor-pointer text-green-600">Войти</p>
                                                    </NuxtLink>
                                                </div>
                                            </div>
                                        </Transition>
                                    </div>
                                </div>
                            </div>
                        </div>
                   
                   </div>
                </div>
          
            </header>
            <main class="main">
                <slot />
            </main>
            <footer class="footer">
                <div class="container">
                    footer
                </div>
              
            </footer>
        

   

   
</template>

<script setup lang="ts">

import defaultAvatar from '~/public/img/defaultAvatar.png'
import userProfileCard from '~/components/UI/userProfileCard.vue';

import {useHoverEffect} from '~/composables/hoverEffect'



const user = ref(JSON.parse(localStorage.getItem('user')!))

const getuser = () => {
    console.log(localStorage.getItem('user'))
}
console.log(user.value)

const myAccount = ref<HTMLElement>() 

const {flag, hover} = useHoverEffect()

onMounted(()=>{

  hover(myAccount.value!)
})













</script>

<style>


.main{
    flex: 1 0 100%;
    position: relative;
   
}

.header__inner{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 5px;
}

.logo,
.cart-icon,
.account__text{
    position: relative;
    cursor: pointer;
}

.account{
    position: relative;
}

.logo:hover,
.account__text:hover,
.cart-icon:hover{
    text-shadow: 2px 2px 1px #00ff22, -2px 2px 1px #00ff22, -2px -2px 1px #00ff22, 2px -2px 1px #00ff22, 2px -2px 1px #00ff22;
}

.items{
    display: flex;
    align-items: center;
    gap: 20px;
}




.account-hover{
    position: absolute;
    z-index: 1;
    top: 100%;
    width: 200px;
    right: 0;
    padding: 30px;
    border: 2px solid green;
    border-radius: 10px;
    background-color: aliceblue;

}
.avatar__img{
    border-radius: 50%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.account-list__li:hover{
    text-decoration: underline;
}



</style>~/plugins/getUser