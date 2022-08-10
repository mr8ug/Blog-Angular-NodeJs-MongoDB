import { ThisReceiver } from "@angular/compiler";
import { Component } from "@angular/core";

@Component({
    selector: 'mi-compontente',
    templateUrl: './mi-componente.component.html'
})

export class MiComponente{

    public titulo: string;
    public comentario : string;
    public year: number;

    public mostrarPeliculas: boolean = true;

    constructor(){
        this.titulo = "Hola Mundo Soy Mi Componente";
        this.comentario = "Este es mi primer componente";
        this.year = 2021;
        
        console.log("Componente mi componente funcionando");
        console.log(this.titulo, this.comentario, this.year)

    }

    ocultarPeliculas(): void{
        this.mostrarPeliculas = false;
    }
}