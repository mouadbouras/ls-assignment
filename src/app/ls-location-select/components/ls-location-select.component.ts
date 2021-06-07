import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LocationIqRepository } from '../repositories/location-iq.repository';
import { LocationIqService } from '../services/location-iq.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs/operators';
import { LocationAutocomplete } from '../models/location-autocomplete.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'ls-location-select',
  templateUrl: './ls-location-select.component.html',
  styleUrls: ['./ls-location-select.component.scss'],
})
export class LsLocationSelectComponent implements OnInit {
  @Input()
  locations: FormArray = new FormArray([]);

  @ViewChild('locationInput') locationInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  location = new FormControl();
  autocompleteLocations: Observable<LocationAutocomplete[]> | undefined;

  constructor(private locationIqService: LocationIqService) {}

  ngOnInit(): void {
    this.initAutoComplete();
  }

  autocompleteFormatter(autocompleteLocation: LocationAutocomplete): string {
    return this.locationIqService.formatLocation(autocompleteLocation);
  }

  remove(value: string): void {
    const index = this.locations.controls.findIndex(
      (location) => location.value === value
    );

    if (index >= 0) {
      this.locations.removeAt(index);
    }
  }

  add(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value || undefined;

    if (
      value &&
      this.locations.controls.findIndex((control) => control.value === value) <
        0
    ) {
      this.locations.push(new FormControl(value));
      this.clearInput();
    }
  }

  private initAutoComplete() {
    this.autocompleteLocations = this.location.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((location) => !!location),
      switchMap((location) =>
        this.locationIqService.searchForLocation(location)
      )
    );
  }

  private clearInput() {
    if (this.locationInput) {
      this.locationInput.nativeElement.value = '';
    }
  }
}
