import { environment } from './environment';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

export const endpoints = {
    register: `${environment.apiUrl}/auth/register`,
    logIn: `${environment.apiUrl}/auth/login`,
    logOut: `${environment.apiUrl}/auth/logout`,
    refresh: `${environment.apiUrl}/auth/refresh`,
    
    // airports
    coordinates: `${environment.apiUrl}/airports/coordinates`,

    // flights
    dailyStats: `${environment.apiUrl}/flights/dailyStats`,
}