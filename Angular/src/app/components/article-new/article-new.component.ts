import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

import { Global } from 'src/app/services/global';

import swal from 'sweetalert';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService]
})
export class ArticleNewComponent implements OnInit {
  public article: Article;
  public status: string='';
  public page_title:string;
  public url = Global.url;
  public _isedit: boolean = false;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.jpeg,.gif",
    maxSize: 50,
    uploadAPI:{
      url:Global.url+'upload-image/'
    },
    theme: "attachPin",

    hideProgressbar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts:{
      attachPinBtn: 'Subir imagen de articulo.'
    }
    
  };

  constructor(
    private _route: ActivatedRoute,
    private _router : Router,
    private _articleService: ArticleService
  ) { 
    this.article = new Article('','','', '', null);
    this.page_title = 'Crear articulo';
  }

  ngOnInit(): void {
  }

  onSubmit(){
    //console.log(this.article);
    this._articleService.create(this.article).subscribe(
      response => {
        if(response.status =='success'){
          this.status = 'success';
          this.article = response.article
          this._router.navigate(['/blog']);
          //ALERTA
          swal('Articulo creado!!','El articulo se ha creado correctamente','success');

          //console.log(response.article);
        }else{
          this.status = 'error'
        }

      }, error =>{
        console.log(error);
        swal('Creacion Fallida!!','El articulo no ha podido ser creado','error');
        this.status='error';
      }
    );
  }

  imageUpload(data:any){
    let image_data = data.body;
    this.article.image = image_data.image;

  }
}
