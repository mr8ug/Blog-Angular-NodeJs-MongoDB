import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArticleService]
    
  
})
export class HomeComponent implements OnInit {
  public homeText='Curso Angular UDEMY';
  public articles: Article[]=[];
  public title: string;
  
  
  constructor(
    private _articleService: ArticleService
  ) { 
    this.title = 'Ultimos Articulos'
    
  }


  ngOnInit(): void {
    this._articleService.getArticles().subscribe(
      response=>{
        if(response.articles){
          this.articles = response.articles;
          console.log(this.articles);
        }
      },
      error => {
        console.log("Error");
      }
    );
  }

}
