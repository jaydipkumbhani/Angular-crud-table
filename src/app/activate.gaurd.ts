
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";


@Injectable()
export class ActivateGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (this.userService.isAdminRights()) {
            return true;
        } else {
            alert("You don't have permission to view this page, Redirecting to userlist");
            this.router.navigate(['/'])
        };
        return false;
    }
}


