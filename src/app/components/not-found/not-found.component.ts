import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p class="text-xl text-gray-700 mb-8">Page Not Found</p>
      <a [routerLink]="['/']" class="text-blue-500 hover:underline">Go Home</a>
    </div>
  `,
})
export class NotFoundComponent {}
