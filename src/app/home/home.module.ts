import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './home-routing.module';
import { LaunchScreenComponent } from './launch-screen/launch-screen.component';
import { HomeComponent } from './home.page';
import { AddIconComponent } from './add-icon/add-icon.component';

@NgModule({
  imports: [CommonModule, FormsModule, HomePageRoutingModule],
  declarations: [HomeComponent, LaunchScreenComponent],
})
export class HomePageModule {}
