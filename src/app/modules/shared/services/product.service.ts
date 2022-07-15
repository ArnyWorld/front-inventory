import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /*
    get All products
  */
  getProducts(){
    const endPoint = `${base_url}/products`;
    return this.http.get(endPoint);
  }

  /*
    save the product
  */
  saveProduct(body:any){
    const endpoint = `${base_url}/products`;
    return this.http.post(endpoint, body);
  }

  /**
   * updaate the product
   */
  updateProduct(body:any, id:number){
    const endpoint = `${base_url}/products/${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   * Delete the product
   */

   deleteProduct(id:number){
    const endpoint = `${base_url}/products/${id}`;
    return this.http.delete(endpoint);
   }

   /**
    * search by name
    */
    getProductByName(name:any){
      const endpoint = `${base_url}/products/filter/${name}`;
      return this.http.get(endpoint);
    }

     /**
   * Export excel categories 
   */

  exportProduct(){
    const endpoint = `${base_url}/products/export/excel`;
    return this.http.get(endpoint,{
      responseType:'blob'
    });
  }

}
