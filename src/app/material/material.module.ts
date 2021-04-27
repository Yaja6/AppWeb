import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
imports: [
CommonModule,
MatToolbarModule,
MatIconModule,
MatCardModule,
MatTabsModule,
MatGridListModule,
MatDialogModule
],
exports: [
MatToolbarModule,
MatIconModule,
MatCardModule,
MatTabsModule,
MatGridListModule,
MatDialogModule
],
})
export class MaterialModule { }