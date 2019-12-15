import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../services/shopping-list.service';
import { ShoppingList } from '../models/shopping-list';

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
  ) { }

  ngOnInit() {
    this.currentTab = this.currentTabByUrl(this.router.url);
    this.loadAllLists();
  }

  ngOnDestroy() {
  }

  public openNewListDialog() {
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
