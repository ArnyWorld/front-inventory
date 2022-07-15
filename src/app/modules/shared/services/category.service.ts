import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  /**
   * get All Categories 
   */

  getCategories(){
    const endpoint = `${base_url}/categories`;
    return this.http.get(endpoint);
  }

  /**
   * Save the categories
   */
  saveCategorie(body:any){
    const endpoint = `${base_url}/categories`;
    return this.http.post(endpoint, body);
  }

  /**
   * update the categories
   */

  updateCategorie(body:any, id:any){
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.put(endpoint, body);
  }

    /**
   * delete the category
   */

     deleteCategorie(id:any){
      const endpoint = `${base_url}/categories/${id}`;
      return this.http.delete(endpoint);
    }

      /**
   * get category by ID
   */

       getCategorieById(id:any){
        const endpoint = `${base_url}/categories/${id}`;
        return this.http.get(endpoint);
      }

 /**
   * Export excel categories 
   */

  exportCategories(){
    const endpoint = `${base_url}/categories/export/excel`;
    return this.http.get(endpoint,{
      responseType:'blob'
    });
  }

}
