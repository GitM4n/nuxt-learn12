import { defineStore } from 'pinia'
import type { IUser } from '../interfaces'
import { createClient } from '@supabase/supabase-js';

export const useMyUserStore = defineStore('user', () => {
  const user = ref<IUser | null>(null)
  const cfg = useRuntimeConfig().public;
  const supabase = createClient(cfg.supaurl, cfg.supakey);

  const userIsLoad = ref<boolean>(false)



    async function getUser () {
      const userMail = (await supabase.auth.getUser()).data.user?.email;
      console.log(userMail)
      if (userMail) {
        const { data, error } = await supabase
                                            .from('users')
                                            .select()
                                            .eq('email', userMail)
                                            .single();
  
        if(error){
          throw new Error('Error getting user');
        }

        user.value = data
        localStorage.setItem('user', JSON.stringify(data))
        userIsLoad.value = true
      
      }else{
        userIsLoad.value = true
        console.log(userIsLoad.value)
        throw new Error ('No user found');
      }
      
      

    }



    async function signOut(){
       localStorage.removeItem('user')
       await supabase.auth.signOut();
       alert('Вы вышли из системы')
       location.reload()
    }




  


    return {
      userIsLoad,
      getUser,
      signOut,
      user
    };
 

})
