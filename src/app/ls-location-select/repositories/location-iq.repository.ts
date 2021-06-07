import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocationAutocompleteResponse } from '../models/location-autocomplete.response';

@Injectable({
  providedIn: 'root',
})
export class LocationIqRepository {
  private endpoint: string;
  constructor(private httpClient: HttpClient) {
    this.endpoint = `${environment.locationIq.endpoint}/v${environment.locationIq.apiVersion}`;
  }

  searchForLocation(
    searchTerm: string,
    limit: number = environment.locationIq.defaultAutocompleteLimit
  ): Observable<LocationAutocompleteResponse[]> {
    return this.httpClient.get<LocationAutocompleteResponse[]>(
      `${this.endpoint}/autocomplete.php`,
      { params: { q: searchTerm, limit } }
    );
  }
}
