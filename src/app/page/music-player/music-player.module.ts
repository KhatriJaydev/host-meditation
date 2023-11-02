import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicPlayerRoutingModule } from './music-player-routing.module';
import { MusicPlayerComponent } from './music-player.component';


@NgModule({
  declarations: [
    MusicPlayerComponent
  ],
  imports: [
    CommonModule,
    MusicPlayerRoutingModule
  ]
})
export class MusicPlayerModule { }
