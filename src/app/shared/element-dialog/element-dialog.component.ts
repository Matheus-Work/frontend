import { Component, OnInit,Inject } from '@angular/core';
import { ProdutoElement } from 'src/models/ProdutoElement';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit{
  element!: ProdutoElement;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: ProdutoElement,
    public dialogRef: MatDialogRef<ElementDialogComponent>
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
