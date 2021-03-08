import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@NgModule({
imports: [
CommonModule,
MatToolbarModule,
MatIconModule,
MatCardModule,
],
exports: [
MatToolbarModule,
MatIconModule,
MatCardModule,
],
})
export class MaterialModule { }