import { Component, AfterViewInit, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { Inventories } from "../../_services/Inventories";
import { Item } from "../item/item";

@Component({
    selector: 'inventory',
    templateUrl: 'inventory.html',
    styleUrls: ['inventory.scss']
})
export class Inventory implements AfterViewInit{
    @ViewChild('invContainer') invContainer: any;
    @Output('inventoryWidth') width = new EventEmitter()
    @Input() columns: number = 0;
    @Input() rows: number = 0;
    @Input() id?: string;
    label = "";
    cells: any[][] = [];
    filters = [];
    items: Item[] = [];
    constructor(private inventories: Inventories) { }

    ngAfterViewInit() {
        // load inventory
        if(this.id)
        this.inventories.loadInventory(this.id).then((inventory:any)=>{
            // if inventory load items

            if(inventory){
                this.columns = inventory.size.c;
                this.rows = inventory.size.r;
                this.label = inventory.label;
                this.width.emit((this.inventories.getSize(this.columns) + 18).toString());
                if(inventory.filters) this.filters = inventory.filters;

                for(let i = 0; i < inventory.items.length; i++) {
                    let item: Item = inventory.items[i];
                    if(!item.id) item.id = this.inventories.getId();
                    this.items.push(item);
                }
                // submit inventory to inventories sefvice for other inventories to access
                this.inventories.submitInventory(this);
                this.reCalc();
            }
           
        })
    }

    onDragOver(ev: DragEvent, x: number, y: number){
        // dragging over inventory slots
        if(this.inventories) {
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
                        let cell = this.cells[y + targetCell.y][x + targetCell.x];
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
            this.inventories.getInventory(ev.dataTransfer.getData('inventory')).then((inventory?: Inventory) => {
                if(inventory) {
                    if(item.id) inventory.removeItem(item.id);
                    this.items.push(item);
                    this.save();
                    if(this.id !== inventory.id) inventory.save();
                    this.reCalc();
                }
            });
        }
    }

    reCalc() {
        // recalculate the cells of an inventory replace place items and empty cells
        this.setCells();
        for(let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if(!item.id) item.id = this.inventories.getId();
            if(item.pos) {
                for(let x = 0; x < item.size.x; x ++) {
                    for(let y = 0; y < item.size.y; y ++){
                        if(x > 0 || y > 0){
                            let cellPos = {
                                x: x + item.pos.x,
                                y: y + item.pos.y
                            }
                            this.cells[cellPos.y][cellPos.x] = 'filled';
                        }
                    }
                }
                this.cells[item.pos.y][item.pos.x] = item;
                
            } else {
                let space: any = this.findSPace(item);
                if(space) {
                    let [c,r] = this.getXY(space.targetCell);
                    item.pos = {x: c, y: r};
                    this.cells[r][c] = item;
                    for(let c = 1; c < space.fillCells.length; c ++){
                        let [x, y] = this.getXY(space.fillCells[c]);
                        this.cells[y][x] = 'filled';
                    }
                }
            }
        }
    }

    findSPace(item: Item) {
        for(let i = 0; i < this.rows * this.columns; i ++){
            let cell = i;
            let placeCells = [];
            let canPlace = true;
            
            let invPos = {
                x: i % this.columns,
                y: Math.floor(i / this.columns)
            }
            
            for(let x = 0; x < item.size.x; x++){

                for(let y = 0; y < item.size.y; y++){
                    let cellPos = {
                        x: x + invPos.x, 
                        y: y + invPos.y
                    };
                    if(this.cells[cellPos.y][cellPos.x]) {
                        canPlace = false;
                        break;
                    }
                    if(canPlace && (cellPos.x > this.columns - 1 || cellPos.y > this.rows - 1)){
                        canPlace = false;
                        break;
                    }
                    // push index of cell
                    placeCells.push(this.getIndex(cellPos.x, cellPos.y));
                    
                }
                // move on to next cell
                if(!canPlace) break;
            }

            if(canPlace){
                return {targetCell: cell, fillCells: placeCells};
            }else if(i == (this.rows * this.columns) - 1){
                return false;
            }
        }
    }

    addItem(item: Item) {
        if(item.stackable && item.amount) {
            this.stackItem(item);
        } else {
            console.log('NO STACK', item);
            
            this.items.push(item);
            this.reCalc();
        }
    }

    stackItem(item: Item) {
        console.log('STACK ITEM', item);
        if(item.amount && item.stackable) {
            let foundStackable: Item | undefined = undefined;
            
            for(let iitem of this.items) {
                if(item.name == iitem.name && iitem.amount && iitem.stackable && iitem.amount < iitem.stackable) {
                    foundStackable = iitem;
                    console.log('Stackable', foundStackable);
                    break;
                }
            }
            if(foundStackable && foundStackable.amount && foundStackable.stackable) {
                if(foundStackable.amount + item.amount > foundStackable.stackable) {
                    let overflow = foundStackable.amount + item.amount - foundStackable.stackable;
                    item.amount = overflow;
                    foundStackable.amount = foundStackable.stackable;
                    console.log('overflow', foundStackable, item);
                    this.stackItem(item);
                    
                } else {
                    foundStackable.amount = foundStackable.amount + item.amount;
                    // console.log('fullstack', foundStackable, item.amount);
                    
                }
                console.log(this.items);
                
                
            } else {
                // console.log('Push new item');
                this.items.push(Object.assign({}, item));
                this.reCalc();
            }
        }
    }

    removeItem(id: string) {
        console.log(this.items);
        for(let i = 0; i < this.items.length; i++){
            let item = this.items[i];
            if (item.id === id) {
                this.items.splice(i, 1);
                console.log(this.items);
                this.reCalc();
            }
        }
    }

    getIndex(x: number, y: number) {
        return x + this.columns * y;
    }

    getXY(index: number) {
        return [index % this.columns, Math.floor(index / this.columns)];
    }

    setCells() {
        this.cells = Array(this.rows).fill(0).map(x => Array(this.columns).fill(0));
    }

    getArray(n: number) {
        return Array(n);
    }

    save() {
        if(this.id)
        this.inventories.saveInventory({
            label: this.label,
            size: {
                c: this.columns,
                r: this.rows
            },
            items: this.items
        }, this.id);
    }
}
