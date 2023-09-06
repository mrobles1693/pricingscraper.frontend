import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

export function getBackUrl(){
  return environment.back_url;
}

const providers = [
  { provide : 'BACK_URL', useFactory: getBackUrl, deps: [] },
];

if(environment.production){
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
