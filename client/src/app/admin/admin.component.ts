import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-admin",
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
        this.get_data();
    }

    info = { builders: [{
        _id: null,
        username: "",
        inChargeof: [{
            status: "",
            _id: null,
            task: null,
            taskId: null,
            architect : "",
        }]
    }], success: false };

    builderUsername: String = "";
    builderPassword: String = "";

    taskDescription: String = "";
    architectName: String = "";
    builderName: String =  "";

    get_data() {
        fetch('http://localhost:5000/api/v1/admin/builders')
            .then(res => res.json())
            .then(data => {
                this.info = data;
                console.log(this.info.builders)
            })
            .catch(err => {
                alert("some error occured please try reloading the page");
                return;
            })
    }

    handleCreateBuilderUsernameChange(event: Event) {
        this.builderUsername = (<HTMLInputElement>event.target).value
    }

    handleCreateBuilderPasswordChange(event: Event) {
        this.builderPassword = (<HTMLInputElement>event.target).value
    }

    onBuilderCreate() {
        if (!this.builderPassword || !this.builderUsername) {
            alert("Username or password Cannot be empty")
            return;
        }
        fetch('http://localhost:5000/api/v1/admin/create_builder', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({ username: this.builderUsername, password: this.builderPassword })
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    alert(data.msg)
                    return;
                }
                else {
                    alert(data.msg)
                    window.location.reload()
                    return;
                }
            })
            .catch(err => {
                alert("Some error Occured");
                return;
            })
    }

    onDeleteTask(name:String , id: number){
        this.builderName = name
        this.taskDescription = (<HTMLInputElement>document.getElementById(`${name}task${id}`)).innerHTML;     
        this.architectName = (<HTMLInputElement>document.getElementById(`${name}architect${id}`)).innerHTML;  

        //console.log(this.builderName+"\n"+this.taskDescription+"\n"+this.architectName)

        fetch('http://localhost:5000/api/v1/admin/delete' , {
            method: 'DELETE',
            mode: "cors",
            headers: {
                "content-Type" : 'application/json'
            },
            body: JSON.stringify({
                builderName : this.builderName.trim(),
                taskDescription: this.taskDescription.trim(),
                architectName: this.architectName.trim()
            })
        }).then(Response => Response.json())
        .then(data => {
            if(!data.success){
                alert(data.msg);
                return;
            }
            else{
                alert(data.msg);
                window.location.reload()
                return;
            }
        })
        .catch(err => {
            alert(err+"\n"+"Try reloading the page!!")
            return;
        })
    }
}