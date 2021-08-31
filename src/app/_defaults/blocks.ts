import { BlockOptions } from "../_objects/block";

export const blocks: {[key: string]: BlockOptions; } = {
    'grass': {
        name: 'Grass',
        health: 50,
        rarity: 80,
        texture: 'grass_top.jpg'
    },
    'dirt': {
        name: 'Dirt',
        health: 50,
        rarity: 80,
        texture: 'dirt.webp'
    },
    'oak_log': {
        name: 'Oak Log',
        health: 25,
        rarity: 85,
        texture: 'oak_log.webp'
    },
    'gravel': {
        name: 'Gravel',
        health: 50,
        rarity: 80,
        texture: 'gravel.webp'
    },
    'clay': {
        name: 'Clay',
        health: 50,
        rarity: 80,
        texture: 'clay.webp'
    },
    'granite': {
        name: 'Granite',
        health: 50,
        rarity: 80,
        texture: 'granite.webp'
    },
    'andesite': {
        name: 'Andesite',
        health: 50,
        rarity: 80,
        texture: 'andesite.webp'
    },
    'stone': {
        name: 'Stone',
        health: 100,
        rarity: 80,
        texture: 'stone.webp'
    },
    'iron_ore': {
        name: 'Iron Ore',
        health: 200,
        rarity: 50,
        texture: 'iron_ore.webp'
    },
    'coal_ore': {
        name: 'Coal Ore',
        health: 100,
        rarity: 80,
        texture: 'coal_ore.webp'
    },
}