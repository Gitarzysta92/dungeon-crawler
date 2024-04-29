import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';
import { MenuLocation } from 'src/app/aspects/navigation/api';
import { ICONS } from 'src/app/shared/icons/api';
import { BuilderStepGuard } from './guards/builder-step.guard';
import { RACE_STEP_NAME, CLASS_STEP_NAME, ORIGIN_STEP_NAME } from '@game-logic/gameplay/modules/heroes/heroes.constants';
import { IDENTITY_STEP_NAME } from './constants/game-builder.constants';
import { BuilderGuard } from './guards/builder.guard';


export namespace GameBuilder {
  export const ROOT_PATH = 'game-builder';
  export const routes = new RoutesAdapter({
    builder: {
      path: '',
      canActivate: [ BuilderGuard ],
      //resolve: { dungeonData: GameBuilderResolver },
      data: {
        menu: { location: MenuLocation.MainMenu, label: 'game-builder.menu-label', icon: ICONS.profile },
        loader: { show: true }
      },
      children: {
        redirect: { path: "", pathMatch: "full", redirectTo: "race" },
        race: { path: RACE_STEP_NAME, data: { loader: { show: true, skipWhenSameBranch: true } }, canActivate: [ BuilderStepGuard ] },
        class: { path: CLASS_STEP_NAME, data: { loader: { show: true, skipWhenSameBranch: true } }, canActivate: [ BuilderStepGuard ] },
        origin: { path: ORIGIN_STEP_NAME, data: { loader: { show: true, skipWhenSameBranch: true } }, canActivate: [ BuilderStepGuard ] },
        identity: { path: IDENTITY_STEP_NAME, data: { loader: { show: true, skipWhenSameBranch: true } }, canActivate: [ BuilderStepGuard ] }
      }
    },
  });
}