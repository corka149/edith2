import { Component, OnInit, OnDestroy } from '@angular/core';
import { Memberships, Invitation } from '../models/invitation';
import { Subscription } from 'rxjs';
import { InvitationService } from '../services/invitation.service';
import { UserGroupService } from '../services/user-group.service';
import { UserGroup } from '../models/user-group';

@Component({
  selector: 'app-user-group-membership',
  templateUrl: './user-group-membership.component.html',
  styleUrls: ['./user-group-membership.component.scss']
})
export class UserGroupMembershipComponent implements OnInit, OnDestroy {

  displayedColumnsCreatedInvitation: string[] = ['inviteeName', 'invitedInto', 'action'];
  displayedColumnsReceivedInvitation: string[] = ['hostName', 'invitedInto', 'action'];
  displayedColumnsMembership: string[] = ['userGroup', 'action'];

  memberships: Memberships = {
    received_invitations: [{id: 1, groupId: 1337, inviteeName: 'Bob'}],
    created_invitations: [{id: 1, groupId: 1337, inviteeName: 'Bob'}],
    memberships: [{id: 1, name: 'A group'}]
  };

  private subscribtions =  new Subscription();

  constructor(
    private invitationService: InvitationService,
    private userGroupService: UserGroupService,
  ) { }

  ngOnInit() {
    this.invitationService.getMemberships().subscribe(
      result => this.memberships = result
    );
  }

  ngOnDestroy() {
    this.subscribtions.unsubscribe();
  }

  public deleteInvitation(invitation: Invitation) {
    this.subscribtions.add(
      this.invitationService.deleteInvitation(invitation).subscribe(
        result => console.log(`Deleted invitation: ${invitation.id}`)
      )
    );
  }

  public leaveGroup(group: UserGroup) {
    this.subscribtions.add(
      this.userGroupService.leaveUserGroup(group).subscribe(
        result => console.log(`Left group: ${group.id}`)
      )
    );
  }
}
