import { Component, AfterViewInit, ViewChild, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Inventory } from "src/app/_objects/inventory";
import { Inventories } from "../../_services/Inventories";
import { Item } from "../item/item";

@Component({
    selector: 'inventory',
    templateUrl: 'inventory.html',
    styleUrls: ['inventory.scss']
})
export class InventoryComponent implements AfterViewInit{
    @Input('inventory') inventory?: Inventory;
    @Input('id') inventoryId?: string;
    constructor(private inventories: Inventories) { }

    ngAfterViewInit() {
        // load inventory
        if(!this.inventory && this.inventoryId) {
            this.inventory = this.inventories.getInventory(this.inventoryId);
            console.log(this.inventory);
            
        }
    }

    onDragOver(ev: DragEvent, x: number, y: number){
        // dragging over inventory slots
        if(this.inventories && this.inventory && !this.inventory.noDrop) {
            let targetCell = {
                x: x - this.inventories.pickedUp.x,
                y: y - this.inventories.pickedUp.y
            }
            let max = {
                x: targetCell.x + this.inventories.pickedSize.x,
                y: targetCell.y + this.inventories.pickedSize.y
            }
            let canPlace = true;
            if (targetCell.x >= 0 && targetCell.y >= 0 && max.x <= this.inventory.columns && max.y <= this.inventory.rows){
                for (let x = 0; x < this.inventories.pickedSize.x; x ++) {
                    for (let y = 0; y < this.inventories.pickedSize.y; y ++) {
                        let cell = this.inventory.cells[y + targetCell.y][x + targetCell.x];
                        if (cell == 'filled' || (cell.id && this.inventories.item && cell.id != this.inventories.item.id)) { 
                            canPlace = false;
                            break;
                        }
                    }
                    if(!canPlace) break;
                }
            } else canPlace = false;
            
    
    
            if (canPlace) ev.preventDefault();
        }
    }

    onDrop(ev: DragEvent, x: number, y: number) {
        // dropping item on inventory slotxs
        ev.preventDefault();
        if(ev.dataTransfer) {
            let item = <Item>JSON.parse(ev.dataTransfer.getData('item'));

            if(!item) return;
            item.pos = {
                x: x - this.inventories.pickedUp.x,
                y: y - this.inventories.pickedUp.y
            };
            let inventory = this.inventories.getInventory(ev.dataTransfer.getData('inventory'))
            if(this.inventory && inventory) {
                if(item.id) inventory.removeItem(item.id);
                this.inventory.pushItem(item);
            }
        }
    }

}
