import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BlockComponent } from "./block/block.component";
import { InventoryComponent } from "./inventory/inventory";
import { ItemComponent } from "./item/item";

const Components = [
    BlockComponent,
    InventoryComponent,
    ItemComponent
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