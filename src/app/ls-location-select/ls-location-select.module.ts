import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LsLocationSelectComponent } from './components/ls-location-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationIqInterceptor } from './interceptors/loaction-iq.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
  ],
  declarations: [LsLocationSelectComponent],
  exports: [LsLocationSelectComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LocationIqInterceptor,
      multi: true,
    },
  ],
})
export class LsLocationSelectModule {}
