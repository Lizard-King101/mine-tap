import { Component } from "@angular/core";
import { LevelService } from "../_services/level.service";

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomePage {
    constructor(public level: LevelService) {}
}