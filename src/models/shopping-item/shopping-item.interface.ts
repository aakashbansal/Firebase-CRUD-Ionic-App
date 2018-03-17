export interface ShoppingItem {
    itemName: string,
    itemNumber: number
}

export interface ShoppingItemResponse{
    key:string,
    shoppingItem:ShoppingItem
}