import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  
  @Input() size: string | undefined;
  @Input()  nombre: string | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
