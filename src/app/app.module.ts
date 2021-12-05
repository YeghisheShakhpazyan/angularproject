import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SearchComponent} from "./search/search.component";
import {FormsModule} from "@angular/forms";
import { ContentComponent } from './content/content.component';

import { UserPipe } from './pipes/user.pipe';
import { CountryPipe } from './pipes/country.pipe';
import { StatusPipe } from './pipes/status.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ContentComponent,
    UserPipe,
    CountryPipe,
    StatusPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
