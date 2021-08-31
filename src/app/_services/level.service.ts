import { Injectable } from "@angular/core";
import { Block } from "../_objects/block";
import { Level } from "../_objects/level";

import { levels } from "../_defaults/levels";

@Injectable()
export class LevelService {
    private level?: Level;
    currentLevel: number = 0;
    lastBrokenBlocks: number = 0;

    get getTopBlocks(): Block[] {
        
        if(this.level) {
            return this.level.blocks.filter((b, i) => i < 1);
        }
        else return [];
    }

    get brokenBlocks(): number {
        if(this.level) return this.level.blocks_broken + this.lastBrokenBlocks;
        else return 0 + this.lastBrokenBlocks;
    }

    get floorTexture(): string {
        if(this.level) return `url('assets/textures/blocks/${this.level.floor_texture}')`;
        return '';
    }

    get wallTexture(): string {
        if(this.level) return `url('assets/textures/blocks/${this.level.wall_texture}')`;
        return '';
    }

    get name(): string {
        if(this.level) return this.level.name;
        else return '';
    }

    constructor() {
        this.level = new Level(levels[this.currentLevel], this);

        console.log(this.level);
        
    }

    nextLevel() {
        if(levels[this.currentLevel + 1]) {
            if(this.level) this.lastBrokenBlocks += this.level.blocks_broken;
            this.level = new Level(levels[this.currentLevel + 1], this);
            this.currentLevel++;
        }
    }
}