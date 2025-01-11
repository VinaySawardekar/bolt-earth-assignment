import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EventdialogComponent } from '../event-dialog/event-dialog.component';
import { EventService } from 'src/app/core/services/event/event.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { SnackBarToastService } from 'src/app/core/services/toast/snack-bar-toast.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CommonModule,
    RouterModule,
    MatChipsModule,
  ],
})
export class EventComponent implements OnInit {
  eventList: Array<any> = [];
  private dialog = inject(MatDialog);
  showStatus: string = '';

  constructor(
    private eventService: EventService,
    private router: Router,
    private toastService: SnackBarToastService
  ) {}

  ngOnInit() {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.eventList = data?.data;
        this.eventList.forEach((event) => {
          if (event.availableTickets === 0) {
            event.book_status = 'SOLD OUT';
          } else if (
            new Date(event.date).getTime() < new Date().getTime() ||
            event.status === 'inactive'
          ) {
            event.book_status = 'CLOSED';
          } else {
            event.book_status = 'BOOKINGS OPEN';
          }
        });
      },
      error: (error) => {
        this.eventList = [];
      },
    });
  }

  openEventDialog(): void {
    const dialogRef = this.dialog.open(EventdialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const body = {
          ...result,
          availableTickets: result.totalTickets,
        };
        this.eventService.createEvent(body).subscribe({
          /**
           * Handles successful data retrieval.
           * If the response status is 'success', the method logs the data,
           * stores it in local storage, and sets the username.
           * @param data - The response data.
           */
          next: (data) => {
            // handle successful data retrieval here
            if (data.status === 'success') {
              this.toastService.showToast(data.message);
            }
          },
          error: (error) => {
            // handle error here
            this.toastService.showToast(error.message);
          },
        });
      }
    });
  }

  openEvent(eventId: string): void {
    this.router.navigate(['/events/' + eventId]);
  }
}
