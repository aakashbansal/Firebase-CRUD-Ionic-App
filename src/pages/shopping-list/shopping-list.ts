import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ShoppingItem, ShoppingItemResponse } from '../../models/shopping-item/shopping-item.interface';
import { Observable } from 'rxjs/Observable';
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item';

@Component({ 
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef: AngularFireList<ShoppingItemResponse>;
  shoppingListRef$: Observable<ShoppingItemResponse[]>;
  shoppingList: string = 'shopping-list';

  constructor(public navCtrl: NavController,
    private database: AngularFireDatabase,
    private actionSheetCtrl: ActionSheetController,
    public navParams: NavParams) {

    this.shoppingListRef = this.database.list<ShoppingItemResponse>('shopping-list');
    this.shoppingListRef$ = this.shoppingListRef.snapshotChanges().map(fullResponse =>

      fullResponse.map(eachItem => ({
        key: eachItem.payload.key,
        shoppingItem: eachItem.payload.val()
      }))
    );
  }

  selectShoppingItem(item: ShoppingItemResponse): void {

    this.actionSheetCtrl.create({
      title: item.shoppingItem.itemName,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            this.navCtrl.push(EditShoppingItemPage, {
              shoppingItemId: item.key
            });
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.shoppingListRef.remove(item.key);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).present();


  } 

  navigateToAddShoppingPage(): void {
    this.navCtrl.push(AddShoppingPage);
  }

}
