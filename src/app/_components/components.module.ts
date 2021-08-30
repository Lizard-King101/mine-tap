import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockComponent } from "./block/block.component";

const Components = [
    BlockComponent
];

@NgModule({
    declarations: [
        ...Components
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    exports: [
        ...Components
    ]
})
export class ComponentsModule {

}