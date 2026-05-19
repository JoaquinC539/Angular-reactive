import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { RouterLink, RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, AppRoutingModule, RouterLink, RouterOutlet],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
