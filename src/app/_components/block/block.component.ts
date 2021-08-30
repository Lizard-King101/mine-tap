import { Component, Input, OnInit } from "@angular/core";
import { Block } from "src/app/_objects/block";

@Component({
    selector: 'block',
    templateUrl: 'block.component.html',
    styleUrls: ['block.component.scss']
})
export class BlockComponent implements OnInit {
    @Input('block') block?: Block;
    @Input('index') index: number = 0;

    constructor() {

    }

    ngOnInit() {
        console.log(this.block, this.index);
        
    }

    onDamage() {
        
    }
}