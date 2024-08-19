import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent implements OnInit {

  pokemon: any = '';
  pokemonType = [];
  pokemonImg = '';
  constructor(private pokemonService: PokemonService, private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params.subscribe((params: any) =>{
      this.getPokemon(params['id']);
    });
  }

  ngOnInit(): void {
  }

  getPokemon(id: any)
  {
    console.log(id+":D")
    this.pokemonService.getPokemons(id).subscribe((res: any) =>{
      this.pokemon = res;
      this.pokemonImg = this.pokemon.sprites.front_default;
      this.pokemonType = this.pokemon.types[0].type.name;
      res = JSON.stringify(res);
      console.log("v"+res)
    });
  }
}