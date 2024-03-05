<template>
    <div class='sign-up'>
        <form action="#" @submit.prevent="sendData">
        <legend class="text-2xl text-green-600 font-semibold">РЕГИСТРАЦИЯ</legend>
            <hr>
            <div class="input-email">
                <label for="email">ПОЧТА</label>
                <input type="text" name="email" id="email" v-model="dataS.email">
            </div>
            <div class="input-password">
                <label for="password">ПАРОЛЬ</label>
                <input type="password" name="password" id="password" placeholder="Пароль от 6 символов" minlength="6"  v-model="dataS.password">
            </div>
            <button class="send" type="submit">ОТПРАВИТЬ</button>
        </form>

    </div>
</template>

<script setup lang="ts">

import { createClient } from '@supabase/supabase-js';
import { useMyUserStore } from '~/stores/user';
const cfg = useRuntimeConfig().public
const supabase = createClient(cfg.supaurl, cfg.supakey)

const dataS = ref({
    email:'',
    password:''
})

async function sendData(){
    const validMail = /^\S+@\S+\.\S+$/.test(dataS.value.email)
if(validMail){
    const { data, error } = await supabase.auth.signUp({
            email: dataS.value.email,
            password:  dataS.value.password
        })

    if(!error){
      
        await supabase.from('users').insert(
            {
                email:dataS.value.email,
                name: 'Пользователь ' +  Math.random().toString(36).substring(7)
            
            },
       )

        await useMyUserStore().getUser()
        alert('Регистрация прошла успешно')
        await navigateTo('/')
        location.reload()
    }else if(error){
        throw error
        
    }else{
        alert('Такой пользователь уже существует')
    }
}else{
    alert('Некорректная почта')
}
    
}

</script>

<style scoped>
.sign-up{
    max-width: 600px;
    margin: 0 auto;
 
}

input{
    outline: 2px solid green;
}

form{
    display: flex;
    flex-direction: column;
    gap:10px;
}

.input-email,
.input-password{
    display: flex;
    gap: 5px;
}

.send{
    max-width: 300px;
    border: 1px solid green;
    border-radius: 5px;
    background-color: white;
    padding: 10px;
    transition: all .3s ease;
}
.send:hover{
    color: white;
    background-color: green;
}


</style>