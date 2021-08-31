import { Injectable } from "@angular/core";
import { Inventory } from "../_components/inventory/inventory";
import { Item } from "../_components/item/item";

@Injectable()
export class Inventories {
    private list: {
        [key:string]: Inventory
    } = {};

    public windows: string[] = [];
    public indexs = [];

    itemAction: string = '';
    item?: Item;
    pickedUp = {x: 0,y: 0};
    pickedSize = {x: 0,y: 0};

    private inventories: any = {
        stash: {
            label: 'Stash',
            size: {
                c: 7,
                r: 64
            },
            items: [
                
            ]
        }
    }

    constructor() { }

    public getInventory(id: string): Promise<Inventory | undefined> {
        return new Promise((res)=>{
            if(this.list[id]) res(this.list[id]);
            else res(undefined)
        })
    }

    public submitInventory(inventory: Inventory) {
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
        this.inventories[options.id] = {
                label: options.label,
                size: {
                    c: options.width,
                    r: options.height
                },
                filters: options.filters,
                items: []
        }
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

export interface InventoryOptions {
    id: string;
    label: string;
    width: number;
    height: number;
    filters?: string[];
}