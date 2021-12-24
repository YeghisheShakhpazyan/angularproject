import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SearchComponent} from "./search/search.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ContentComponent } from './content/content.component';

import { UserPipe } from './pipes/user.pipe';
import { CountryPipe } from './pipes/country.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { PaginationComponent } from './pagination/pagination.component';
import { RowHoverDirective } from './directives/row-hover.directive';
import {ProjectService} from "./service/project.service";
import {HttpClientModule} from "@angular/common/http";
import { InterventionComponent } from './intervention/intervention.component';
import {AppRoutingModule} from "./app-routing.module";
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ContentComponent,
    UserPipe,
    CountryPipe,
    StatusPipe,
    PaginationComponent,
    RowHoverDirective,
    InterventionComponent,
    HomeComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [{provide:ProjectService,useClass:ProjectService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
