import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthService } from './users/auth.service';
import { AppRoutingModule } from './app-routing.modules';
import { WelcomeComponent } from './home/welcome.component';
import { PathNotFoundComponent } from './home/pathnotfound.component';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PathNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    ProductsModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
