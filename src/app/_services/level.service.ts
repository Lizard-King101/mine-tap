import { Injectable } from "@angular/core";
import { Block } from "../_objects/block";
import { Level } from "../_objects/level";

@Injectable()
export class LevelService {
    private level?: Level;

    get getTopBlocks(): Block[] {
        if(this.level) return this.level.blocks.filter((b, i) => i <= 1)
        else return [];
    }

    constructor() {
        this.level = new Level({
            name: 'Plains',
            depth: 200,
            blocks: [
                {
                    name: 'Grass',
                    health: 50,
                    rarity: 80,
                    texture: 'grass_top.jpg'
                },
                {
                    name: 'Dirt',
                    health: 50,
                    rarity: 80,
                    texture: 'dirt.webp'
                },
                {
                    name: 'Gravel',
                    health: 50,
                    rarity: 80,
                    texture: 'gravel.webp'
                },
                {
                    name: 'Clay',
                    health: 50,
                    rarity: 80,
                    texture: 'clay.webp'
                }
            ]
        }, this);

        console.log(this.level);
        
    }

    destroyBlock(block: Block) {

    }
}