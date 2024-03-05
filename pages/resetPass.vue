<template>
  <div>
    <form @submit.prevent="recoveryPass">
      <input type="text" name="respass" id="respass" v-model="respass">
      <button type="submit">сбросить пароль</button>
    </form>
 
  </div>
</template>

<script lang="ts" setup>
import { createClient } from '@supabase/supabase-js';
import { useMyUserStore } from '../stores/user';

const user = useMyUserStore()



const cfg = useRuntimeConfig().public

const supabase = createClient(cfg.supaurl, cfg.supakey)

const respass = ref('')

definePageMeta({
    middleware:'magic-link'
})

async function recoveryPass(){
    const { data, error } = await supabase.auth.updateUser({
                                                            email:'tech.chspu@inbox.ru',
                                                            password: respass.value
                                                          })

    console.log(await supabase.auth.getUser())
    if(error){
      throw error
    }

    await user.getUser()
    console.log(localStorage.getItem('user'))

    alert('Пароль изменен')
    localStorage.removeItem('magicLink')
    useRouter().push('/')


}


</script>

<style>

</style>