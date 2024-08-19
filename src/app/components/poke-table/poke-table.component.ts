import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonService } from 'src/app/services/pokemon.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {

  displayedColumns: string[] = ['position','image','name'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  pokemons = []
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private pokeService: PokemonService, private router:Router) { }
  
  ngOnInit(): void {
    this.getPokemons();
  }
  getPokemons()
  {
    let pokemonData;
    for(let i=1; i<=150; i++){
      this.pokeService.getPokemons(i).subscribe((res: any) =>{
        pokemonData = {
          position: i,
          image: res.sprites.front_default,
          name: res.name
        }
        //console.log("c " + JSON.stringify(res));
        this.data.push(pokemonData);
        this.dataSource = new MatTableDataSource<any>(this.data);
        this.dataSource.paginator = this.paginator;
        //console.log("----------------------------");
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(row:any)
  {
    console.log(row)
    this.router.navigateByUrl('pokeDetail/'+JSON.stringify(row.position));
  }
}