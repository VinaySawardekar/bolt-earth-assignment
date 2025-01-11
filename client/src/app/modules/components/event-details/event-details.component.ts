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

  /**
   * Fetches the event details from the server using the event id from the url param.
   * Checks if the event date has passed or if the event is sold out and disables the purchase button accordingly.
   * Sets the status of the event to 'BOOKINGS OPEN', 'CLOSED', or 'SOLD OUT' accordingly.
   */
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

  /**
   * Handles the ticket purchase of an event.
   *
   * @description
   * This method is called when the user clicks the purchase button.
   * It checks if the number of tickets is valid and makes a call to the
   * EventService to purchase the tickets.
   * If the purchase is successful, the toast service is called to display a
   * success message and the ngOnInit method is called to get the latest data.
   * If the purchase fails, the bookingError property is set to an error message.
   */
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

  /**
   * This method is called when the user clicks the remove ticket button.
   * It decrements the number of tickets if the value is greater than 1.
   * It also calls the checkButtonDisable method to check if the purchase button should be disabled.
   */
  removeEventTicket() {
    if (this.noOfTickets > 1) {
      this.noOfTickets--;
      this.checkButtonDisable();
    }
  }
  /**
   * This method is called when the user types a new number of tickets.
   * It sets the number of tickets to the new value if it is valid (greater than 0).
   * It also calls the checkButtonDisable method to check if the purchase button should be disabled.
   * @param event - The new number of tickets input by the user.
   */
  onNoOfTicketsChange(event: any) {
    const value = event;
    if (value < 1) {
      this.noOfTickets = 0;
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

  /**
   * Checks and updates the buttonDisabled property based on the current
   * number of tickets and event availability. The button is disabled if:
   * - The number of tickets is less than or equal to zero.
   * - The number of tickets exceeds the available tickets for the event.
   * - The event date is in the past.
   */

  checkButtonDisable() {
    this.buttonDisabled =
      this.noOfTickets <= 0 ||
      this.noOfTickets > this.eventDetails?.availableTickets ||
      new Date(this.eventDetails.date).getTime() < new Date().getTime();
  }

  /**
   * Navigates back to the events list page.
   */
  goBack() {
    this.route.navigate(['/events']);
  }
}
