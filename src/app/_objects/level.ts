import { LevelService } from "../_services/level.service";
import { Block, BlockOptions } from "./block";

export class Level {
    name: string;
    depth: number;
    blocks: Block[] = [];

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
            let option = this.options.blocks[Math.floor(Math.random() * this.options.blocks.length)];
            let b = new Block(option, this);
            this.blocks.push(b);
        }
    }

    destroyBlock(block: Block) {
        for(let i = 0; i < this.blocks.length; i++) { 
            let b = this.blocks[i];
            if(b == block) {
                this.blocks.splice(i);
                return;
            }
        }
    }
}

export interface LevelOptions {
    name: string;
    depth: number;
    blocks: BlockOptions[];
    wall_texture?: string;
    floor_texture?: string;
}