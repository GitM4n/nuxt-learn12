<template>
    <div class="auth text-center text-3xl text-green-600 font-bold">
        <h1>АВТОРИЗАЦИЯ</h1>
    </div>
    <div class="tabs-auth">
        <div class="tabs-auth__titles">
        <button class="sign-up" @click="flag = true" :class="flag ? 'active' : ''">РЕГИСТРАЦИЯ</button>
            <button class="login" @click="flag = false" :class="!flag ? 'active' : ''">ВХОД</button>
        </div>
        <div class="tabs-auth__inner">
            <SignUp v-if="flag" />
            <LogIn v-else />
        </div>



    </div>
   
    <div v-if="user"> 
        <button class="sign-out" @click="signOut">ВЫХОД</button>
        <br>
        <button class="check">CHECK USER</button>
    </div>    
   





   

</template>

<script setup lang="ts">

import { createClient } from '@supabase/supabase-js';


const cfg = useRuntimeConfig().public;
const supabase = createClient(cfg.supaurl, cfg.supakey);
const user = localStorage.getItem('user')




async function signOut(){
    
  localStorage.removeItem('user')
  await supabase.auth.signOut()
  alert('Вы вышли из системы')
}




import SignUp from '~/components/UI/SignUp.vue';
import LogIn from '~/components/UI/LogIn.vue';

const flag = ref(false)




</script>

<style scoped>




.sign-up,
.login{
    padding: 20px 40px;
    border: 2px solid green;
}



.active{
    background: green;
    color: white;
}



.tabs-auth{
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
}

.tabs-auth__titles{
    display: flex;
    justify-content: center;
}



.sign-out{
    padding: 10px 20px;
    border: 2px solid red;
    transition: all .3s ease;
}




.sign-out:hover{
    background: red;
    color: white;

}


.check{
    padding: 10px 20px;
    border: 2px solid blue;
    transition: all .3s ease;
}

.check:hover{
    background: blue;
    color: white;
}

</style>../plugins/getUser../composables/getUser../plugins/getUser