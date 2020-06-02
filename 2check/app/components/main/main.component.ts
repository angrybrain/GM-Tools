import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode"

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('JWT_TOKEN');
    const decodedToken = jwt_decode(token);
    this.role = decodedToken.data.role;
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login']);
  }

  role: string = '';

}
