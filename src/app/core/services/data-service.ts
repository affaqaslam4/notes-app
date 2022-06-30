import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
    private api = 'https://61ee5f30d593d20017dbad98.mockapi.io/pinguin/api';

    public constructor(private http: HttpClient) {}

    /**
     * Sends a PUT request
     * @param service the name of the service to call
     * @param query the query string
     * @param body the body of the POST request
     */
    public put<T>(
        service: string,
        query?: string,
        body?: unknown
    ): Observable<T> {
        const url = `${this.api}/${service}?${query}`;

        return this.http.put<T>(url, body);
    }

    /**
     * Sends a GET request
     * @param service the name of the service to call
     * @param query the query string
     */
    public get<T>(service: string, query?: string): Observable<T> {
        const url = `${this.api}/${service}?${query}`;

        return this.http.get<T>(url);
    }
}
