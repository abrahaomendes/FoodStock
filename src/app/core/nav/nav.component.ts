import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../components/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  isExpanded = false;
  #auth=inject(AuthService)

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
  logout(){
    this.#auth.logout();
  }

}
