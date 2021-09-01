import { blocks } from "../_defaults/blocks";
import { items } from "../_defaults/items";
import { Inventories } from "../_services/Inventories";
import { LevelService } from "../_services/level.service";
import { Block } from "./block";
import { helpers } from "./helpers";

export class Level {
    name: string;
    depth: number;
    blocks: Block[] = [];

    blocks_broken: number = 0;

    get floor_texture(): string {
        if(this.options.floor_texture) return this.options.floor_texture;
        else return '';
    }
 
    get wall_texture(): string {
        if(this.options.wall_texture) return this.options.wall_texture;
        else return this.floor_texture;
    }
 
    constructor(private options: LevelOptions, private parent: LevelService, private inventories: Inventories) {
        this.name = options.name;
        this.depth = options.depth;

        for(let i = 0; i < this.depth; i++) {
            let block = this.options.blocks[Math.floor(Math.random() * this.options.blocks.length)];
            let b = new Block(blocks[block] ? blocks[block] : blocks.dirt, this);
            this.blocks.push(b);
        }
    }

    async destroyBlock(block: Block) {
        for(let i = 0; i < this.blocks.length; i++) { 
            let b = this.blocks[i];
            if(b == block) {
                if(i == 0) {
                    this.blocks.shift();
                } else {
                    this.blocks.splice(i, 1);
                }
                // console.log(this.blocks);
                let inventory = this.inventories.getInventory('stash')

                if(inventory) {
                    if(block.drops) {
                        console.log('MAKE DROPS');
                        if(typeof block.drops.items == 'string') {
                            // single item or stack
                            if(items[block.drops.items]) {
                                let item = Object.assign({}, items[block.drops.items]);
                                if(block.drops.amount && item.stackable) {
                                    item.amount = Math.floor(helpers.gaussianRandom() * (block.drops.amount.max - block.drops.amount.min)) + block.drops.amount.min;
                                }
                                inventory.addItem(item);
                            } else {
                                console.log('ITEM NOT FOUND');
                            }
                        } else {
                            // multiple items

                        }
                    } else {
                        if(items[block.name]) {
                            let item = items[block.name];
                            if(item.stackable) item.amount = 1;
                            inventory.addItem(item);
                        } else {
                            console.log('Item not found');
                            
                        }
                    }
                }
                this.blocks_broken ++;
                if(!this.blocks.length) this.parent.nextLevel();
                return;
            }
        }
    }
}

export interface LevelOptions {
    name: string;
    depth: number;
    blocks: string[];
    wall_texture?: string;
    floor_texture?: string;
}