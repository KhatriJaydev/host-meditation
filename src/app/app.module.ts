import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { AddIconComponent } from './home/add-icon/add-icon.component';
import { OnboardingService } from './services/onboarding.service';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent, AddIconComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    // }),
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: !isDevMode(),
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000',
    // }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production || !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    
  ],
  providers: [OnboardingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
