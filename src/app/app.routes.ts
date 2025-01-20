import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { ZipComponent } from '@pages/zip/zip.component';
import { ChatComponent } from '@pages/chat/chat.component';
import { LinkComponent } from '@pages/link/link.component';
import { PictComponent } from '@pages/pict/pict.component';
import { GptComponent } from '@pages/gpt/gpt.component';
// import { ScanComponent } from '@pages/scan/scan.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'zip',
    component: ZipComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'link',
    component: LinkComponent,
  },
  {
    path: 'pict',
    component: PictComponent,
  },
  {
    path: 'gpt',
    component: GptComponent,
  },
  // {
  //   path: 'scan',
  //   component: ScanComponent,
  // },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

export const getPaths = (): string[] => {
  return routes
    .filter((route) => route.path !== '**')
    .map((route) => route.path || '');
};