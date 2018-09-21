import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotnewsPage } from './hotnews';

@NgModule({
  declarations: [
    HotnewsPage,
  ],
  imports: [
    IonicPageModule.forChild(HotnewsPage),
  ],
})
export class HotnewsPageModule {}
