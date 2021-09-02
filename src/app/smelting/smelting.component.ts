import { Component } from "@angular/core";
import { SmeltingService } from "../_services/smelting.service";

@Component({
    templateUrl: 'smelting.component.html',
    styleUrls: ['smelting.component.scss']
})
export class SmeltingPage {
    constructor(public smelting: SmeltingService) { }

}