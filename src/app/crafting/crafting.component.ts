import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { Item } from "../_components/item/item";
import { items } from "../_defaults/items";
import { recipies } from "../_defaults/recipies";
import { Inventory } from "../_objects/inventory";
import { Inventories } from "../_services/Inventories";

@Component({
    templateUrl: 'crafting.component.html',
    styleUrls: ['crafting.component.scss']
})
export class CraftingPage implements AfterViewInit, OnDestroy{
    id: string = 'crafting'
    rows: number = 3;
    columns: number = 3;
    craftingInventory: Inventory;
    craftedInventory: Inventory;

    foundRecipePos?: {
        
    }
    foundRecipe?: {
        pos: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        recipe: {
            item: string;
            amount: number;
        }
    }

    constructor(private inventories: Inventories) {
        let inv = this.inventories.getInventory(this.id);
        if(!inv) inv = this.inventories.createInventory({
            id: this.id,
            rows: 3,
            columns: 3,
            items: []
        }) 
        inv.on('update-items', this.findRecipe.bind(this));
        inv.on('removed-item', this.findRecipe.bind(this));

        let craft = this.inventories.getInventory('craft');
        if(!craft) craft = this.inventories.createInventory({
            id: 'craft',
            rows: 1,
            columns: 1,
            items: []
        });
        craft.on('removed-item', this.removeCrafted.bind(this))
        this.craftedInventory = craft;
        this.craftingInventory = inv;
    }

    ngAfterViewInit() {
        // load inventory
    }

    ngOnDestroy() {
        console.log('TRANSFER BACK');
        let inventory = this.inventories.getInventory('stash');
        if(this.craftingInventory?.items && inventory) {
            
            for(let item of this.craftingInventory.items) {
                delete item.pos;

            }
        }

    }

    onDragOver(ev: DragEvent, x: number, y: number){
        // dragging over inventory slots
        if(this.craftingInventory) {
            let targetCell = {
                x: x - this.inventories.pickedUp.x,
                y: y - this.inventories.pickedUp.y
            }
            let max = {
                x: targetCell.x + this.inventories.pickedSize.x,
                y: targetCell.y + this.inventories.pickedSize.y
            }
            let canPlace = true;
            if (targetCell.x >= 0 && targetCell.y >= 0 && max.x <= this.columns && max.y <= this.rows){
                for (let x = 0; x < this.inventories.pickedSize.x; x ++) {
                    for (let y = 0; y < this.inventories.pickedSize.y; y ++) {
                        let cell = this.craftingInventory.cells[y + targetCell.y][x + targetCell.x];
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
            if(inventory && this.craftingInventory) {
                if(item.id) inventory.removeItem(item.id);
                this.craftingInventory.pushItem(item);
            }
            
            this.findRecipe()
        }
    }

    removeCrafted() {
        let itemsToRemove: string[] = [];
        for(let item of this.craftingInventory.items) {
            if(item.id) {
                if(item.stackable && item.amount && item.amount >= 2) {
                    item.amount-= 1;
                } else {
                    itemsToRemove.push(item.id);
                }
            } else {
                console.log('UH how no id?');
                
            }
        }
        for(let id of itemsToRemove) this.craftingInventory.removeItem(id);
        this.findRecipe();
    }

    findRecipe() {
        
        let xr = [];
        let yr = [];
        
        let inv = this.craftingInventory;
        for(let x = 0; x < inv.rows; x++) {
            for(let y = 0; y < inv.columns; y++) {
                if(['number', 'string'].indexOf(typeof inv.cells[x][y]) < 0) {
                    yr.push(y);
                    xr.push(x);
                    let item = inv.cells[x][y];
                    console.log(item, x, y);
                }
            }
        }
        let top = Math.min(...yr);
        let right = Math.max(...xr);
        let bottom = Math.max(...yr);
        let left = Math.min(...xr);
        
        console.log(top, right, bottom, left, xr, yr);
        

        let width = right - left + 1;
        let height = bottom - top + 1;

        let craftItems: string[] = [];

        for(let x = left; x < left + width; x++) {
            for(let y = top; y < top + height; y++) {
                if(['number', 'string'].indexOf(typeof inv.cells[x][y]) < 0) {
                    let item = <Item>inv.cells[x][y];
                    craftItems.push(item.name);
                } else {
                    craftItems.push('');
                }
            }
        }

        let str = `${height},${width}:${craftItems.join(',')}`;
        console.log('Recipe ID', str);
            
        if(recipies[str]) {
            let recipe = recipies[str];
            let item = items[recipe.item]
            if(item) {
                if(recipe.amount && item.stackable) {
                    item.amount = recipe.amount
                }
            }
            this.craftedInventory.pushItem(item);
        } else {
            this.craftedInventory.empty();
        }
    }

}