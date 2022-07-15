import { Component, OnInit } from '@angular/core';
import { ProductElement } from 'src/app/modules/product/product/product.component';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chartBar:any;
  chartDoughnut:any;

  constructor(private _productService:ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this._productService.getProducts()
    .subscribe((data:any)=>{
      console.log("Respuesta de productos: ", data);
      this.processProductResponse(data);
    }, (error:any)=>{
      console.log("Error en Productos: ", error)
    })
  }

  processProductResponse(resp:any){

    const nameProduct:String[]=[];
    const account:number[] = [];

    if(resp.metadata[0].code =="00"){
      let listCProduct = resp.product.products;

      listCProduct.forEach((element:ProductElement)=>{
        nameProduct.push(element.name);
        account.push(element.account);
      });
      //Nuestro gráfico de barras
      this.chartBar = new Chart('canvas-bar',{
        type:'bar',
        data:{
          labels:nameProduct,
          datasets:[
            {
              label: 'Productos', data:account
            }
          ]
        }
      });

      //nuestro gráfico de doughnut
      this.chartDoughnut = new Chart('canvas-doughnut',{
        type:'doughnut',
        data:{
          labels:nameProduct,
          datasets:[
            {
              label: 'Productos', data:account
            }
          ]
        }
      });

  }

}
}
