<template>
  <div class="profile">
    <div class="isBirthday" v-show="isBirthDay">
      <p class="isBirthday__text text-red-600 font-mono font-bold text-3xl">Сегодня день рождения!</p>
    </div>
    <div class="profile__inner">
    <form action="#" class="profile__form" @submit.prevent>
        <div class="profile__avatar">
          <p class="profile__avatar_title font-bold mb-2">Фон профиля</p>
          <div class="profile__avatar_wrapper" @click="onPickFile">
            <div class="profile__avatar_btn">Изменить</div>
            <img class="profile__avatar_img" alt="profileImg" :src="user_data.avatar ? user_data.avatar : defaultAvatar" >
          </div>
        
          <input
            type="file"
            style="display: none"
            ref="fileInputRef"
            accept="image/*"
            @change="onFilePicked($event)"/>
       </div>
      <fieldset class="profile__data">
          <legend class="font-bold text-2xl">Личные данные</legend>
          <div class="input__nickname">
            <label for="nickname">Никнейм</label>
            <input type="text" name="nickname" id="nickname" v-model="user_data.name">
          </div>
          <div class="input__birthday">
            <label for="birthday">Дата рождения</label>
            <input type="date" name="birthday" id="birthday" v-model="user_data.birthday" >
          </div> 
          <div class="email">
              <p class="email__text"><span>Почта:</span> {{ user_data.email }}</p>
          </div> 
          <div class="age">
              <p class="age__text"><span>Возраст:</span> {{ user_data.age ? user_data.age + 'лет' : 'неизвестно' }} </p>
          </div>
       </fieldset>
      <button @click="updateUser()" type="submit" class="profile__btn">Сохранить изменения</button>
      </form>
     
       
       
    </div>
  </div>
</template>

<script lang="ts" setup>
import defaultAvatar from '~/public/img/defaultAvatar.png'
import type { IUser } from '../interfaces'
import { useMyUserStore } from '~/stores/user';



const userStore = useMyUserStore()
const fileInputRef: Ref<HTMLInputElement | null> = ref(null)
const file = ref()


const user_data = ref<IUser>({
  id: userStore.user?.id ?? 0,
  email: userStore.user?.email ?? '',
  created_at: userStore.user?.created_at ?? '',
  name:userStore.user?.name ?? '',
  age: userStore.user?.age ?? null,
  birthday: userStore.user?.birthday ?? '',
  avatar:userStore.user?.avatar ?? ''
})

const isBirthDay = ref(false)


const getDate = () => {

  if(!user_data.value?.birthday){
     return
  }

  const userDate = {
    Y: new Date(user_data.value.birthday).getFullYear(),
    M: new Date(user_data.value.birthday).getMonth(),
    D: new Date(user_data.value.birthday).getDate(),
  }
  const now = {
    Y: new Date().getFullYear(),
    M: new Date().getMonth(),
    D: new Date().getDate(),
  }

  const d = userDate.Y - now.Y 
  const m = computed(() => d < 0 ? now.M - userDate.M - 1 : now.M - userDate.M)
  const age = computed(() => m.value < 0 ? now.Y - userDate.Y - 1 : now.Y - userDate.Y)

  if(age.value) user_data.value.age = age.value

  if(JSON.stringify(userDate) == JSON.stringify(now)){
      isBirthDay.value = true
  }
}


const updateUser = async () => {
  getDate()
  if(file.value) user_data.value.avatar = await userStore.changeAvatar(file.value) ?? user_data.value.avatar
  const data = await userStore.updateUser(user_data.value)
  if(data){
    alert('Данные обновлены')
  }else{
    alert('Что то пошло не так')
  }

  location.reload()
}


const onPickFile = () => {
  console.log(fileInputRef.value)
  if(fileInputRef.value) fileInputRef.value.click()
}

const onFilePicked = (event:Event) => {
      const eventTarget = event.target as HTMLInputElement
      const files = eventTarget.files
      if(files){
        file.value = files[0]
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          user_data.value.avatar = fileReader.result as string 
        })
        fileReader.readAsDataURL(files[0])
        
        
      }

      
}



</script>

<style scoped>

.isBirthday{
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  border: 2px solid green;
  border-radius: 10px;
  
}
label{
  font-weight: 700;
}

.profile__avatar{
  margin-bottom: 30px;
}

.profile__avatar_wrapper{
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
}

.profile__avatar_wrapper::after{
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(rgba(148, 148, 148, 0.596), rgba(63, 63, 63, 0.5));
  opacity: 0;
  transition: opacity 0.5s ease;
  cursor: pointer;
}

.profile__avatar_wrapper:hover::after,
.profile__avatar_wrapper:hover .profile__avatar_btn{
  opacity: 1;
 
}

.profile__avatar_img{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.profile__avatar_btn{
  transition: opacity 0.5s ease;
  opacity: 0;
  z-index: 2;
  position: absolute;
  bottom: 10px;
  color: #ffffff;
  font-weight: 600;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  
}








.profile__data{
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.profile__form{
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input__nickname,
.input__birthday,
.age{
  display: flex;
  flex-direction: column;
  gap: 5px;
}



.age__text span,
.email__text span{
  font-weight: 700;
}








input{
  outline: none;
  max-width: 300px;
  border: 2px solid green;
  border-radius: 10px;
  padding: 5px 10px;
}

input:focus{
  border: 2px solid red;
}


input[type='date']{
  max-width: 150px;
}


.profile__btn{
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background-color: green;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 300px;
}

.profile__btn:hover{
  background-color: rgb(240, 236, 236);
  color: green;
}



@media (max-width: 900px) {
  .profile__avatar_btn{
    opacity: 1;
    background-color: black;
    width: 100%;
    height: 30%;
    top: 90%;
    text-align: center;
    
  }
}


</style>
