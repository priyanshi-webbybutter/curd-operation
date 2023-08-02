import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import  { MatDialogRef ,  MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
 
  freshnessList = ["Brand New" , "second Hand", "Refurbished"]
  productForm !: FormGroup; 
  actionbtn : string = "save"
  constructor(private formbuilder : FormBuilder,
     private api : ApiService,
     @Inject(MAT_DIALOG_DATA) public editData : any,  
      private dialogRef : MatDialogRef<DialogComponent>){}

  ngOnInit():void{
    this.productForm = this.formbuilder.group({
      productName : ['',Validators.required],
      Category : ['', Validators.required],
      freshness : ['', Validators.required],
      price: ['', Validators.required],
      comment : ['', Validators.required],
      date: ['', Validators.required],
    });

   if(this.editData){
    this.actionbtn = "update";
    this.productForm.controls['productName'].setValue(this.editData.productName);
    this.productForm.controls['Category'].setValue(this.editData.Category);
    this.productForm.controls['date'].setValue(this.editData.date);
    this.productForm.controls['freshness'].setValue(this.editData.freshness);
    this.productForm.controls['price'].setValue(this.editData.price);
    this.productForm.controls['comment'].setValue(this.editData.comment);
   }

  }
 
  AddProduct(){
  if(!this.editData){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next:(res)=>{
          alert("product added successfully");
          this.productForm.reset();
          this.dialogRef.close('saved');
    
        },
        error:()=>{
          alert("error while adding the product")
        }
      })
     }
  }else{
    this.upadateProduct()
  }
  }
  upadateProduct(){
      this.api.putProduct(this.productForm.value,this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("product updated successfully");
           this.productForm.reset();
           this.dialogRef.close('update');
        },
        error:()=>{
           alert("Error while updating the record !!")
        }
        
      })
  }

}
