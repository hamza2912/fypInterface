import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '../../../node_modules/@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { IntroComponent } from './intro.component';
import { RouterModule } from '../../../node_modules/@angular/router';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: IntroComponent }])
  ],
  declarations: [IntroComponent]
})
export class IntroModule { }
