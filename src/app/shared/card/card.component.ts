import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() name: string;
  @Input() description:string;
  @Input() image:string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
