<template>
  <div class="user-profile">
      <div class="user-profile__inner">
        <ul class="user-lists">
          <NuxtLink to="/lk">
            <li class="user-list__li text-green-600 hover:text-green-400">Личный кабинет</li>
          </NuxtLink>
          <li class="user-list__li text-red-600 hover:text-red-400" @click="signOut">Выход</li>
      </ul>
      </div>
  </div>
</template>

<script lang="ts" setup>
import {useMyUserStore} from '~/stores/user'

const {signOut} = useMyUserStore()
</script>

<style scoped>
.user-list__li{
  cursor: pointer;
}
</style>