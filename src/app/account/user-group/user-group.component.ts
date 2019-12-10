import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserGroup } from '../models/user-group';
import { UserGroupService } from '../services/user-group.service';
import { Subscription } from 'rxjs';
import { group } from '@angular/animations';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit, OnDestroy {

  userGroups: UserGroup[] = [];

  private subscribtions = new Subscription();

  constructor(
    private userGroupService: UserGroupService
  ) { }

  ngOnInit() {
    this.subscribtions.add(this.userGroupService.getUserGroups()
      .subscribe(groups => this.userGroups = groups)
    );
  }

  ngOnDestroy() {
    this.subscribtions.unsubscribe();
  }

}
