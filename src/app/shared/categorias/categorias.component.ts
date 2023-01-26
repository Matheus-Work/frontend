import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { CategoriaElement } from 'src/models/CategoriaElement';
import { CategoriaElementService } from 'src/app/services/categoriaElement.service';



// const CATEG_DATA: CategoriaElement[] = [
//   {id: 1, nome: 'Hydrogen', data_criacao: '2023-01-25', descricao_categoria: 'descricao 1'},
//   {id: 2, nome: 'Helium', data_criacao: '2023-01-24',  descricao_categoria: 'descricao 21'},
//   {id: 3, nome: 'Lithium', data_criacao: '2023-01-23',  descricao_categoria: 'descricao 152'},
//   {id: 4, nome: 'Beryllium', data_criacao: '2023/01/22',  descricao_categoria: 'descricao 15'},
//   {id: 5, nome: 'Boron', data_criacao: '2023/01/21', descricao_categoria: 'descricao 51'},
//   {id: 6, nome: 'Carbon', data_criacao: '2023/01/20', descricao_categoria: 'descricao 1-5'},
//   {id: 7, nome: 'Nitrogen', data_criacao: '2023/01/19', descricao_categoria: 'descricao 185'},
//   {id: 8, nome: 'Oxygen', data_criacao: '2023/01/18', descricao_categoria: 'descricao 19'},
//   {id: 9, nome: 'Fluorine', data_criacao: '2023-01-17', descricao_categoria: 'descricao 1+'},
//   {id: 10, nome: 'Neon', data_criacao: '2023-01-16',  descricao_categoria: 'descricao 1-'},
// ];


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
  providers: [CategoriaElementService]
})

export class CategoriasComponent implements OnInit{
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['nome', 'data_criacao', 'descricao_categoria', 'actions'];
  dataSource!: CategoriaElement[];

  constructor(
    public dialog: MatDialog,
    public categoriaElementService: CategoriaElementService
    ){
      this.categoriaElementService.getElements()
      .subscribe((data: CategoriaElement[]) => {
      this.dataSource = data;
    })
  }
 
  ngOnInit(): void {
  }
  openDialog(categ: CategoriaElement | null): void{
    const dialogRef = this.dialog.open(CategoriaElementService, {
      width: '250px',
      data: categ === null ? {
        nome:'',
        data_criacao:'',
        descricao_categoria:''
      } : {
      _id:categ._id,
      position:categ.position,
      nome:categ.nome,
      data:categ.data_criacao,
      descricao:categ.descricao_categoria
    } 
    });

  
    
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        console.log(result);
        if(this.dataSource.map(p => p._id).includes(result._id)){
          this.categoriaElementService.editElement(result)
          .subscribe((data: CategoriaElement) => {
            const index = this.dataSource.findIndex(p => p._id === data._id);
            this.dataSource[index] = data;
            this.table.renderRows();
          })
        }else{
          this.categoriaElementService.creteElement(result)
          .subscribe((data: CategoriaElement) => {
            this.dataSource.push(data);
            this.table.renderRows();
          });
        }
        
      }
    });
  }
    deleteElement(position: number): void {
      this.categoriaElementService.deleteElement(position)
      .subscribe(()=> {
        this.dataSource = this.dataSource.filter(p => p._id !== position);
      });
    }
    editElement(categ: CategoriaElement): void{
      this.openDialog(categ);
    }
  }