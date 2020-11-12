import { ReactiveSearchModule } from './reactive-search/reactive-search.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo:'busca-reativa' },
  { 
    path: 'cursos', 
    loadChildren: () => import('./cursos/modules/cursos.module').then(m => m.CursosModule)
  },
  { 
    path: 'upload', 
    loadChildren: () => import('./upload-file/modules/upload-file.module').then(m => m.UploadFileModule)
  },
  { 
    path: 'busca-reativa', 
    loadChildren: () => import('./reactive-search/reactive-search.module').then(m => m.ReactiveSearchModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
