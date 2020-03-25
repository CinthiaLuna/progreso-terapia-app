import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions
    ) {
        this.page.actionBarHidden = true;
    }
    ngOnInit() {

    }
    login() {
        this.routerExtensions.navigate(["./home"], { clearHistory: true });
    }
}
