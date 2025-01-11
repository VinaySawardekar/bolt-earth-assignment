import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/core/services/event/event.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { SnackBarToastService } from 'src/app/core/services/toast/snack-bar-toast.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
  ],
})
export class EventDetailsComponent implements OnInit {
  eventDetails: any = {};
  noOfTickets: number = 1;
  bookingError: any;
  eventId: any = '';
  buttonDisabled: boolean = false;
  status: string = '';

  constructor(
    private eventService: EventService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: SnackBarToastService
  ) {}

  ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.paramMap.get('eventId');

    if (this.eventId) {
      this.eventService.getEventById(this.eventId).subscribe({
        next: (data) => {
          this.eventDetails = data.data[0];
          this.buttonDisabled =
            this.eventDetails?.availableTickets === 0 ||
            new Date(this.eventDetails.date).getTime() < new Date().getTime();

          if (this.eventDetails.availableTickets === 0) {
            this.status = 'SOLD OUT';
          } else if (
            new Date(this.eventDetails.date).getTime() < new Date().getTime() ||
            this.eventDetails.status === 'inactive'
          ) {
            this.status = 'CLOSED';
          } else {
            this.status = 'BOOKINGS OPEN';
          }
        },
        error: (error) => {
          console.log('Event Details not found!');
        },
      });
    } else {
      console.log('Invalid Event ID');
    }
  }

  purchaseTickets() {
    if (
      this.noOfTickets > 0 &&
      this.noOfTickets <= this.eventDetails?.availableTickets
    ) {
      const dataFromLocal: any = window.localStorage.getItem('userDetails');
      const userDetails = JSON.parse(dataFromLocal);

      const body = {
        userId: userDetails[0]._id,
        ticketsPurchased: this.noOfTickets,
      };
      this.eventService.purchseEventTickets(this.eventId, body).subscribe({
        next: (data) => {
          this.noOfTickets = 1;
          this.toastService.showToast(data.message);
          this.ngOnInit(); // Call ngOnInit to get the latest data
        },
        error: (err) => {},
      });
      this.bookingError = null;
      // Call a service method to handle ticket purchase here
    } else {
      this.bookingError = 'Invalid number of tickets!';
    }
  }

  removeEventTicket() {
    if (this.noOfTickets > 1) {
      this.noOfTickets--;
      this.checkButtonDisable();
    }
  }
  onNoOfTicketsChange(event: any) {
    const value = event;
    if (value < 1) {
      this.noOfTickets = 1;
    } else {
      this.noOfTickets = value;
    }
    this.checkButtonDisable();
  }
  addEventTicket() {
    if (this.buttonDisabled) {
      return;
    }
    this.noOfTickets++;
    this.checkButtonDisable();
  }

  checkButtonDisable() {
    this.buttonDisabled =
      this.noOfTickets > this.eventDetails?.availableTickets ||
      new Date(this.eventDetails.date).getTime() < new Date().getTime();
  }

  goBack() {
    this.route.navigate(['/events']);
  }
}
