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

    get fuelPercent(): number {
        return this.currentFuelTime / this.startFuelTime * 100;
    }

    get smeltPercent(): number {
        return  this.currentSmeltTime ? 100 - (this.currentSmeltTime / this.startSmeltTime * 100) : 0;
    }

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
        if(this.canSmelt) {
            console.log('CAN SMELT');
            this.setFuelTimer();
        }
    }

    setSmeltTimer() {
        
        if(this.smeltItem && this.smeltItem.attributes.smelts && !this.smeltInterval) {
            this.newTime('smelt');
            this.currentSmeltTime = this.startSmeltTime = this.smeltItem.attributes.smelts.time;
            this.smeltInterval = setInterval(() => {
                let time = this.time['smelt'];
                time.now = new Date().getTime();
                time.deltaTime = time.last ? time.now - time.last : 200;

                if(this.currentSmeltTime - time.deltaTime > 0 && this.smeltItem) {
                    this.currentSmeltTime -= time.deltaTime;

                } else if(this.currentSmeltTime - time.deltaTime && this.smeltItem && this.smeltItem.attributes.smelts && this.smeltItem.id){
                    this.currentSmeltTime = this.startSmeltTime = this.smeltItem.attributes.smelts.time;
                    this.giveSmeltedItem(items[this.smeltItem.attributes.smelts.item]);
                    if(this.smeltItem.stackable && this.smeltItem.amount != null && this.smeltItem.amount > 1) {
                        this.smeltItem.amount--;
                    } else {
                        this.itemInventory.removeItem(this.smeltItem.id);
                    }
                }

                time.last = time.now;
            }, this.smeltItem.attributes.smelts.time / 20);
        }
    }

    setFuelTimer() {
        if(this.fuelItem && this.fuelItem.attributes.fuel && !this.fuelInterval) {
            this.newTime('fuel');
            this.setSmeltTimer();
            this.fuelInterval = setInterval(() => {
                let time = this.time['fuel'];
                time.now = new Date().getTime();
                time.deltaTime = time.last ? time.now - time.last : 200;

                if(this.currentFuelTime - time.deltaTime > 0 && this.smeltItem) {
                    this.currentFuelTime -= time.deltaTime;
                    
                    
                } else if(this.currentFuelTime - time.deltaTime <= 0 && this.fuelItem && this.fuelItem.attributes.fuel && this.fuelItem.id) {
                    console.log('Cost Fuel');
                    this.currentFuelTime = this.startFuelTime = this.fuelItem.attributes.fuel;
                    this.setSmeltTimer();
                    if(this.fuelItem.stackable && this.fuelItem.amount != null && this.fuelItem.amount > 1) {
                        this.fuelItem.amount--;
                    } else {
                        this.fuelInventory.removeItem(this.fuelItem.id);
                    }


                } else {
                    if(this.smeltInterval) {
                        clearInterval(this.smeltInterval);
                        this.smeltInterval = undefined;
                        this.currentSmeltTime = 0;
                        this.startSmeltTime = 0;
                    }
                    if(this.fuelInterval) {
                        clearInterval(this.fuelInterval);
                        this.fuelInterval = undefined;
                    }
                }

                time.last = time.now;
            }, this.fuelItem.attributes.fuel / 40);
        }
    }

    giveSmeltedItem(item: Item) {
        if(this.resultItem && this.resultItem.name == item.name && this.resultItem.stackable && this.resultItem.amount != null && this.resultItem.amount + 1 <= this.resultItem.stackable) {
            this.resultItem.amount++;
        } else {
            this.resultInventory.pushItem(item, 1);
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