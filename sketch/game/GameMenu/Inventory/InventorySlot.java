package sketch.game.GameMenu.Inventory;

import java.util.ArrayList;

import sketch.game.utilities.Constants;

public class InventorySlot {
  ArrayList<Item> items = new ArrayList<Item>();
  boolean selected;
  int InventoryPosX;
  int InventoryPosY;
  InventorySlot(Item item,int InventoryPosX,int InventoryPosY) {
    this.items.add(item);
    this.selected = false;
    this.InventoryPosX = InventoryPosX;
    this.InventoryPosY = InventoryPosY;
  }

  public void showSlot() {
    if (this.selected) fill(0, 255, 0);
    else fill(220);
    rect(this.InventoryPosX * Inventory.SlotSize + offsetX, this.InventoryPosY * Inventory.SlotSize + offsetY, Inventory.SlotSize, Inventory.SlotSize);
  }

  public void showStackSize() {
    if (this.items.size() <= 1) return;
    fill(0);
    text(this.items.size(), this.InventoryPosX * Inventory.SlotSize + offsetX + Inventory.SlotSize / 2, this.InventoryPosY * Inventory.SlotSize + offsetY + Inventory.SlotSize / 2);
  }

  public void showItems() {
    for (Item item : this.items) {
      item.showItem();
    }
  }

  public void addItem(Item item) {
    if (this.items.get(0).getId().toString() == Constants.tileList.Air.toString()) {
      this.items.clear();
      this.items.add(item);
    } else {
      this.items.add(item);
    }
  }

  // checkStack(): itemList {
  //   return this.item[0].id;
  // }
}
