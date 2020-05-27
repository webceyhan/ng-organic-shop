import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public route:ActivatedRoute) { }

    ngOnInit(): void {
        // const u = this.route.;
        // console.log(u);
  }

}
