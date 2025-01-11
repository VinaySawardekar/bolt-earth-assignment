import { Component, OnInit } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { NavigationEnd, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    RouterModule,
    CommonModule,
  ],
})
export class HeaderComponent implements OnInit {
  username: string = '';
  isLoading: boolean = false;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private userService: UserService
  ) {
    this.matIconRegistry.addSvgIcon(
      'user',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icon/user.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'leftarrow',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icon/arrow-left.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'logout',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icon/logout.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'plus',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/icon/plus.svg'
      )
    );
  }

  /**
   * Initializes the component by subscribing to the default user details.
   * On successful retrieval, it logs the data, stores it in local storage,
   * and sets the username. In case of an error, it attempts to retrieve
   * the username from local storage.
   */

  ngOnInit(): void {
    this.userService.getDefaultUserDetails().subscribe({
      /**
       * Handles successful data retrieval.
       * If the response status is 'success', the method logs the data,
       * stores it in local storage, and sets the username.
       * @param data - The response data.
       */
      next: (data) => {
        // handle successful data retrieval here
        if (data.status === 'success') {
          localStorage.setItem('userDetails', JSON.stringify(data.data));
          this.username = data.data[0].username;
        }
      },
      error: (error) => {
        // handle error here
        const storedData = localStorage.getItem('userDetails');
        if (storedData) {
          const data = JSON.parse(storedData);
          this.username = data[0].username;
        }
      },
    });
  }
}
