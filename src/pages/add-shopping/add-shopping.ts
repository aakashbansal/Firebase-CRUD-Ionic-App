import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';

@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html', 
})
export class AddShoppingPage {

  itemName: string;
  itemNumber: string;
  shoppingList: string = 'shopping-list';
  shoppingItemRef$: AngularFireList<ShoppingItem>;

  constructor(public navCtrl: NavController,
    private database: AngularFireDatabase,
    public navParams: NavParams) {

    this.shoppingItemRef$ = this.database.list<ShoppingItem>(this.shoppingList);
  }

  addShoppingItem() {

    // push the item to server
    this.shoppingItemRef$.push({
      itemName: this.itemName,
      itemNumber: Number(this.itemNumber)
    })

    //reset the shoppingItem
    this.itemName = "";
    this.itemNumber = "";

    // navigate back to home page
    this.navCtrl.pop();
  }

}
