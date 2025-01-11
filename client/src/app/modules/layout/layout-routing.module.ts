import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from '../components/event/event.component';
import { ReportComponent } from '../components/report/report.component';
import { EventDetailsComponent } from '../components/event-details/event-details.component';

const routes: Routes = [
  { path: 'events', component: EventComponent },
  { path: 'reports', component: ReportComponent },
  { path: 'events/:eventId', component: EventDetailsComponent },
  { path: '', redirectTo: 'events', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
