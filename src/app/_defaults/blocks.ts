import { BlockOptions } from "../_objects/block";

export const blocks: {
    [key: string]: BlockOptions; 
} = {
    'grass': {
        label: 'Grass',
        name: 'grass',
        health: 50,
        rarity: 80,
        texture: 'grass_top.jpg'
    },
    'dirt': {
        label: 'Dirt',
        name: 'dirt',
        health: 50,
        rarity: 80,
        texture: 'dirt.webp'
    },
    'oak_log': {
        label: 'Oak Log',
        name: 'oak_log',
        health: 25,
        rarity: 85,
        texture: 'oak_log.webp'
    },
    'gravel': {
        label: 'Gravel',
        name: 'gravel',
        health: 50,
        rarity: 80,
        texture: 'gravel.webp'
    },
    'clay_block': {
        label: 'Clay',
        name: 'clay_block',
        health: 50,
        rarity: 80,
        texture: 'clay.webp',
        drops: {
            items: 'clay',
            amount: {
                min: 4,
                max: 12
            }
        }
    },
    'granite': {
        label: 'Granite',
        name: 'granite',
        health: 50,
        rarity: 80,
        texture: 'granite.webp'
    },
    'andesite': {
        label: 'Andesite',
        name: 'andesite',
        health: 50,
        rarity: 80,
        texture: 'andesite.webp'
    },
    'stone': {
        label: 'Stone',
        name: 'stone',
        health: 100,
        rarity: 80,
        texture: 'stone.webp'
    },
    'iron_ore': {
        label: 'Iron Ore',
        name: 'iron_ore',
        health: 200,
        rarity: 50,
        texture: 'iron_ore.webp'
    },
    'coal_ore': {
        label: 'Coal Ore',
        name: 'coal_ore',
        health: 100,
        rarity: 80,
        texture: 'coal_ore.webp',
        drops: {
            items: 'coal',
            amount: {
                min: 4,
                max: 12
            }
        }
    },
    'obsidian': {
        label: 'Obsidian',
        name: 'obsidian',
        health: 1000,
        rarity: 40,
        texture: 'obsidian.webp'
    }
}