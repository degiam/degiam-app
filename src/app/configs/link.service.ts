import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  setCanonicalLink(url: string): void {
    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  setAlternateLink(url: string, hreflang: string): void {
    let link: HTMLLinkElement | null = document.querySelector(`link[rel='alternate'][hreflang='${hreflang}']`);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  removeLinkByRel(rel: string): void {
    const links = document.querySelectorAll(`link[rel='${rel}']`);
    links.forEach(link => link.parentNode?.removeChild(link));
  }
}
