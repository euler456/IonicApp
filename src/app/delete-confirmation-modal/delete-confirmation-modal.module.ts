import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DeleteConfirmationModalComponent } from './delete-confirmation-modal.component';

@NgModule({
  declarations: [
    DeleteConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    DeleteConfirmationModalComponent
  ]
})
export class DeleteConfirmationModalModule { }
