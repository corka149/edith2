import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../services/shopping-list.service';
import { ShoppingList } from '../models/shopping-list';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { UserGroup } from 'src/app/account/models/user-group';
import { UserGroupService } from 'src/app/account/services/user-group.service';
import { UserGroupMembershipDialogComponent } from 'src/app/account/user-group-membership/user-group-membership.component';

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
    public dialogRef: MatDialogRef<UserGroupMembershipDialogComponent>) { }

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
    return new ShoppingList(
      this.done.value,
      this.plannedFor.value,
      this.belongsTo.value
    );
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
  allShoppingLists: ShoppingList[] = [
    {id: 1, done: false, planned_for: 'today', belongs_to: {id: 1, name: 'Ziemann'}, creator: {name: 'Bob'}},
    {id: 1, done: true, planned_for: 'today', belongs_to: {id: 1, name: 'Ziemann'}, creator: {name: 'Bob'}}
  ];
  displayedColumnsAllShoppingLists = ['done', 'plannedFor', 'belongsTo', 'action'];

  openShoppingLists: ShoppingList[] = [
    {id: 1, done: false, planned_for: 'today', belongs_to: {id: 1, name: 'Ziemann'}, creator: {name: 'Bob'}}
  ];
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

  /**
   * openNewMembershipDialog
   */
  public openNewListDialog() {
    const dialogRef = this.dialog.open(
      ShoppingListDialogComponent,
      {
        width: '50rem'
      }
    );

    this.subscribtions.add(
      dialogRef.afterClosed().subscribe(
        result => console.log(result)
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
        lists => this.allShoppingLists
      )
    );
    this.subscribtions.add(this.shoppingListService.getOpenShoppingLists().subscribe(
      openLists => this.openShoppingLists
    ));
  }
}
