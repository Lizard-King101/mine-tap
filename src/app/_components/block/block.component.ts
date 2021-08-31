import { Component, Input, OnInit } from "@angular/core";
import { Block } from "src/app/_objects/block";
import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations';

const DAMAGE_FRAMES = 10;

@Component({
    selector: 'block',
    templateUrl: 'block.component.html',
    styleUrls: ['block.component.scss'],
    animations: [
        trigger('blockIndex', [
            transition('* => 0', [
                style({
                    width: '50%',
                    height: '50%',
                    zIndex: 0
                }),
                animate(200, style({
                    width: '100%',
                    height: '100%'
                }))
            ]),
            state('0', style({
                width: '100%',
                height: '100%',
            }))
        ])
    ]
})
export class BlockComponent implements OnInit {
    @Input('block') block?: Block;
    @Input('index') index: number = 0;

    get blockTexture(): string {
        if(this.block) return `url('assets/textures/blocks/${this.block.texture}')`;
        return '';
    }
    
    get damageOffset(): number {
        let percent = this.block ? this.block.getDamagePercent * 100 : 0;
        let step = 100 / DAMAGE_FRAMES;
        return percent - (percent % step);
    }

    get blockStyle() {
        return {
            backgroundImage: `url('assets/textures/blocks/damage.png'), ${this.blockTexture}`,
            'background-position': `${this.damageOffset}% center, center center`
        }
    }


    constructor() {

    }

    ngOnInit() {
        // console.log(this.block, this.index);
        // console.log(this.blockTexture);
    }

    onDamage(ev?: Event) {
        if(ev) ev.stopPropagation();
        this.block?.damage(200);
    }
}