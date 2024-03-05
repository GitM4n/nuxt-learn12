<template>
  <div class="lk">
      <div class="lk__navbar">
          <ul class="nav__lists font-mono font-medium text-2xl">
              <li class="nav__list" v-for="list, idx in lists" :style="{color: activeIdx === idx ? 'green' : ''}" @click="activeIdx = idx">
                  {{ list }}
              </li>
            
          </ul>
      </div>
      <div class="lk__content_wrapper">
          <div class="lk__content" v-for="content, id in contents">
              <component :is="content" v-show="activeIdx === id"></component>
          </div>
      </div>
        
  </div>
</template>

<script lang="ts" setup>
import profileComponent from '~/components/profileComponent.vue';

const lists = [
  'Профиль',
  '...',
  '...',
  '...',
  '...',
  '...',
  '...',
]

const contents = [
  profileComponent,
]

const activeIdx = ref(0)




</script>

<style>
.lk{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: grid;
  grid-template-columns: 1fr 6fr;
  
  
}

.lk__navbar{
  padding: 40px 20px;
  border-right: 1px solid #000;
}

.nav__list{
   margin-bottom: 30px;
   cursor: pointer;
}


.lk__content{
  padding: 40px 20px;
}
</style>