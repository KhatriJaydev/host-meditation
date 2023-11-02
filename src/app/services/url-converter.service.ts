import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlConverterService {
  convertUrl(url: string): string {
    // Convert to lowercase
    let convertedUrl = url.toLowerCase();

    // Replace spaces with hyphens
    convertedUrl = convertedUrl.replace(/ /g, '-');

    return convertedUrl;
  }
}
