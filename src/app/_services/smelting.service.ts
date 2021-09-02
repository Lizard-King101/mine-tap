import { Injectable } from "@angular/core";
import { Item } from "../_components/item/item";
import { items } from "../_defaults/items";
import { Inventory } from "../_objects/inventory";
import { Inventories } from "./Inventories";

const ids = {
    fuel: 'smelting-fuel',
    item: 'smelting-item',
    result: 'smelting-smelted'
}

@Injectable()
export class SmeltingService {
    fuelInventory: Inventory;
    itemInventory: Inventory;
    resultInventory: Inventory;

    fuelItem?: Item;
    smeltItem?: Item;
    resultItem?: Item;

    startFuelTime: number = 0;
    currentFuelTime: number = 0;

    startSmeltTime: number = 0;
    currentSmeltTime: number = 0;

    smeltInterval?: NodeJS.Timeout;
    fuelInterval?: NodeJS.Timeout;

    time: {
        [key:string]: Time;
    } = { }

    newTime(key: string) {
        this.time[key] = {
            now: new Date().getTime(),
            last: 0,
            deltaTime: 0
        }
        return this.time[key];
    }
    
    get canSmelt(): boolean {
        if((this.fuelItem || this.currentFuelTime) && this.smeltItem) {
            if(this.smeltItem.attributes.smelts && items[this.smeltItem.attributes.smelts.item]) {
                let item = items[this.smeltItem.attributes.smelts.item];
                if(this.resultItem) {
                    // check if same item and can stack
                    if(item.name == this.resultItem.name) {
                        if(this.resultItem.stackable && (!this.resultItem.amount || this.resultItem.amount < this.resultItem.stackable)) {
                            return true;
                        }
                    }
                } else {
                    return true;
                }
            }
        }
        return false;
    }

    constructor(private inventories: Inventories) {
        let fuel = this.inventories.getInventory(ids.fuel);
        if(!fuel) fuel = this.inventories.createInventory({
            id: ids.fuel,
            rows: 1,
            columns: 1,
            items: [],
            filters: ['attr:fuel']
        });

        let item = this.inventories.getInventory(ids.item);
        if(!item) item = this.inventories.createInventory({
            id: ids.item,
            rows: 1,
            columns: 1,
            items: [],
            filters: ['attr:smelts']
        });

        let result = this.inventories.getInventory(ids.result);
        if(!result) result = this.inventories.createInventory({
            id: ids.result,
            rows: 1,
            columns: 1,
            items: [],
            noDrop: true
        });

        this.fuelInventory = fuel;
        this.itemInventory = item;
        this.resultInventory = result;

        this.setupListeners();
    }

    checkSmelting() {
        console.log(this.smeltItem, this.fuelItem);
        
        if(this.canSmelt) {
            console.log('CAN SMELT');
            this.setFuelTimer();

        } else {
            console.log('CANT SMELT');
            
        }
    }

    setSmeltTimer() {

    }

    setFuelTimer() {
        if(this.fuelItem && this.fuelItem.attributes.fuel) {
            this.fuelInterval = setInterval(() => {
                let time = this.time['fuel'];
                if(!time) time = this.newTime('fuel');
                time.now = new Date().getTime();
                time.deltaTime = time.last ? time.now - time.last : 200;

                if(this.currentFuelTime > 0) {
                    this.currentFuelTime -= time.deltaTime;
                    console.log('Left', this.currentFuelTime);
                    
                    
                } else if(this.fuelItem && this.fuelItem.attributes.fuel && this.fuelItem.id) {
                    console.log('Cost Fuel');
                    this.currentFuelTime = this.startFuelTime = this.fuelItem.attributes.fuel;
                    if(this.fuelItem.stackable && this.fuelItem.amount != null && this.fuelItem.amount > 1) {
                        this.fuelItem.amount--;
                    } else {
                        this.fuelInventory.removeItem(this.fuelItem.id);
                    }
                } else {
                    if(this.fuelInterval) {
                        clearInterval(this.fuelInterval);
                    }
                    this.fuelInterval = undefined;
                }

                time.last = time.now;
            }, 100);
        }
    }

    setupListeners() {
        this.fuelInventory.on('update-items', () => {
            console.log('ON UPDATE FUEL');
            
            if(this.fuelInventory.items.length) {
                this.fuelItem = this.fuelInventory.items[0];
                this.checkSmelting();
            }
        });
        this.fuelInventory.on('removed-item', () => {
            if(!this.fuelInventory.items.length) {
                this.fuelItem = undefined;
                this.checkSmelting();
            }
        })

        this.itemInventory.on('update-items', () => {
            console.log('ON UPDATE SMELT');
            if(this.itemInventory.items.length) {
                this.smeltItem = this.itemInventory.items[0];
                this.checkSmelting();
            }
        });
        this.itemInventory.on('removed-item', () => {
            if(!this.itemInventory.items.length) {
                this.smeltItem = undefined;
                this.checkSmelting();
            }
        })

        this.resultInventory.on('update-items', () => {
            if(this.resultInventory.items.length) {
                this.resultItem = this.resultInventory.items[0];
                this.checkSmelting();
            }
        });
        this.resultInventory.on('removed-item', () => {
            if(!this.resultInventory.items.length) {
                this.resultItem = undefined;
                this.checkSmelting();
            }
        })
    }
}

interface Time {
    now: number;
    last: number;
    deltaTime: number;
}