import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ProdutoElementService } from 'src/app/services/produtoElement.service';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { ProdutoElement } from 'src/models/ProdutoElement';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ProdutoElementService]
})

export class HomeComponent implements OnInit{
  [x: string]: any;
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['position','titulo', 'preco', 'categoria', 'descricao', 'actions'];
  dataSource!:ProdutoElement[];

  constructor(
    public dialog: MatDialog,
    public produtoElementService:ProdutoElementService
    ){
      this.produtoElementService.getElements()
      .subscribe((data: ProdutoElement[]) =>{
        this.dataSource = data;
      });
    }
  ngOnInit(): void {
    // const _id = this.activatedRoute.snapshot.paramMap.get('_id')
  }
  openDialog(element: ProdutoElement | null): void{
      const dialogRef = this.dialog.open(ElementDialogComponent, {
        width: '250px',
        data: element === null ? {
          position:null,
          titulo:'',
          preco:null,
          categoria:'',
          descricao:''
        } : {
        _id:element._id,
        position:element.position,
        titulo:element.titulo,
        preco:element.preco,
        categoria:element.categoria,
        descricao:element.descricao
      } 
      });
  
  
      
      dialogRef.afterClosed().subscribe(result => {
        if(result !== undefined){
          console.log(result);
          if(this.dataSource.map(p => p._id).includes(result._id)){
            this.produtoElementService.editElement(result)
            .subscribe((data: ProdutoElement) => {
              const index = this.dataSource.findIndex(p => p._id === data._id);
              this.dataSource[index] = data;
              this.table.renderRows();
            })
          }else{
            this.produtoElementService.creteElements(result)
            .subscribe((data: ProdutoElement) => {
              this.dataSource.push(data);
              this.table.renderRows();
            });
          }
          
        }
      });
    }
      deleteElement(position: number): void {
        this.produtoElementService.deleteELement(position)
        .subscribe(()=> {
          this.dataSource = this.dataSource.filter(p => p._id !== position);
        });
      }
      editElement(element: ProdutoElement): void{
        this.openDialog(element);
      }
 }
