import { animate, state, style, transition, trigger } from "@angular/animations";
import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { BlockComponent } from "../_components/block/block.component";
import { helpers } from "../_objects/helpers";
import { LevelService } from "../_services/level.service";

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    animations: [
        trigger('activePage', [
            state('shop', style({
                left: '0%'
            })),
            state('mine', style({
                left: '-100%'
            })),
            state('inventory', style({
                left: '-200%'
            })),
            transition('mine => inventory', [
                animate(200, style({
                    left: '-200%'
                }))
            ]),
            transition('inventory => mine', [
                animate(200, style({
                    left: '-100%'
                }))
            ]),
            transition('mine => shop', [
                animate(200, style({
                    left: '0%'
                }))
            ]),
            transition('shop => mine', [
                animate(200, style({
                    left: '-100%'
                }))
            ]),
            transition('* => inventory', [
                animate(400, style({
                    left: '-200%'
                }))
            ]),
            transition('* => shop', [
                animate(400, style({
                    left: '0%'
                }))
            ])
        ])
    ]
})
export class HomePage implements AfterViewInit{
    @ViewChild('block') block?: BlockComponent;
    @ViewChild('gameArea') gameArea?: ElementRef<HTMLElement>;
    tab: 'inventory' | 'shop' | 'mine' = 'mine';
    clickInterval?: NodeJS.Timeout; 

    constructor(public level: LevelService) {
        let nums: any = {};
        for(let i = 0; i < 5000; i++) {
            let num = Math.floor(helpers.gaussianRandom() * 100);
            if(nums[num]) nums[num] ++;
            else nums[num] = 1
        }
        console.log(nums);
        
    }

    ngAfterViewInit() {
        if(this.gameArea) {
            let area = this.gameArea.nativeElement;
            area.addEventListener('mousedown', this.onMouseDown.bind(this));
            area.addEventListener('mouseup', this.onMouseUp.bind(this));
        }
    }

    onMouseDown() {
        if(!this.clickInterval) {
            this.clickInterval = setInterval(() => {
                if(this.block) {
                    this.block.onDamage();
                }
            }, 200);
        }
    }

    onMouseUp() {
        if(this.clickInterval) {
            clearInterval(this.clickInterval);
            this.clickInterval = undefined;
        }
    }

    selectTab(tab: 'inventory' | 'shop' | 'mine') {
        this.tab = tab;
        console.log(this.tab);
        
    }
}