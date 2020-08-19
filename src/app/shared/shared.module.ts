import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { CardComponent } from './card/card.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { LogoutComponent } from './logout/logout.component';
@NgModule({
  declarations: [
    NavbarComponent,
    CardComponent,
    FooterComponent,
    LogoutComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
  exports: [NavbarComponent, CardComponent, FooterComponent, LogoutComponent],
})
export class SharedModule {}
