import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordercard',
  templateUrl: './ordercard.component.html',
  styleUrls: ['./ordercard.component.css']
})
export class OrdercardComponent implements OnInit {
  
  @Input() items: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
