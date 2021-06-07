import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class LocationIqInterceptor implements HttpInterceptor {
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(environment.locationIq.endpoint)) {
      const params = httpRequest.params;
      params.append('key', environment.locationIq.apiKey);

      const clonedRequest = httpRequest.clone({
        setParams: {
          key: environment.locationIq.apiKey,
        },
      });
      return next.handle(clonedRequest);
    }

    return next.handle(httpRequest);
  }
}
