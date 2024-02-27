 export default defineNuxtRouteMiddleware((to, from) => {
  if(process.client){
      console.log(localStorage.getItem('magicLink'))
      console.log(to.query.magicLink)
      if(to.query.magicLink !== localStorage.getItem('magicLink') ){
        return navigateTo('/')
      }
  }
  
})
