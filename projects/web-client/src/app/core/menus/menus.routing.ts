import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';
import { ComponentAnimationGuard } from 'src/app/shared/animations/guards/animation.guard';


export namespace Menus {
  export const ROOT_PATH = 'main-menu';
  export const routes = new RoutesAdapter({
    mainMenu: {
      path: '',
      pathMatch: 'full',
      canDeactivate: [ComponentAnimationGuard],
      data: { animation: 'HomePage' }
    }
  });
}