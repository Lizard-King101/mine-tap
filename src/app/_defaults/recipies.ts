/*
    Recipe format
    `width,height:comma seperated list Array[][] of item names`

    [
        ['iron_ingot','iron_ingot','iron_ingot'],
        ['blank',     'stick',     'blank'],
        ['blank',     'stick',     'blank']
    ]

    is encoded as

    `3,3:iron_ingot,iron_ingot,iron_ingot,blank,stick,blank,blank,stick,blank`
*/

export const recipies: Recipies = {
    '1,1:oak_log': {
        item: 'oak_planks',
        amount: 4
    },
    '1,2:oak_planks,oak_planks': {
        item: 'stick',
        amount: 4
    },
    '2,2:clay,clay,clay,clay': {
        item: 'clay_block',
        amount: 1
    },
    '1,1:clay_block': {
        item: 'clay',
        amount: 4
    },
    '2,2:brick,brick,brick,brick': {
        item: 'bricks',
        amount: 1
    },
    '3,3:coal,coal,coal,coal,coal,coal,coal,coal,coal': {
        item: 'block_of_coal',
        amount: 1
    },
    '1,1:block_of_coal': {
        item: 'coal',
        amount: 9
    }
}

export interface Recipies {
    [key:string]: {
        item: string;
        amount: number;
    }
}
