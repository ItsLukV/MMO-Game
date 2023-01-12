package sketch.game.world;

import java.util.ArrayList;

/**
 * WorldGen
 */
public class WorldGen {
    private int[][] world;
  
    private float circleOccurrence;
    static int stoneBias = 3;
    static int dirtBias = 1;
    static int grassBias = 1;
  
    public WorldGen(int worldWidth, int worldHeight) {
      // this.world = new Array(worldWidth);
      // for (let i = 0; i < this.world.length; i++) {
      //   this.world[i] = new Array(worldHeight);
      // }
  
      // for (let i = 0; i < this.world.length; i++) {
      //   for (let j = 0; j < this.world[i].length; j++) {
      //     this.world[i][j] = tileList.Air;
      //   }
      // }
  
      // for (let i = 0; i < this.world.length; i++) {
      //   for (let j = 0; j < 3; j++) {
      //     this.world[i][this.world[i].length - j - 1] = tileList.Stone;
      //   }
      // }
  
      // for (let i = 0; i < this.world.length; i++) {
      //   this.world[i][this.world[i].length - 1] = tileList.Bedrock;
      // }
  
      // // TODO remove tiles
      // this.world[2][7] = tileList.Grass;
      // this.world[3][6] = tileList.Stone;
      // this.world[3][5] = tileList.Stone;
  
      // this.world[5][7] = tileList.Water;
      // this.world[6][7] = tileList.Water;
      this.randomWorldGen(235376, worldWidth, worldHeight);
    }
  
    public int[][] getWorld() {
      return this.world;
    }
    /**
     * randomWorldGen
     */
    public void randomWorldGen(int seed, int width,int height) {
      this.world = new int[width][height];
      for (int i = 0; i < width; i++) {
        for (int j = 0; j < height - 1; j++) {
          this.world[i][j] = tileList.Air;
        }
      }
      for (int i = 0; i < width; i++) {
        this.world[i][height - 1] = tileList.Bedrock;
      }
      for (int i = 0; i < height; i++) {
        this.world[0][i] = tileList.Bedrock;
        this.world[width - 1][i] = tileList.Bedrock;
      }
      // randomSeed(seed);
      ArrayList<Integer> circles = new ArrayList<Integer>();
      for (int i = 1; i < width - 1; i++) {
        if (Math.random() < this.circleOccurrence) {
          circles.add(i);
        }
      }
  
      for (int x = 1; x < width - 1; x++) {
        for (int y = 0; y < height - 1; y++) {
          float dist = Float.POSITIVE_INFINITY;
          for (int i = 0; i < circles.size(); i++) {
            dist = Math.min(this.distance(x, y, circles.get(i), height), dist);
          }
          if (dist < WorldGen.stoneBias) {
            this.world[x][y] = tileList.Stone;
          } else if (dist < WorldGen.dirtBias + WorldGen.stoneBias) {
            this.world[x][y] = tileList.Dirt;
          } else if (dist < WorldGen.grassBias + WorldGen.dirtBias + WorldGen.stoneBias) {
            this.world[x][y] = tileList.Grass;
          }
        }
      }
    }
    private float distance(int x,int  y,int circleX,int circleY) {
      return (float) Math.sqrt(Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2));
    }
  
    public Coords safeSpawn(int x) {
      for (int i = 0; i < this.world[x].length; i++) {
        if (this.world[x][i] != tileList.Air) return { x: x, y: i - 2 };
      }
      return { x: -1, y: -1 };
    }
  
}