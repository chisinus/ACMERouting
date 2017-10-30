import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { WelcomeComponent } from './home/welcome.component';
import { PathNotFoundComponent } from './home/pathnotfound.component';

const Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: '', redirectTo: '/welcome', pathMatch: 'full'},
    { path: '**', component: PathNotFoundComponent  }
];

@NgModule ({
    imports: [
        RouterModule.forRoot(Routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }


