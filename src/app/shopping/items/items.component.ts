import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingList } from '../models/shopping-list';
import { Item } from '../models/item';
import { ShoppingListService } from '../services/shopping-list.service';
import { ItemService } from '../services/item.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  itemForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    amount: [0, [Validators.required]],
  });
  displayedColumnsItem = ['name', 'amount', 'action'];
  shoppingList: ShoppingList;
  items: Item[] = [];

  private subscriptions = new Subscription();
  // tslint:disable-next-line: variable-name
  private _activeItem: Item;

  constructor(
    private route: ActivatedRoute,
    private shoppingListService: ShoppingListService,
    private itemService: ItemService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.subscriptions.add(this.route.params.subscribe(
      params => this.loadItems(params.id)
    ));
  }

  get name(): AbstractControl {
    return this.itemForm.get('name');
  }

  get amount(): AbstractControl {
    return this.itemForm.get('amount');
  }

  get itemId(): AbstractControl {
    return this.itemForm.get('itemId');
  }

  set activeItem(item: Item) {
    this._activeItem = item;
    this.name.setValue(item.name);
    this.amount.setValue(item.amount);
  }

  get activeItem(): Item {
    if (this._activeItem) {
      return new Item(this.amount.value, this.name.value, this._activeItem.id);
    } else {
      return new Item(this.amount.value, this.name.value);
    }
  }

  editItem(item: Item) {
    this.itemForm.markAsTouched();
    this.activeItem = item;
  }

  deleteItem(item: Item) {
    this.subscriptions.add(
      this.itemService.deleteItem(this.shoppingList.id, item).subscribe(
        result => this.loadItems(this.shoppingList.id)
      )
    );
  }

  public createOrUpdateItem(item: Item) {
    if (this.activeItem && this.activeItem.id) {
      this.subscriptions.add(
        this.itemService.updateItem(this.shoppingList.id, item).subscribe(
          result => this.loadItems(this.shoppingList.id)
        )
      );
    } else {
      this.subscriptions.add(
        this.itemService.createItem(this.shoppingList.id, item).subscribe(
          result => this.loadItems(this.shoppingList.id)
        )
      );
    }
    this.clearItemEditor();
  }

  private loadItems(shoppingListId: string | number) {
    if (shoppingListId) {
      this.subscriptions.add(
        this.shoppingListService.getShoppingList(+shoppingListId).subscribe(
          list => this.shoppingList = list
        )
      );
      this.subscriptions.add(
        this.itemService.getItems(+shoppingListId).subscribe(
          items => this.items = items
        )
      );
    }
  }

  private clearItemEditor() {
    this.activeItem = {
      name: '',
      amount: 0
    };
    this.itemForm.markAsUntouched();
    this.itemForm.clearValidators();
  }
}
