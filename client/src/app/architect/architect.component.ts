import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-architect',
    templateUrl: './architect.component.html',
    styleUrls: ['./architect.component.css']
})

export class ArchitectComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.architectName = params['name']
        })

        this.getArchitects()
    }

    architectName = "";
    info = {
        _id: null,
        builder: "",
        tasks: [{
            _id: "",
            task: "",
            status: "",
            createdAt: ""
        }]
    };
    taskDescription = "";
    taskStatus = "";
    builderIncharge = "";

    getArchitects() {
        fetch(`http://localhost:5000/api/v1/architect/tasks?name=${this.architectName}`)
            .then(Response => Response.json())
            .then(data => {
                if (!data.success) {
                    alert(data.msg)
                    window.location.reload()
                    return;
                }
                else if (!data.data) {
                    alert("There are no task assigned to the architect")
                    return;
                }
                else {
                    this.info = data.data
                    console.log(this.info)
                }
            })
            .catch(err => {
                alert(err)
                window.location.reload()
            })
    }

    onChangeStatus(id: number) {
        this.taskDescription = (<HTMLInputElement>document.getElementById(`task${id}`)).innerHTML;
        this.builderIncharge = (<HTMLInputElement>document.getElementById(`builder${id}`)).innerHTML;
        this.taskStatus = (<HTMLInputElement>document.getElementById(`status${id}`)).innerHTML;

        this.taskStatus = this.taskStatus.trim() == "Unfinished" ? "Finished" : "Unfinished"

        fetch('http://localhost:5000/api/v1/architect/task', {
            method: 'PUT',
            mode: "cors",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                taskDescription: this.taskDescription.trim(),
                architectName: this.architectName.trim(),
                taskStatus: this.taskStatus.trim(),
                builderName: this.builderIncharge.trim()
            })
        }).then(Response => Response.json())
            .then(data => {
                if(!data.success){
                    alert(data.msg)
                    return;
                }
                else{
                    window.location.reload()
                    return
                }
            })
            .catch(err => {
                alert('Some error occured please reload the page!!')
                return;
            })
    }
}