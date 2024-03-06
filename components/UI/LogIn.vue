<template>
   
    <div class='login'>
    <form action="#" @submit.prevent="isReset ? sendResetPass() : login()">
            <legend class="text-2xl text-green-600 font-semibold">ВХОД</legend>
            <hr>
            <div class="input-email">
                <label for="email">ПОЧТА</label>
                <input type="email" name="email" id="email" v-model="dataS.email">
            </div>
            <div class="input-password" v-if="!isReset">
                <label for="password">ПАРОЛЬ</label>
                <input type="password" name="password" id="password"  v-model="dataS.password">
            </div>
            <button class="send" type="submit" v-text="isReset ? 'Отправить запрос на восстановление' : 'Войти'"></button>
        </form>

        <div class="reset-pass">
            <button class="send" type="submit" v-text="isReset ? 'Вернуться' : 'Восстановить пароль'" @click="isReset = !isReset"></button>
        </div>

    </div>
</template>

<script setup lang="ts">
import { createClient } from '@supabase/supabase-js';
import { useMyUserStore } from '~/stores/user';


const cfg = useRuntimeConfig().public
const supabase = createClient(cfg.supaurl, cfg.supakey)
const isReset = ref(false)  
const status = ref()

const dataS = ref({
    email:'',
    password:''
})

async function login(){
try {
    status.value = 'В процессе...'
    const user = await supabase.auth.getUser()
    status.value = 'Проверка валидности...'
    const email = await supabase.from('users').select().filter('email', 'eq', dataS.value.email)
   
    if(email.data![0]){
        const { data, error } = await supabase.auth.signInWithPassword({
            email: dataS.value.email.toLocaleLowerCase(),
            password:  dataS.value.password
        })

        console.log(data)
      
        if(error){
            throw new Error(error.message)
        }
        await useMyUserStore().getUser()
        alert('Вы вошли в систему')
        status.value = 'Вы вошли в систему'
        await navigateTo('/')
        location.reload()
      


    }else if(user.data.user){
        alert('Вы уже в системе')
        status.value = 'Вы уже в системе'
    }else if(email.data?.length === 0){
        alert('Такого пользователя не существует')
        status.value = 'Такого пользователя не существует'
    }else{
        console.log(email.data, dataS.value, user.data.user)
        alert('Неверный пароль')
        status.value = 'Неверный пароль'

    }
} catch (error) {
    status.value = error
    throw error
}
 
   
}


async function sendResetPass() {

    const email = await supabase.from('users').select().filter('email', 'eq', dataS.value.email)
   
    if(email.data?.length === 0){
        alert('Такого пользователя не существует')
        throw new Error('Такого пользователя не существует')
    }

    const magiclink = Math.random().toString(36).substring(7)
    const {data, error} = await supabase.auth.resetPasswordForEmail(dataS.value.email, {
        redirectTo:'http://localhost:3000/resetPass?magicLink=' + magiclink
    })

    if (error){
        throw error
    }
    localStorage.setItem('magicLink', magiclink)
    alert('Ссылка для восстановления пароля отправлена на почту')

    console.log(data, error)

}
</script>

<style scoped>

.login{
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


.reset-pass{
  
    margin-top: 20px;
    
}





</style>