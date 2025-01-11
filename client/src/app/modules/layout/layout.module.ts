import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { EventComponent } from '../components/event/event.component';
import { HeaderComponent } from 'src/app/core/components/header/header.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, LayoutRoutingModule, EventComponent, HeaderComponent],
})
export class LayoutModule {}
