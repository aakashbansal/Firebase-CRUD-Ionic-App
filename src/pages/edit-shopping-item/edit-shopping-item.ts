import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireObject } from 'angularfire2/database';
import { ShoppingItemResponse, ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  itemId: string;
  shoppingItemRef$: AngularFireObject<ShoppingItem>;
  shoppingItemSubscription: Subscription;
  shoppingItem = {} as ShoppingItem;

  constructor(public navCtrl: NavController,
    private database: AngularFireDatabase,
    public navParams: NavParams) {

  }

  ionViewWillEnter() {
    this.itemId = this.navParams.get("shoppingItemId");
    this.shoppingItemRef$ = this.database.object(`shopping-list/${this.itemId}`);
    this.shoppingItemSubscription = this.shoppingItemRef$.valueChanges().subscribe((item) => {
      this.shoppingItem = item;
    });
  }

  editShoppingItem() { 

    this.shoppingItemRef$.update(this.shoppingItem);
    
    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    this.shoppingItemSubscription.unsubscribe();
  }

}
