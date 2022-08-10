import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';
import swal from 'sweetalert';
//obtener datos del url
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {
  public article!: Article;

  public url: string;
  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router

  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._articleService.getArticle(id).subscribe(
        response => {
          if (response.article) {
            this.article = response.article;
          } else {
            this._router.navigate(['/home']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/home']);
        }
      )

    });


  }

  delete(id: string) {
    swal({
      title: '¿Estas seguro?',
      text: "Esta accion no se puede revertir",
      icon: 'warning',
      buttons: [true,true],
      dangerMode: true

    }).then((willDelete) => {
      if (willDelete) {
        this._articleService.delete(id).subscribe(
          response => {
            swal("Articulo eliminado correctamente", "Eliminado", "success");
            this._router.navigate(['/home']);
          },
          error => {
            swal("Ha ocurrido un error al eliminar articulo", "Error", "error");
          }
        );
      } else {
        swal("No se ha eliminado el articulo");
      }
    });
  }

}
