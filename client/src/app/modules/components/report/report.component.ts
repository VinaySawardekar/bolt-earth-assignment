import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/core/services/report/report.service';
import { SnackBarToastService } from 'src/app/core/services/toast/snack-bar-toast.service';

export interface ReportData {
  name: string;
  position: number;
  date: string;
  totalTickets: number;
  availableTickets: number;
  ticketPrice: number;
  category: string;
  duration: string;
  location: string;
  totalTicketsSold: number;
  revenue: number;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  standalone: true,
  imports: [MatTableModule, CommonModule, MatButtonModule],
})
export class ReportComponent implements OnInit {
  displayedColumns: string[] = [
    'Sr No',
    'Name',
    'Event Date',
    'Status',
    'Total Tickets',
    'Available Tickets',
    'Ticket Price',
    'Category',
    'Duration',
    'Location',
    'Total Tickets Sold',
    'Revenue',
  ];

  dataSource: ReportData[] = [];

  constructor(
    private reportService: ReportService,
    private route: Router,
    private toastService: SnackBarToastService
  ) {}

  ngOnInit(): void {
    this.reportService.getReport().subscribe({
      next: (data) => {
        this.dataSource = data.data.map((item: any, index: any) => ({
          position: index + 1,
          revenue: item.totalTicketsSold * item.ticketPrice,
          event_status:
            item.availableTickets === 0
              ? 'SOLD OUT'
              : new Date(item.date).getTime() < new Date().getTime() ||
                item.status === 'inactive'
              ? 'CLOSED'
              : 'BOOKINGS OPEN',
          ...item,
        }));
        this.toastService.showToast(data.message);
      },
      error: (error) => {
        this.dataSource = [];
        this.toastService.showToast(error.message);
      },
    });
  }

  goBack() {
    this.route.navigate(['/events']);
  }
}
