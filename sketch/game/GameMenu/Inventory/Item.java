package sketch.game.GameMenu.Inventory;

import java.util.ArrayList;

import sketch.game.utilities.Constants;
import sketch.game.utilities.Point;

public class Item {
  
  private Constants.itemList id;
  private int InventoryPosX;
  private int InventoryPosY;
  int width = 64;
  p5.Image img;
  private int stackSize;
  private ArrayList<Abilities> abilities;

  Item(itemInput obj) {
    this.InventoryPosX = obj.InventoryPosX;
    this.InventoryPosY = obj.InventoryPosY;
    this.id = obj.id;
    this.img = obj.img;
    this.stackSize = obj.stackSize;
    this.abilities = obj.abilities;
  }

  void showItem() {
    int itemBoxOffset = (Inventory.SlotSize - this.width) / 2;
    int offsetX = width / 2 - (Inventory.SlotSize * Inventory.BACKPACKWITDH) / 2;
    int offsetY = height / 2 - (Inventory.SlotSize * Inventory.BACKPACKHEIGHT) / 2;
    image(this.img, this.InventoryPosX * Inventory.SlotSize + offsetX + itemBoxOffset, this.InventoryPosY * Inventory.SlotSize + offsetY + itemBoxOffset, this.width, this.width);
  }

  public int getStackSize() {
    return this.stackSize;
  }

  public Item getItem() {
    return this;
  }

  public Point getInventoryPos() {
    return new Point(this.InventoryPosX, this.InventoryPosY);
  }

  Constants.itemList getId() {
    return this.id;
  }

  public void itemSelected() {
    for (int i = 0; i < this.abilities.size(); i++) {
      this.abilities.get[i].abilitySelected();
    }
  }

  public void clicked(int playerX, int playerY) {
    for (int i = 0; i < this.abilities.size(); i++) {
      this.abilities.get[i].abilityClicked(playerX, playerY);
    }
  }

  public void tick(int playerX,int playerY) {
    for (int i = 0; i < this.abilities.size(); i++) {
      this.abilities.get[i].abilityTick(playerX, playerY);
    }
  }
}

interface itemInput {
  int InventoryPosX;
  int InventoryPosY;
  Constants.itemList id;
  int stackSize;
  p5.Image img;
  ArrayList<Abilities> abilities;
}
