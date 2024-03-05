import { defineStore } from 'pinia'
import type { IUser } from '../interfaces'
import { createClient } from '@supabase/supabase-js';

export const useMyUserStore = defineStore('user', () => {
  const user = ref<IUser | null>()
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

    const updateUser = async (payload: IUser) => {
      
     
      console.log(user.value?.avatar)
      const {data, error} = await supabase.from('users').update(payload).eq('id', user.value?.id).select()

      if(error){
        throw new Error(error.message)
      }

      user.value = payload
      localStorage.setItem('user', JSON.stringify(payload))
      console.log(data)
      return data
     
      
    }

    const changeAvatar = async(file:File) => {
      const filePath = user.value?.id + '/' + file.name;
      const { data:storageData, error:storageError } = await supabase
                                                                    .storage
                                                                    .from('user')
                                                                    .upload(filePath, file,{upsert:true})
        
        
      if (storageError) throw new Error(storageError.message)

      console.log(storageData)

      const { data:imgUrl, error:imgError } = await supabase 
                                          .storage
                                          .from('user')
                                          .createSignedUrl(filePath, 31536000)
 
      if(imgError) throw new Error(imgError.message)
      
       return imgUrl.signedUrl
      
      
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
      updateUser,
      changeAvatar,
      user
    };
 

})
