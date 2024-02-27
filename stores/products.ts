import { defineStore } from 'pinia'
import {type DBProducts} from '../interfaces'
import { createClient } from '@supabase/supabase-js';




export const useMyProductsStore = defineStore('products', () =>{
  const cfg = useRuntimeConfig().public
  const supabase = createClient(cfg.supaurl, cfg.supakey)

  const products = ref<DBProducts[]>([])
  const productsCount = ref<number>(0)
 

  async function getProducts(currentPage:number = 1, limit:number = 9) {
      const min =  (currentPage - 1) * limit;
      const max = min + limit;
      const productsLoaded = ref(false)

      await getProductsCount()

      const {data, error} = await supabase
                             .from('products')
                             .select()
                             .gte('id', min)
                             .lte('id', max)
                             .order('id')
                             .limit(Number(limit))
  
      products.value = data as DBProducts[]
      productsLoaded.value = true

      return {productsLoaded, error}

  }

  async function getProductsCount () {
      const {count, error} = await supabase
                              .from('products')
                              .select('*', { count: 'exact', head: true })
      if(error){
        throw error
      }

      productsCount.value = count || 0
  }

   function calculatePages(limitPage:number = 9) {
      return Math.ceil(productsCount.value / limitPage)
  }





  return  {
    products,
    getProducts,
    productsCount,
    calculatePages,
  }
})
