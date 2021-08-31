import { blocks } from "../_defaults/blocks";
import { LevelService } from "../_services/level.service";
import { Block, BlockOptions } from "./block";

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
 
    constructor(private options: LevelOptions, private parent: LevelService) {
        this.name = options.name;
        this.depth = options.depth;

        for(let i = 0; i < this.depth; i++) {
            let block = this.options.blocks[Math.floor(Math.random() * this.options.blocks.length)];
            let b = new Block(blocks[block] ? blocks[block] : blocks.dirt, this);
            this.blocks.push(b);
        }
    }

    destroyBlock(block: Block) {
        for(let i = 0; i < this.blocks.length; i++) { 
            let b = this.blocks[i];
            if(b == block) {
                if(i == 0) {
                    this.blocks.shift();
                } else {
                    this.blocks.splice(i, 1);
                }
                console.log(this.blocks);
                this.blocks_broken ++;
                if(!this.blocks.length) this.parent.nextLevel()
                
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