import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../services/shopping-list.service';
import { ShoppingList } from '../models/shopping-list';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { UserGroup } from 'src/app/account/models/user-group';
import { UserGroupService } from 'src/app/account/services/user-group.service';
import { UserGroupMembershipDialogComponent } from 'src/app/account/user-group-membership/user-group-membership.component';
import { DateUtils } from 'src/app/utils/date-utils';

@Component({
  selector: 'app-shopping-list-dialog',
  templateUrl: 'shopping-list-dialog.component.html'
})
export class ShoppingListDialogComponent implements OnInit, OnDestroy {
  shoppingListForm: FormGroup = this.fb.group({
    done: ['', []],
    plannedFor: ['', [Validators.required]],
    belongsTo: ['', [Validators.required]],
  });
  groups: UserGroup[] = [];

  private subscribtions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private userGroupService: UserGroupService,
    @Inject(MAT_DIALOG_DATA) public existingList: ShoppingList,
    public dialogRef: MatDialogRef<UserGroupMembershipDialogComponent>) {
      if (existingList) {
        this.done.setValue(existingList.done);
        this.plannedFor.setValue(DateUtils.fromIso8601ToDate(existingList.planned_for));
        this.belongsTo.setValue(existingList.belongs_to_group.id);
      }
    }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.subscribtions.add(
      this.userGroupService.getUserGroups().subscribe(
        result => this.groups = result
      )
    );
  }

  ngOnDestroy() {
    this.subscribtions.unsubscribe();
  }

  get done(): AbstractControl {
    return this.shoppingListForm.get('done');
  }

  get plannedFor(): AbstractControl {
    return this.shoppingListForm.get('plannedFor');
  }

  get belongsTo(): AbstractControl {
    return this.shoppingListForm.get('belongsTo');
  }

  get shoppingList(): ShoppingList {
    const shoppingList = new ShoppingList(
      !!this.done.value,
      this.plannedFor.value,
      this.belongsTo.value
    );

    if (this.existingList && this.existingList.id) {
      shoppingList.id = this.existingList.id;
    }

    return shoppingList;
  }
}

class Tab {
  static ALL: Tab = { name: 'all', index: 0 };
  static CURRENT: Tab = { name: 'current', index: 1 };

  constructor(
    public name: string,
    public index: number,
  ) { }
}

@Component({
  selector: 'app-shopping-list-overview',
  templateUrl: './shopping-list-overview.component.html',
  styleUrls: ['./shopping-list-overview.component.scss']
})
export class ShoppingListOverviewComponent implements OnInit, OnDestroy {

  currentTab = Tab.ALL;
  allShoppingLists: ShoppingList[] = [ ];
  displayedColumnsAllShoppingLists = ['done', 'plannedFor', 'belongsTo', 'action'];

  openShoppingLists: ShoppingList[] = [ ];
  displayedColumnsCurrentShoppingLists = ['plannedFor', 'belongsTo', 'action'];

  private subscribtions = new Subscription();

  constructor(
    private router: Router,
    private shoppingListService: ShoppingListService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.currentTab = this.currentTabByUrl(this.router.url);
    this.loadAllLists();
  }

  ngOnDestroy() {
  }

  refresh(): void {
    this.loadAllLists();
  }

  /**
   * openNewMembershipDialog
   */
  public openNewListDialog() {
    const dialogRef = this.dialog.open(
      ShoppingListDialogComponent,
      {
        width: '50rem',
        maxHeight: '90vh'
      }
    );

    this.subscribtions.add(
      dialogRef.afterClosed().subscribe(
        result => this.createShoppingList(result)
      )
    );
  }

  /**
   * openNewMembershipDialog
   */
  public openEditListDialog(shoppingList: ShoppingList) {
    const dialogRef = this.dialog.open(
      ShoppingListDialogComponent,
      {
        width: '50rem',
        data: shoppingList
      }
    );

    this.subscribtions.add(
      dialogRef.afterClosed().subscribe(
        result => this.updateShoppingList(result)
      )
    );
  }

  /**
   * deleteShoppingList
   */
  public deleteShoppingList(shoppingList: ShoppingList) {
    this.subscribtions.add(
      this.shoppingListService.deleteShoppingLists(shoppingList).subscribe(
        result => this.loadAllLists()
      )
    );
  }

  private currentTabByUrl(url: string): Tab {
    const urlParts = this.router.url.split('/');
    const current = urlParts[urlParts.length - 1];

    return current === Tab.CURRENT.name ? Tab.CURRENT : Tab.ALL;
  }

  private loadAllLists() {
    this.subscribtions.add(
      this.shoppingListService.getShoppingLists().subscribe(
        lists => this.allShoppingLists = lists
      )
    );
    this.subscribtions.add(this.shoppingListService.getOpenShoppingLists().subscribe(
      openLists => this.openShoppingLists = openLists
    ));
  }

  private createShoppingList(shoppingList: ShoppingList) {
    if (shoppingList) {
      this.subscribtions.add(
        this.shoppingListService.createShoppingList(shoppingList).subscribe(
          result => this.loadAllLists()
        )
      );
    }
  }

  private updateShoppingList(shoppingList: ShoppingList) {
    if (shoppingList) {
      this.subscribtions.add(
        this.shoppingListService.updateShoppingList(shoppingList).subscribe(
          result => this.loadAllLists()
        )
      );
    }
  }
}
