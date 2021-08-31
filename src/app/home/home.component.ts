import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { BlockComponent } from "../_components/block/block.component";
import { LevelService } from "../_services/level.service";

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomePage implements AfterViewInit{
    @ViewChild('block') block?: BlockComponent;
    @ViewChild('gameArea') gameArea?: ElementRef<HTMLElement>;
    clickInterval?: NodeJS.Timeout; 

    constructor(public level: LevelService) {}

    ngAfterViewInit() {
        if(this.gameArea) {
            let area = this.gameArea.nativeElement;
            area.addEventListener('mousedown', this.onMouseDown.bind(this));
            area.addEventListener('mouseup', this.onMouseUp.bind(this));
        }
    }

    onMouseDown() {
        console.log(this);
        
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
}