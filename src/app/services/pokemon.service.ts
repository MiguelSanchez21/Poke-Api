import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService{


  constructor(private http:HttpClient)
  {

  }

  getPokemons(index: any)
  {
    //index = JSON.stringify(index);
    //console.log("index"+index)
    return this.http.get('https://pokeapi.co/api/v2/pokemon/'+index);
  }
}
