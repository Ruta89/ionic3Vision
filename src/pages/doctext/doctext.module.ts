import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctextPage } from './doctext';

@NgModule({
  declarations: [
    DoctextPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctextPage),
  ],
})
export class DoctextPageModule {}
