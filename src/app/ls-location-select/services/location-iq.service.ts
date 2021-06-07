import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocationAutocomplete } from '../models/location-autocomplete.model';
import { LocationIqRepository } from '../repositories/location-iq.repository';

@Injectable({
  providedIn: 'root',
})
export class LocationIqService {
  constructor(private locationIqRepository: LocationIqRepository) {}

  searchForLocation(searchTerm: string): Observable<LocationAutocomplete[]> {
    return this.locationIqRepository.searchForLocation(searchTerm).pipe(
      map((locations) =>
        locations.map((location) => ({
          osm_id: location.osm_id,
          display_name: location.display_name,
        }))
      )
    );
  }

  formatLocation(location: LocationAutocomplete): string {
    return location.display_name;
  }
}
