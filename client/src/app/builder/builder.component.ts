import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: "app-builder",
    templateUrl: "./builder.component.html",
    styleUrls: ['./builder.component.css']
})

export class BuilderComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.builderName = params['name']
        })

        fetch(`http://localhost:5000/api/v1/builder/getTask?name=${this.builderName}`)
            .then(Response => Response.json())
            .then(data => {
                this.info = data
                console.log(this.info.data[0].inChargeof)
                return
            })
            .catch(err => {
                alert('some error occured Please try reloading the page');
                return;
            })
    }

    builderName = ""
    architectUsername = ""
    architectPassword = ""
    archname = ""
    taskdesc: any = null
    no_task = "No Task Assigned, Please assign a task"
    update_task = "Update this task"
    assign_new_task = "Assign a new task"
    nstat = "Assign a task to get the status"
    info = {
        data: [{
            _id: "",
            username: "",
            inChargeof: [{
                status: "",
                _id: "",
                architect: "",
                task: undefined,
                createdAt: ""
            }]
        }],
        success: false
    }

    handleArchitectUsernameChange(event: Event) {
        this.architectUsername = (<HTMLInputElement>event.target).value
    }

    handleArchitectPasswordChange(event: Event) {
        this.architectPassword = (<HTMLInputElement>event.target).value
    }

    onCreateArchitect() {
        if (!this.architectPassword || !this.architectUsername) {
            alert("Please provide username and password!")
            return;
        }
        fetch('http://localhost:5000/api/v1/builder/architect', {
            method: "POST",
            mode: "cors",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": this.architectUsername, "password": this.architectPassword, "builder": this.builderName })
        })
            .then(Response => Response.json())
            .then(data => {
                if (!data.success) {
                    alert(data.msg)
                    return;
                }
                alert(data.msg);
                window.location.reload();
                return;
            })
            .catch(err => {
                alert("Some error occured please try reloading the page!")
                return;
            })
    }

    onAssignTask(id: number) {
        this.archname = (<HTMLInputElement>document.getElementById(`${id}`)).innerHTML;
        this.taskdesc = prompt('provide task description')
        while (!this.taskdesc) {
            this.taskdesc = prompt('provide task description')
        }

        fetch('http://localhost:5000/api/v1/builder/create_task', {
            method: "POST",
            mode: "cors",
            headers: {
                'content-Type': "application/json"
            },
            body: JSON.stringify({
                architectName: this.archname.trim(),
                builderName: this.builderName.trim(),
                taskDescription: this.taskdesc.trim(),
            })
        })
            .then(Response => Response.json())
            .then(data => {
                if (data.success) {
                    alert("task assigned successfully")
                    window.location.reload();
                    return;
                }
                else {
                    alert(`${data.msg}`)
                    return;
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    onUpdateTask(id: number) {
        this.archname = (<HTMLInputElement>document.getElementById(`${id}`)).innerHTML;
        this.taskdesc = prompt('provide  updated task description')
        while (!this.taskdesc) {
            this.taskdesc = prompt('provide updated task description')
        }

        fetch('http://localhost:5000/api/v1/builder/update_task', {
            method: "PUT",
            mode: "cors",
            headers: {
                'content-Type': "application/json"
            },
            body: JSON.stringify({
                architectName: this.archname.trim(),
                builderName: this.builderName.trim(),
                taskDescription: this.taskdesc.trim(),
                id: this.info.data[0].inChargeof[id]._id.trim()
            })
        })
            .then(Response => Response.json())
            .then(data => {
                if (data.success) {
                    console.log(data.updated)
                    alert("task updated successfully")
                    window.location.reload();
                    return;
                }
                else {
                    alert(`${data.msg}`)
                    return;
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}