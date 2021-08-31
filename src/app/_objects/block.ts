import { Level } from "./level";

export class Block {
    name: string;
    health: number;
    healthLeft: number;
    texture: string;
    drops?: Drops[];

    get getDamagePercent(): number {
        return 1 - this.healthLeft / this.health;
    }

    constructor(options: BlockOptions, private level: Level) {
        this.name = options.name;
        this.health = this.healthLeft = options.health;
        this.texture = options.texture;
        if(options.drops) this.drops = options.drops;
    }

    damage(amount: number) {
        this.healthLeft -= amount;
        if(this.healthLeft <= 0) this.level.destroyBlock(this);
    }
}

export interface BlockOptions {
    label: string;
    name: string;
    health: number;
    rarity: number;
    texture: string;
    drops?: Drops[];
}

interface Drops {
    items: string;
    min: number;
    amount?: {
        min: number;
        max: number;
    }
}

interface ItemDrop {
    item: string;
    rarity: number;
    amount?: {
        min: number;
        max: number;
    }
}