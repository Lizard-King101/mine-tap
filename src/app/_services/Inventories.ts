import { Injectable } from "@angular/core";
import { InventoryComponent } from "../_components/inventory/inventory";
import { Item } from "../_components/item/item";
import { items } from "../_defaults/items";
import { Inventory, InventoryOptions } from "../_objects/inventory";

@Injectable()
export class Inventories {
    private list: {
        [key:string]: any
    } = {};

    public windows: string[] = [];
    public indexs = [];

    itemAction: string = '';
    item?: Item;
    pickedUp = {x: 0,y: 0};
    pickedSize = {x: 0,y: 0};

    private inventories: {
        [key:string]: InventoryOptions
    } = {
        stash: {
            id: 'stash',
            label: 'Stash',
            columns: 7,
            rows: 64,
            items: []
        }
    }

    constructor() {
        for(let [key, options] of Object.entries(this.inventories)) {
            let inv = new Inventory(options, this);
            this.list[key] = inv;
            inv.pushItem(items['iron_ore'], 64);
            inv.pushItem(items['coal'], 64);
        }
    }

    public getInventory(id: string): Inventory | undefined {
        if(this.list[id]) return this.list[id];
        else return undefined;
    }

    public submitInventory(inventory: any) {
        if(inventory.id)
        this.list[inventory.id] = inventory;
    }

    public loadInventory(id: string) {
        // eventaully wil load from local flat file
        return new Promise((res)=>{
            if(this.inventories[id]) res(this.inventories[id]);
            else res(false);
        })
    }

    public createInventory(options: InventoryOptions) {
        let inv = new Inventory(options, this);
        this.list[options.id ? options.id : this.getId()] = inv;
        return inv;
    }

    public closeWindow(id: string) {
        this.windows.forEach((window, index)=>{
            if(window == id) this.windows.splice(index, 1);
        });
    }

    public saveInventory(inventory: any, id: string){
        this.inventories[id] = inventory;
    }

    getSize(num: number){
        return (50 * num) + (2 * (num - 1)) 
    }

    getId () {
        return new Date().getTime().toString(36).substr(2,9)+Math.random() * 99999;
    }
}