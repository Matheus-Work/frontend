import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {  CategoriaElement } from 'src/models/CategoriaElement';

@Component({
  selector: 'app-categoria-dialog',
  templateUrl: './categoria-dialog.component.html',
  styleUrls: ['./categoria-dialog.component.scss']
})

export class CategoriaDialogComponent implements OnInit{
  categ!: CategoriaElement;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: CategoriaElement,
    public dialogRef: MatDialogRef<CategoriaDialogComponent>
    ) {}
  ngOnInit(): void {
    if(this.data.position != null){
      this.isChange = true;
    }else {
      this.isChange = false;
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}

