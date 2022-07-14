import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';
import { NewProductComponent } from '../new-product/new-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private _productService:ProductService, public dialog:MatDialog, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.getProducts();
  }

  displayedColumns:string[]=['id','name','price','account','category','picture','actions'];
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

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
    const dateProduct: ProductElement[] = [];
    if(resp.metadata[0].code =="00"){
      let listCProduct = resp.product.products;

      listCProduct.forEach((element:ProductElement)=>{
        // element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,'+ element.picture;
        dateProduct.push(element);
      })
      //Set  the dataSource
      this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator = this.paginator;
    }

  }

  openProductDialog(){
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Producto agregado","Exitosa");
        this.getProducts();
      }else if(result ==2){
        this.openSnackBar("Se produjo un error al guardar producto","Error")
      }
    });
  }

  openSnackBar(message:string, action:string):MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action,{
      duration:2000  
    })
  }

  edit(id:number, name:string, price:number, account:number, category:any){
    const dialogRef = this.dialog.open(NewProductComponent,{
      width:'450px',
      data:{id, name, price, account, category}
    })
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Producto editado","Exitosa");
        this.getProducts();
      }else if(result ==2){
        this.openSnackBar("Se produjo un error al editar producto","Error")
      }
    });
  }
  
}


export interface ProductElement{
  id:number;
  name:string;
  price:number;
  account:number;
  category:any;
  picture:any;
}