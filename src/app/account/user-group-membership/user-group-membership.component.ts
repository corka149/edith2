import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Memberships, Invitation } from '../models/invitation';
import { Subscription } from 'rxjs';
import { InvitationService } from '../services/invitation.service';
import { UserGroupService } from '../services/user-group.service';
import { UserGroup } from '../models/user-group';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-group-dialog',
  templateUrl: 'user-group-membership-dialog.html'
})
export class UserGroupMembershipDialogComponent implements OnInit, OnDestroy {
  invitationForm: FormGroup = this.fb.group({
    inviteeEmail: ['', [Validators.email, Validators.required]],
    userGroupId: ['', [Validators.required]],
  });
  ownedGroups: UserGroup[] = [];

  private subscribtions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private userGroupService: UserGroupService,
    public dialogRef: MatDialogRef<UserGroupMembershipDialogComponent>) { }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.subscribtions.add(
      this.userGroupService.getUserGroups().subscribe(
        result => this.ownedGroups = result
      )
    );
  }

  ngOnDestroy() {
    this.subscribtions.unsubscribe();
  }

  get userGroupId(): AbstractControl {
    return this.invitationForm.get('userGroupId');
  }

  get inviteeEmail(): AbstractControl {
    return this.invitationForm.get('inviteeEmail');
  }

  get invitation(): Invitation {
    return new Invitation(
      null,
      new UserGroup(this.userGroupId.value, ''),
      this.inviteeEmail.value,
      null
    );
  }
}

@Component({
  selector: 'app-user-group-membership',
  templateUrl: './user-group-membership.component.html',
  styleUrls: ['./user-group-membership.component.scss']
})
export class UserGroupMembershipComponent implements OnInit, OnDestroy {

  displayedColumnsCreatedInvitation: string[] = ['inviteeName', 'invitedInto', 'action'];
  displayedColumnsReceivedInvitation: string[] = ['hostName', 'invitedInto', 'action'];
  displayedColumnsMembership: string[] = ['userGroup', 'action'];

  memberships: Memberships;

  private subscribtions = new Subscription();

  constructor(
    private invitationService: InvitationService,
    private userGroupService: UserGroupService,
    public dialog: MatDialog,
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
        result => {
          console.log(`Deleted invitation: ${invitation.id}`);
          this.reloadMemberships();
        }
      )
    );
  }

  public leaveGroup(group: UserGroup) {
    this.subscribtions.add(
      this.userGroupService.leaveUserGroup(group).subscribe(
        result => {
          console.log(`Left group: ${group.id}`);
          this.reloadMemberships();
        }
      )
    );
  }

  /**
   * openNewMembershipDialog
   */
  public openNewMembershipDialog() {
    const dialogRef = this.dialog.open(
      UserGroupMembershipDialogComponent,
      {
        width: '50rem'
      }
    );

    this.subscribtions.add(
      dialogRef.afterClosed().subscribe(
        result => this.createNewInvitation(result)
      )
    );
  }

  private createNewInvitation(invitation: Invitation) {
    if (invitation) {
      this.subscribtions.add(
        this.invitationService.inviteUser(invitation).subscribe(
          result => {
            console.log('Try to created invitation:_result');
            console.log(result);
            this.reloadMemberships();
          }
        )
      );
    }
  }

  private reloadMemberships() {
    this.subscribtions.add(
      this.invitationService.getMemberships().subscribe(
        memberships => this.memberships = memberships
      )
    );
  }
}
