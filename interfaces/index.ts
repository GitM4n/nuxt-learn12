 interface IProducts {
    id:number,
    title:string,
    price:number,
    category:string,
    description:string,
    image:string,             
}

interface DBProducts {
    id:number,
    created_at:string,
    product_name:string,
    product_desc:string,
    product_total_count:number,
    product_price:number,  
    product_sale:number,
    product_img:string,               
}


interface IUser {
    id:number,
    email:string,
    created_at:string,
    age?:number | null
  }

export type {
    IProducts,
    DBProducts,
    IUser
}