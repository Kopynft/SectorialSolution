import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subcategories } from 'src/app/Interfaces/subcategories';
import { SubcategoriesService } from 'src/app/Services/subcategories.service';

@Component({
  selector: 'app-subcategory-add-edit',
  templateUrl: './subcategory-add-edit.component.html',
  styleUrls: ['./subcategory-add-edit.component.css']
})
export class SubcategoryAddEditComponent implements OnInit {

  formSubcategory: FormGroup;
  titleAction: string = "Nueva Subcategoría";
  botonAction: string = "Guardar";
  listaSubcategories: Subcategories[] = [];

  constructor
  (
    private _dialogReference: MatDialogRef<SubcategoryAddEditComponent>,
    private _fb:FormBuilder,
    private _snackbar: MatSnackBar,
    private _SubcategoryService: SubcategoriesService
  )
  {
    this.formSubcategory = this._fb.group({
      id: ["",Validators.required ],
      name: ["", Validators.required],
      active: ["", Validators.required],
      categoriesid: ["", Validators.required]
    });

    this._SubcategoryService.getList().subscribe({
      next:(data) =>
      {
        this.listaSubcategories = data;
      },error:(e) => {}
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action,
      {
        horizontalPosition:"end",
        verticalPosition:"bottom",
        duration: 3000
      });
  }

  addeditSubcategory()
  {
    console.log(this.formSubcategory.value);

    const modelo: Subcategories = {
      id: this.formSubcategory.value.id,
      name: this.formSubcategory.value.name,
      active: this.formSubcategory.value.active,
      categoriesid: this.formSubcategory.value.categoriesid
    }

    this._SubcategoryService.add(modelo).subscribe({
      next:(data) =>
      {
        this.openSnackBar("Subcategoría fue creada","Listo");
        this._dialogReference.close("created");
      },error:(e) =>
      {
        this.openSnackBar("No se pudo crear","Error");
      }
    })
  }

  ngOnInit(): void {
  }

}
