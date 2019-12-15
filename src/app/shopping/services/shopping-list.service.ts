import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShoppingList } from '../models/shopping-list';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private static SHOPPING_LIST = '/jarvis/v1/shoppinglists';


  constructor(
    private http: HttpClient,
  ) { }

  public getShoppingList(id: number): Observable<ShoppingList> {
    return this.http.get<ShoppingList>(ShoppingListService.SHOPPING_LIST + `/${id}`);
  }

  public getShoppingLists(): Observable<ShoppingList[]> {
    return this.http.get<ShoppingList[]>(ShoppingListService.SHOPPING_LIST);
  }

  public getOpenShoppingLists(): Observable<ShoppingList[]> {
    return this.http.get<ShoppingList[]>(ShoppingListService.SHOPPING_LIST + '/open');
  }

  public createShoppingList(shoppingList: ShoppingList): Observable<any> {
    // Dirty hack: Server saves only date - no time zone
    shoppingList.planned_for = moment(shoppingList.planned_for).add(1, 'h').toISOString();
    return this.http.post(ShoppingListService.SHOPPING_LIST, {shopping_list: shoppingList});
  }

  public updateShoppingList(shoppingList: ShoppingList): Observable<any> {
    return this.http.put(ShoppingListService.SHOPPING_LIST + `/${shoppingList.id}`, {shopping_list: shoppingList});
  }

  public deleteShoppingLists(shoppingList: ShoppingList): Observable<any> {
    return this.http.delete(ShoppingListService.SHOPPING_LIST + `/${shoppingList.id}`);
  }
}
