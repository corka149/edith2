import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * getItems
   */
  public getItems(shoppingListId: number): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemUrl(shoppingListId));
  }

  /**
   * getItem
   */
  public getItem(shoppingListId: number, itemId: number): Observable<Item> {
    return this.http.get<Item>(this.itemUrl(shoppingListId) + `/${itemId}`);
  }

  /**
   * createItem
   * @param item properties of new item
   */
  public createItem(shoppingListId: number, item: Item): Observable<any> {
    return this.http.post<Item>(this.itemUrl(shoppingListId), {item});
  }

  /**
   * updateItem
   */
  public updateItem(shoppingListId: number, item: Item): Observable<Item> {
    return this.http.put<Item>(this.itemUrl(shoppingListId) + `/${item.id}`, {item});
  }

  /**
   * deleteItem
   * @param item that should be deleted
   */
  public deleteItem(shoppingListId: number, item: Item): Observable<Item> {
    return this.http.delete<Item>(this.itemUrl(shoppingListId) + `/${item.id}`);
  }

  private itemUrl(shoppingListId: number): string {
    return `/jarvis/v1/shoppinglists/${shoppingListId}/items/`;
  }
}
