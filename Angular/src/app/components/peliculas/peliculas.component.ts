import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Pelicula } from '../../models/pelicula';

import { PeliculaService } from 'src/app/services/pelicula.service';

@Component({
  selector: 'peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers:[PeliculaService]
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {
  public peliculas: Array<Pelicula>;
  public title: string;

  public favorita!: Pelicula;
  public fecha: any;

  constructor(
    private _peliculaService: PeliculaService
  ) {
    this.title = "Peliculas";
    this.peliculas = this._peliculaService.getPeliculas();

    this.fecha = new Date(2020,8,12);


  }

  ngOnInit(): void {
    console.log("On init lanzado")
    console.log(this._peliculaService.holaMundo())
  }

  ngDoCheck(): void {
    console.log("Do check lanzado");
  }

  cambiarTitulo(): void {
    this.title = "Titulo cambiado";
  }

  ngOnDestroy(): void {
    console.log("El componente sera eliminado de la ejecucion")
  }

  mostrarFavorita(event:any){
    //alert(event);
    console.log(event);
    this.favorita = event.pelicula;
  }



}
