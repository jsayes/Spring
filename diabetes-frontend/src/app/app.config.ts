import { ApplicationConfig, importProvidersFrom } from '@angular/core';
//import { provideRouter } from '@angular/router';
// Si tienes un archivo de rutas, impórtalo aquí:
// import { routes } from './app.routes';
//import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()]
};