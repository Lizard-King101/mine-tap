import { Level } from "./level";

export class Block {
    name: string;
    health: number;
    healthLeft: number;
    texture: string;

    get getDamagePercent(): number {
        return 1 - this.healthLeft / this.health;
    }

    constructor(options: BlockOptions, private level: Level) {
        this.name = options.name;
        this.health = this.healthLeft = options.health;
        this.texture = options.texture;

    }

    damage(amount: number) {
        console.log('DAMAGE');
        
        this.healthLeft -= amount;
        if(this.healthLeft <= 0) this.level.destroyBlock(this);
    }
}

export interface BlockOptions {
    name: string;
    health: number;
    rarity: number;
    texture: string;
}