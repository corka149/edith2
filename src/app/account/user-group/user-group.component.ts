import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { UserGroup } from '../models/user-group';
import { UserGroupService } from '../services/user-group.service';
import { Subscription } from 'rxjs';
import { group } from '@angular/animations';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TranslationService } from 'src/app/translations/translation.service';


@Component({
  selector: 'app-user-group-dialog',
  templateUrl: 'user-group-dialog.html'
})
export class UserGroupDialogComponent {
  userGroupForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
  });

  private id: number;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserGroup) {
    this.id = data.id;
    this.name.setValue(data.name);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  get name(): AbstractControl {
    return this.userGroupForm.get('name');
  }

  get userGroup(): UserGroup {
    return {
      id: this.id,
      name: this.name.value
    };
  }
}

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit, OnDestroy {

  userGroups: UserGroup[] = [];

  private subscribtions = new Subscription();

  constructor(
    private userGroupService: UserGroupService,
    private translateService: TranslationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadGroups();
  }

  ngOnDestroy() {
    this.subscribtions.unsubscribe();
  }

  refresh(): void {
    this.loadGroups();
  }

  /**
   * deleteGroup
   */
  public deleteGroup(userGroup: UserGroup) {
    const confirmMsg = this.translateService.dGetText('account', 'Are you sure?');
    if (window.confirm(confirmMsg)) {
      this.subscribtions.add(
        this.userGroupService.deleteUserGroup(userGroup).subscribe(
          result => this.userGroups = this.userGroups.filter(ug => ug.id !== userGroup.id)
        )
      );
    }
  }

  /**
   * openNewGroupDialog
   */
  public openNewGroupDialog() {
    const dialogRef = this.dialog.open(
      UserGroupDialogComponent,
      {
        width: '50rem',
        data: { id: null, name: '' }
      }
    );

    this.subscribtions.add(dialogRef.afterClosed().subscribe(
      result => this.handleNewDialogClose(result)
    ));
  }

  /**
   * openEditGroupDialog
   */
  public openEditGroupDialog(userGroup: UserGroup) {
    const dialogRef = this.dialog.open(
      UserGroupDialogComponent,
      {
        width: '50rem',
        data: userGroup
      }
    );

    this.subscribtions.add(dialogRef.afterClosed().subscribe(
      result => this.handleEditDialogClose(result)
    ));
  }

  private handleNewDialogClose(dialogGroup: UserGroup) {
    if (dialogGroup) {
      this.subscribtions.add(this.userGroupService.createUserGroup(dialogGroup.name).subscribe(
        result => this.userGroups.push(result)
      ));
    }
  }

  private handleEditDialogClose(dialogGroup: UserGroup) {
    if (dialogGroup) {
      this.subscribtions.add(this.userGroupService.updateUserGroup(dialogGroup).subscribe(
        result => {
          this.userGroups = this.userGroups.filter(ug => ug.id !== result.id);
          this.userGroups.push(result);
          this.userGroups = this.userGroups.sort((a, b) => a.id - b.id);
        }
      ));
    }
  }

  private loadGroups(): void {
    this.subscribtions.add(this.userGroupService.getUserGroups()
      .subscribe(groups => this.userGroups = groups.sort((a, b) => a.id - b.id))
    );
  }
}
