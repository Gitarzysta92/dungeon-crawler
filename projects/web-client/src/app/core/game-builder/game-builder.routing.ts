import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';
import { MenuLocation } from 'src/app/aspects/navigation/api';
import { ICONS } from 'src/app/shared/icons/api';
import { RACE_STEP_NAME, CLASS_STEP_NAME, ORIGIN_STEP_NAME } from '@game-logic/gameplay/modules/heroes/heroes.constants';
import { IDENTITY_STEP_NAME } from './constants/game-builder.constants';


export namespace GameBuilder {
  export const ROOT_PATH = 'game-builder';
  export const routes = new RoutesAdapter({
    builder: {
      path: '',
      data: {
        menu: { location: MenuLocation.MainMenu, label: 'game-builder.menu-label', icon: ICONS.profile },
        loader: { show: true },
        extras: { skipLocationChange: true },
        animation: "game-builder"
      }
    },
  });
}