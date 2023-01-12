package sketch.game.GameMenu.Inventory;

import java.util.ArrayList;

import sketch.game.utilities.Constants;
import sketch.game.utilities.Point;
import sketch.game.utilities.Constants.itemList;

public class Inventory {
  public InventorySlot[][] backpack;

  public boolean showBackpack = false;
  public  InventorySlot selected = null;

  public static int SlotSize = 74;
  public static int BACKPACKWITDH = 10;
  public static int BACKPACKHEIGHT = 3;
  public Inventory() {
    this.backpack = new InventorySlot[Inventory.BACKPACKWITDH][Inventory.BACKPACKHEIGHT];
    for (int i = 0; i < this.backpack.length; i++) {
      for (int j = 0; j < this.backpack[i].length; j++) {
        this.backpack[i][j] = new InventorySlot(ItemGen.getEmpty(i, j), i, j);
      }
    }

    //TODO dev pickaxe
    this.backpack[0][0].addItem(ItemGen.getPickaxe(0, 0));
    this.backpack[1][0].addItem(ItemGen.getTeleportStick(1, 0));
  }

  public void giveItem(Constants.itemList itemID){
    try {
      giveItem(itemID, 1);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public void giveItem(Constants.itemList itemID,int amount) throws Exception{
    Point pos = this.findSlot(itemID);
    if (pos.x == -1 || pos.y == -1) {
      throw new Exception("no space");
    }
    for (int i = 0; i < amount; i++) {
      this.backpack[pos.x][pos.y].addItem(ItemGen.itemPicker(itemID, pos.x, pos.y));
    }
  }

  private Point findSlot(Constants.itemList itemID) {
    Point stackSlot = this.stackItem(itemID);
    if (stackSlot.x != -1 || stackSlot.y != -1) {
      return stackSlot;
    }
    return this.findEmptySlot();
  }

  private Point stackItem (Constants.itemList itemID) {
    int x = -1;
    int y = -1;
    InventorySlot[][] backpack = game.getPlayer().getInventory().backpack;
    for (int i = 0; i < backpack.length; i++) {
      for (int j = 0; j < backpack[i].length; j++) {
        if (backpack[i][j].items.get(0).getId() == itemID && backpack[i][j].items.get(0).getStackSize() > backpack[i][j].items.size()) {
          x = backpack[i][j].InventoryPosX;
          y = backpack[i][j].InventoryPosY;
        }
      }
    }
    return new Point(x, y);
  }

  private Point findEmptySlot() {
    int x = -1;
    int y = -1;
    for (int i = 0; i < this.backpack.length; i++) {
      for (int j = 0; j < this.backpack[i].length; j++) {
        if (this.backpack[i][j].items.get(0).getId() == Constants.itemList.Air) {
          x = i;
          y = j;
          break;
        }
      }
      if (x != -1) break;
    }

    return new Point(x, y);
  }

  public void show() {
    push();
    translate(-game.OffSetX, -game.OffSetY);

    for (int i = 0; i < this.backpack.length; i++) {
      for (int j = 0; j < this.backpack[i].length; j++) {
        this.backpack[i][j].showSlot();
        this.backpack[i][j].showItems();
        this.backpack[i][j].showStackSize();
      }
    }
    pop();
  }

  public Point findItem(Constants.itemList itemId,int amount) {
    int x = -1;
    int y = -1;
    for (int i = 0; i < this.backpack.length; i++) {
      for (int j = 0; j < this.backpack[i].length; j++) {
        if (this.backpack[i][j].items.get(0).getId() == itemId) {
          if (this.backpack[i][j].items.size() >= amount) {
            return new Point(i, j);
          }
        }
      }
    }
    // throw "no items";
    return new Point(x, y);
  }

  public boolean hasItem(Constants.itemList itemId, int amount) {
    for (int i = 0; i < this.backpack.length; i++) {
      for (int j = 0; j < this.backpack[i].length; j++) {
        if (this.backpack[i][j].items.get(0).getId() == itemId) {
          if (this.backpack[i][j].items.size() >= amount) {
            return true;
          }
        }
      }
    }
    return false;
  }

  private void itemSelector() {
    Point mouseTilePos = this.boxSelector(mouseX, mouseY);

    InventorySlot slot = this.backpack[mouseTilePos.x][mouseTilePos.y];
    if (slot.selected == true) {
      slot.selected = false;
      this.selected = null;
    } else {
      if (this.selected != null) this.selected.selected = false;
      slot.selected = true;
      this.selected = slot;
    }
  }

  public ArrayList<Item> getSelectedItem() {
    if (this.selected != null) {
      return this.selected.items;
    }
    return null;
  }

  public itemList getSelectedItemId() {
    return this.selected.items.get(0).getId();
  }

  private Point boxSelector(int x,int y) {
    x = Math.floor((x - offsetX) / Inventory.SlotSize);
    y = Math.floor((y - offsetY) / Inventory.SlotSize);
    return new Point(x, y);
  }

  public void removeItem(Constants.itemList item,int amount) {
    for (int i = 0; i < amount; i++) {
      Point pos = this.findItem(item, 1);
      ArrayList<Item> items = this.backpack[pos.x][pos.y].items;
      items.remove(items.size()-1);

      if (items.size() == 0) {
        this.backpack[pos.x][pos.y].items.clear();
        this.backpack[pos.x][pos.y].items.add(ItemGen.getEmpty(pos.x, pos.y));
      }
    }
  }

  public void mousePressed() {
    this.itemSelector();
    if (this.selected != null)
    for (int i = 0; i < this.selected.items.size(); i++) {
      this.selected.items.get(i).itemSelected();
    }
  }
  
}
