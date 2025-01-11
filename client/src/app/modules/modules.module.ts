import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { LayoutRoutingModule } from './layout/layout-routing.module';
import { ReportComponent } from './components/report/report.component';
import { EventdialogComponent } from './components/event-dialog/event-dialog.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';

@NgModule({
  declarations: [ReportComponent, EventdialogComponent, EventDetailsComponent],
  imports: [NgModule, CommonModule, LayoutModule, LayoutRoutingModule],
})
export class ModulesModule {}
