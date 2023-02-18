import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Categories } from 'src/app/Interfaces/categories';
import { CategoriesService } from 'src/app/Services/categories.service';

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css']
})
export class DialogAddEditComponent implements OnInit {

  formCategory: FormGroup;
  titleAction: string = "Nueva Categoría";
  botonAction: string = "Guardar";
  listaCategories: Categories[] = [];

  constructor
  (
    private _dialogReference: MatDialogRef<DialogAddEditComponent>,
    private _fb:FormBuilder,
    private _snackbar: MatSnackBar,
    private _CategoryService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public dataSource: Categories
  )
  {
    this.formCategory = this._fb.group({
      id: ["",Validators.required ],
      name: ["", Validators.required],
      active: ["", Validators.required]
    });

    this._CategoryService.getList().subscribe({
      next:(data) =>
      {
        this.listaCategories = data;
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

  addeditCategory()
  {

    const modelo: Categories = {
      id: this.formCategory.value.id,
      name: this.formCategory.value.name,
      active: this.formCategory.value.active
    }

    this._CategoryService.add(modelo).subscribe({
      next:(data) =>
      {
        this.openSnackBar("Categoría fue creada","Listo");
        this._dialogReference.close("created");
      },error:(e) =>
      {
        this.openSnackBar("No se pudo crear","Error");
      }
    })
  }

  ngOnInit(): void
  {
    
  }

}
