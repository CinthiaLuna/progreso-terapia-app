import { Component } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent {
    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions
    ) {
        this.page.actionBarHidden = true;
    }
    login() {
        this.routerExtensions.navigate(["/home"], { clearHistory: true });
    }
}
