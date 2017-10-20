/**
 * Global imports
 */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

/**
 * Local imports
 */
import { TournamentModule } from './app/tournament.module';
import { environment } from './environments/environment';

/**
 * Environment check
 */
if (environment.production) enableProdMode();

/**
 * Bootstrap application
 */
platformBrowserDynamic().bootstrapModule(TournamentModule);