import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    constructor(private router: Router) { }

    adminUserName: String = "";
    adminPassword: String = "";

    builderUserName: String = "";
    builderPassword: String = "";

    architectUserName: String = "";
    architectPassword: String = "";

    handleAdminUserNameChange(event: Event) {
        this.adminUserName = (<HTMLInputElement>event.target).value
    }

    handleAdminPasswordChange(event: Event) {
        this.adminPassword = (<HTMLInputElement>event.target).value
    }

    handleBuilderUserNameChange(event: Event) {
        this.builderUserName = (<HTMLInputElement>event.target).value
    }

    handleBuilderPasswordChange(event: Event) {
        this.builderPassword = (<HTMLInputElement>event.target).value
    }

    handleArchitectUserNameChange(event: Event) {
        this.architectUserName = (<HTMLInputElement>event.target).value
    }

    handleArchitectPasswordChange(event: Event) {
        this.architectPassword = (<HTMLInputElement>event.target).value
    }
    onAdminLogin() {
        if (!this.adminUserName || !this.adminPassword) {
            alert("Username and Password field cannot be empty")
            return;
        }
        fetch("http://localhost:5000/api/v1/admin/login", {
            method: "POST",
            mode: "cors",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({ "uname": this.adminUserName, "pwd": this.adminPassword })
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    alert(data.msg)
                }
                else {
                    // alert(data.msg + " Now Redirect")
                    this.router.navigate(['/admin'])
                }
                return;
            })
            .catch(err => {
                console.log(err)
                return
            })

        console.log(this.adminUserName + "\n" + this.adminPassword)
        return
    }

    onBuilderLogin() {
        if (!this.builderUserName || !this.builderPassword) {
            alert("Username and Password field cannot be empty")
            return;
        }

        fetch("http://localhost:5000/api/v1/builder/login", {
            method: "POST",
            mode: "cors",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": this.builderUserName, "password": this.builderPassword })
        })
            .then(Response => Response.json())
            .then(data => {
                if (!data.success) {
                    alert(data.msg)
                    return;
                }
                else {
                    this.router.navigate(['/builder'], {
                        queryParams: {
                            name: this.builderUserName
                        }
                    })
                }
            })
            .catch(err => console.log(err + " Occured"))

        // console.log(this.builderUserName + "\n" + this.builderPassword)
    }

    onArchitectLogin() {
        if (!this.architectUserName || !this.architectPassword) {
            alert('username and password field cannot be empty!!')
            return;
        }

        fetch('http://localhost:5000/api/v1/architect/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({ username: this.architectUserName, password: this.architectPassword })
        }).then(Response => Response.json())
            .then(data => {
                console.log(data)
                if (!data.success) {
                    alert(data.msg)
                    return;
                }
                else {
                    this.router.navigate(['/architect'], {
                        queryParams: {
                            name: this.architectUserName
                        }
                    })
                }
            })
            .catch(err => {
                console.log(err+"\n Try reloading the page")
            })
    }
}