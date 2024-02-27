// https://nuxt.com/docs/api/configuration/nuxt-config

//uwP90z9o7RfcCDXc  supabase
//NUXT version last 3.9.1





export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
            '@nuxtjs/tailwindcss', 
            '@pinia/nuxt' 
          ],
  pinia:{
    storesDirs:['./stores/**', './custom-folder/stores/**']
  },
  runtimeConfig:{
    public:{
      supaurl:process.env.SUPABASE_URL,
      supakey:process.env.SUPABASE_KEY
    }
  },


})
