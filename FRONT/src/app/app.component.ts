import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Categories } from './Interfaces/categories';
import { CategoriesService } from './Services/categories.service';

import { Subcategories } from './Interfaces/subcategories';
import { SubcategoriesService } from './Services/subcategories.service';

import { Topics } from './Interfaces/topics';
import { TopicsService } from './Services/topics.service';

import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';
import { SubcategoryAddEditComponent } from './Dialogs/subcategory-add-edit/subcategory-add-edit.component';
import { TopicAddEditComponent } from './Dialogs/topic-add-edit/topic-add-edit.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit, OnInit {
  title = 'FRONT';

  displayedColumns: string[] = ['id', 'name', 'active', 'actions'];
  dataSource = new MatTableDataSource<Categories>();

  displayedColumns2: string[] = ['id', 'name', 'active', 'categoriesid', 'actions'];
  dataSource2 = new MatTableDataSource<Subcategories>();

  displayedColumns3: string[] = ['id', 'name', 'active', 'subcategoriesid', 'actions'];
  dataSource3 = new MatTableDataSource<Topics>();

  constructor
  (
    private _CategoryService:CategoriesService,
    private _SubcategoryService:SubcategoriesService,
    private _TopicService:TopicsService,
    public dialog: MatDialog,
    private _snackbar: MatSnackBar,
  )
  {}

  openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action,
      {
        horizontalPosition:"end",
        verticalPosition:"bottom",
        duration: 3000
      });
  }

  ngOnInit(): void
  {
    this.getCategories();
    this.getSubcategories();
    this.getTopics();
  }

  getCategories(): void
  {
    this._CategoryService.getList().subscribe({
      next:(data) => {
        this.dataSource.data = data;
      },error:(e) => {}
    });
  }

  getSubcategories(): void
  {
    this._SubcategoryService.getList().subscribe({
      next:(data) => {
        this.dataSource2.data = data;
      },error:(e) => {}
    });
  }

  getTopics(): void
  {
    this._TopicService.getList().subscribe({
      next:(data) => {
        this.dataSource3.data = data;
      },error:(e) => {}
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    this.dialog.open(DialogAddEditComponent, 
      {
        disableClose: true,
        width:"350px",
      }).afterClosed().subscribe(result =>
        {
          if (result === "created")
          {
            this.getCategories();
          }
        });
  }

  openDialog2() {
    this.dialog.open(SubcategoryAddEditComponent,
      {
        disableClose: true,
        width:"350px",
      }).afterClosed().subscribe(result =>
        {
          if (result === "created")
          {
            this.getSubcategories();
          }
        });
  }

  openDialog3() {
    this.dialog.open(TopicAddEditComponent,
      {
        disableClose: true,
        width:"350px",
      }).afterClosed().subscribe(result =>
        {
          if (result === "created")
          {
            this.getTopics();
          }
        });
  }

  swapStateCategory(modelo:Categories)
  {
    this._CategoryService.swapState(modelo).subscribe({
      next:(data) =>
      {
        this.openSnackBar("Categoría fue actualizada","Listo");
      },error:(e) =>
      {
        this.openSnackBar("No se pudo actualizar","Error");
      }
    })
  }

  swapStateSubcategory(modelo:Subcategories)
  {
    console.log(modelo)
    this._SubcategoryService.swapState(modelo).subscribe({
      next:(data) =>
      {
        this.openSnackBar("Subcategoría fue actualizada","Listo");
      },error:(e) =>
      {
        this.openSnackBar("No se pudo actualizar","Error");
      }
    })
  }

  swapStateTopic(modelo:Topics)
  {
    this._TopicService.swapState(modelo).subscribe({
      next:(data) =>
      {
        this.openSnackBar("Tema fue actualizada","Listo");
      },error:(e) =>
      {
        this.openSnackBar("No se pudo actualizar","Error");
      }
    })
  }

  deleteCategory(modelo:Categories)
  {
    this._CategoryService.deleteCategory(modelo.id).subscribe({
      next:(data) =>
      {
        this.openSnackBar("categoría fue eliminada","Listo");
        this.getCategories();
      },error:(e) =>
      {
        this.openSnackBar("No se pudo eliminar","Error");
      }
    })
  }

  deleteSubcategory(modelo:Subcategories)
  {
    this._SubcategoryService.deleteSubcategory(modelo.id).subscribe({
      next:(data) =>
      {
        this.openSnackBar("categoría fue eliminada","Listo");
        this.getSubcategories();
      },error:(e) =>
      {
        this.openSnackBar("No se pudo eliminar","Error");
      }
    })
  }

  deleteTopic(modelo:Categories)
  {
    this._TopicService.deleteTopic(modelo.id).subscribe({
      next:(data) =>
      {
        this.openSnackBar("categoría fue eliminada","Listo");
        this.getTopics();
      },error:(e) =>
      {
        this.openSnackBar("No se pudo eliminar","Error");
      }
    })
  }
}