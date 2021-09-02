import { LevelOptions } from "../_objects/level";

export const levels: LevelOptions[] = [
    {
        name: 'Plains',
        depth: 10,
        wall_texture: 'grass.webp',
        floor_texture: 'grass_top.jpg',
        blocks: [
            'grass',
            'dirt',
            'oak_log',
            'gravel',
            'clay_block'
        ]
    },
    {
        name: 'Stone',
        depth: 250,
        floor_texture: 'stone.webp',
        blocks: [
            'stone',
            'coal_ore',
            'iron_ore',
            'gravel',
            'gravel',
            'granite',
            'andesite'
        ]
    },
    {
        name: 'Deep Stone',
        depth: 300,
        floor_texture: 'stone.webp',
        blocks: [
            'stone',
            'coal_ore',
            'iron_ore',
            'coal_ore',
            'iron_ore',
            'gravel',
            'gravel',
            'granite',
            'andesite'
        ]
    },
    {
        name: 'Obsidian',
        depth: 30,
        floor_texture: 'obsidian.webp',
        blocks: [
            'obsidian',
        ]
    }
]