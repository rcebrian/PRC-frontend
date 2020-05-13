import { environment } from './environment';

export const endpoints = {
    register: `${environment.apiUrl}/auth/register`,
    logIn: `${environment.apiUrl}/auth/login`,
    logOut: `${environment.apiUrl}/auth/logout`,
    refresh: `${environment.apiUrl}/auth/refresh`,
}