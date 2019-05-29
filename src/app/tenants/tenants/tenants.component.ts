import { Component, OnInit } from '@angular/core';
import {TenantsService} from '../tenants.service';
import {Tenant} from '../interfaces/tenant';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {

  userTenants: Array<Tenant>;

  constructor(private tenantsService: TenantsService) { }

  ngOnInit() {
    this.tenantsService.getUserTenants().subscribe((success: any) => {
      console.log(success);
    });
  }

}
