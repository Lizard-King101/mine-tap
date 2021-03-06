import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'craft',
    loadChildren: () => import('./crafting/crafting.module').then(m => m.CraftingPageModule)
  },
  {
    path: 'smelt',
    loadChildren: () => import('./smelting/smelting.module').then(m => m.SmeltingPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
