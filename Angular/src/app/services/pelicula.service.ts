import { Injectable} from "@angular/core";

import { Pelicula } from "../models/pelicula";

@Injectable()

export class PeliculaService{

    public peliculas: Pelicula[];

    constructor(){
        this.peliculas =[
            new Pelicula('Spiderman 4', 2021, 'https://i0.wp.com/hipertextual.com/wp-content/uploads/2020/10/hipertextual-tobey-maguire-y-andrew-garfield-aparecerian-spider-man-3-y-universo-cinematografico-marvel-2020175510.jpg?fit=1200%2C604&quality=50&strip=all&ssl=1'),
            new Pelicula('Vengadores: Endgame ', 2019, 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/43788DDCB15C8FBA1D5C6456C8C8D37AE172709C4EFB741D89ADADDB08335F18/scale?width=1200&aspectRatio=1.78&format=jpeg'),
            new Pelicula('4 Fantasticos', 2016,'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/hc_1440x810/public/media/image/2014/09/383154-cine-superheroes-critica-4-fantasticos.jpg?itok=wpe88XLn')
          ];
    }

    holaMundo(){
        return "Hola mundo desde servicio de angular"
    }

    getPeliculas(){
        return this.peliculas;
    }
}