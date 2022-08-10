import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

import { Global } from 'src/app/services/global';
import  swal from 'sweetalert';
@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})
export class ArticleEditComponent implements OnInit {
  public article: Article;
  public status: string='';
  public _isedit: boolean = false;
  public page_title:string;
  public url = Global.url;

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
    this._isedit = true;
    this.page_title = 'Editar articulo';
  }

  ngOnInit(): void {
    this.getArticle()
  }

  onSubmit(){
    //console.log(this.article);
    this._articleService.update(this.article._id, this.article).subscribe(
      response => {
        if(response.status =='success'){
          this.status = 'success';
          this.article = response.article
          this._router.navigate(['/blog/articulo/',this.article._id]);
          swal('Articulo editado!!','El articulo se ha editado correctamente','success');
          //console.log(response.article);
        }else{
          this.status = 'error'
        }

      }, error =>{
        swal('Articulo no editado!!','El articulo no se ha editado','error');
        console.log(error);
        this.status='error';
      }
    );
  }

  imageUpload(data:any){
    let image_data = data.body;
    this.article.image = image_data.image;

  }

  getArticle(){
    this._route.params.subscribe(params =>{
      let id = params['id'];

      this._articleService.getArticle(id).subscribe(
        response =>{
          if(response.article){
            this.article = response.article;
          }else{
            this._router.navigate(['/home']);
          }
        },
        error =>{
          console.log(error);
          this._router.navigate(['/home']);
        }
      )

    });
    

  
  }

}
