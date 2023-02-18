import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Topics } from 'src/app/Interfaces/topics';
import { TopicsService } from 'src/app/Services/topics.service';

@Component({
  selector: 'app-topic-add-edit',
  templateUrl: './topic-add-edit.component.html',
  styleUrls: ['./topic-add-edit.component.css']
})
export class TopicAddEditComponent implements OnInit {

  formTopic: FormGroup;
  titleAction: string = "Nuevo Tema";
  botonAction: string = "Guardar";
  listaTopics: Topics[] = [];

  constructor
  (
    private _dialogReference: MatDialogRef<TopicAddEditComponent>,
    private _fb:FormBuilder,
    private _snackbar: MatSnackBar,
    private _TopicService: TopicsService,
  )
  {
    this.formTopic = this._fb.group({
      id: ["",Validators.required ],
      name: ["", Validators.required],
      active: ["", Validators.required],
      subcategoriesid:["", Validators.required]
    });

    this._TopicService.getList().subscribe({
      next:(data) =>
      {
        this.listaTopics = data;
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

  addeditTopic()
  {
    console.log(this.formTopic.value);

    const modelo: Topics = {
      id: this.formTopic.value.id,
      name: this.formTopic.value.name,
      active: this.formTopic.value.active,
      subcategoriesid: this.formTopic.value.subcategoriesid
    }

    this._TopicService.add(modelo).subscribe({
      next:(data) =>
      {
        this.openSnackBar("Tema fue creado","Listo");
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
