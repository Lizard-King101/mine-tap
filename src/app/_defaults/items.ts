import { Item } from "../_components/item/item";

export const items: {
    [key: string]: Item
} = {
    'grass': {
        name: 'grass',
        label: 'Grass',
        type: 'block',
        size: {
            x: 1,
            y: 1
        },
        attributes: {},
        lore: '',
        amount: 0,
        stackable: 64,
        icon: 'blocks/grass_top.jpg'
    },
    'dirt': {
        name: 'dirt',
        label: 'Dirt',
        type: 'block',
        size: {
            x: 1,
            y: 1
        },
        attributes: {},
        lore: '',
        amount: 0,
        stackable: 64,
        icon: 'blocks/dirt.webp'
    },
    'stick': {
        name: 'stick',
        label: 'Stick',
        type: 'item',
        size: {
            x: 1,
            y: 1
        },
        attributes: {
            fuel: 600
        },
        lore: '',
        amount: 0,
        stackable: 64,
        icon: 'items/stick.webp'
    },
    'oak_log': {
        name: 'oak_log',
        label: 'Oak Log',
        type: 'block',
        size: {
            x: 1,
            y: 1
        },
        attributes: {
            fuel: 7000
        },
        lore: '',
        amount: 0,
        stackable: 64,
        icon: 'blocks/oak_log.webp'
    },
    'oak_planks': {
        name: 'oak_planks',
        label: 'Oak Planks',
        type: 'block',
        size: {
            x: 1,
            y: 1
        },
        attributes: {
            fuel: 1500
        },
        lore: '',
        amount: 0,
        stackable: 64,
        icon: 'blocks/oak_planks.webp'
    },
    'gravel': {
        name: 'gravel',
        label: 'Gravel',
        type: 'block',
        size: {
            x: 1,
            y: 1
        },
        attributes: {},
        lore: '',
        amount: 0,
        stackable: 64,
        icon: 'blocks/gravel.webp'
    },
    'clay_block': {
        name: 'clay_block',
        label: 'Clay Block',
        type: 'block',
        size: {
            x: 1,
            y: 1
        },
        attributes: {},
        lore: '',
        amount: 0,
        stackable: 64,
        icon: 'blocks/clay.webp'
    },
    'clay': {
        name: 'clay',
        label: 'Clay',
        type: 'item',
        size: {
            x: 1,
            y: 1
        },
        attributes: {
            smelts: {
                item: 'brick',
                time: 4000
            }
        },
        lore: '',
        amount: 0,
        stackable: 64,
        icon: 'items/clay.webp'
    },
    'brick': {
        name: 'brick',
        label: 'Brick',
        type: 'item',
        size: {
            x: 1,
            y: 1
        },
        attributes: {},
        lore: '',
        amount: 0,
        stackable: 64,
        icon: 'items/brick.webp'
    },
    'bricks': {
        name: 'bricks',
        label: 'Bricks',
        type: 'block',
        size: {
            x: 1,
            y: 1
        },
        attributes: {},
        lore: '',
        amount: 0,
        stackable: 64,
        icon: 'blocks/bricks.webp'
    },
    'granite': {
        name: 'granite',
        label: 'Granite',
        type: 'block',
        size: {
            x: 1,
            y: 1
        },
        attributes: {},
        lore: '',
        amount: 0,
        stackable: 64,
        icon: 'blocks/granite.webp'
    },
    'andesite': {
        name: 'andesite',
        label: 'Andesite',
        type: 'block',
        size: {
            x: 1,
            y: 1
        },
        attributes: {},
        lore: '',
        amount: 0,
        stackable: 64,
        icon: 'blocks/andesite.webp'
    },
    'stone': {
        name: 'stone',
        label: 'Stone',
        type: 'block',
        size: {
            x: 1,
            y: 1
        },
        attributes: {},
        lore: '',
        amount: 0,
        stackable: 64,
        icon: 'blocks/stone.webp'
    },
    'iron_ore': {
        name: 'iron_ore',
        label: 'Iron Ore',
        type: 'block',
        size: {
            x: 1,
            y: 1
        },
        attributes: {
            smelts: {
                item: 'iron_ingot',
                time: 3000
            }
        },
        lore: '',
        amount: 0,
        stackable: 64,
        icon: 'blocks/iron_ore.webp'
    },
    'iron_ingot': {
        name: 'iron_ingot',
        label: 'Iron Ingot',
        type: 'item',
        size: {
            x: 1,
            y: 1
        },
        attributes: {},
        lore: '',
        amount: 0,
        stackable: 64,
        icon: 'items/iron_ingot.webp'
    },
    'coal_ore': {
        name: 'coal_ore',
        label: 'Coal Ore',
        type: 'block',
        size: {
            x: 1,
            y: 1
        },
        attributes: {},
        lore: '',
        amount: 0,
        stackable: 64,
        icon: 'blocks/coal_ore.webp'
    },
    'coal': {
        name: 'coal',
        label: 'Coal',
        type: 'item',
        size: {
            x: 1,
            y: 1
        },
        attributes: {
            fuel: 10000
        },
        lore: '',
        amount: 0,
        stackable: 64,
        icon: 'items/coal.webp'
    },
    'block_of_coal': {
        name: 'block_of_coal',
        label: 'Block of Coal',
        type: 'block',
        size: {
            x: 1,
            y: 1
        },
        attributes: {
            fuel: 120000
        },
        lore: '',
        amount: 0,
        stackable: 64,
        icon: 'blocks/block_of_coal.webp'
    },
    'obsidian': {
        name: 'obsidian',
        label: 'Obsidian',
        type: 'block',
        size: {
            x: 1,
            y: 1
        },
        attributes: {},
        lore: '',
        amount: 0,
        stackable: 64,
        icon: 'blocks/obsidian.webp'
    }
}