import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { CardComponent } from './card/card.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [NavbarComponent, CardComponent, FooterComponent],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    CardComponent,
    FooterComponent
  ]
})
export class SharedModule { }
