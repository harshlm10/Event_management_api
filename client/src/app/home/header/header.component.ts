import { Component, Input } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: "app-header",
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {
    @Input() heading: String = ""
    @Input() show: any = null

    constructor(private router: Router) { }

    onLogout() {
        this.router.navigate(['..'])
    }
}