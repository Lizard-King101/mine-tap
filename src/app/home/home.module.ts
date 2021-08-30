import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ComponentsModule } from "../_components/components.module";
import { HomePage } from "./home.component";

const routes: Routes = [
    {
        path: '',
        component: HomePage
    }
]

@NgModule({
    declarations: [
        HomePage
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        IonicModule,
        ComponentsModule
    ]
})
export class HomePageModule {}