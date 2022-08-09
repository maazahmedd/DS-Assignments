public class Cell {

    // true means wall exists in that direction
    // false means wall does not exist 
    private boolean left;
    private boolean top;
    private boolean right;
    private boolean bottom;
    private boolean visited;

    //Indexing location of the cell in the maze
    private int x;
    private int y;

    public Cell(int x, int y) {
        left = true;
        top = true;
        right = true;
        bottom = true;
        visited = false;
        this.x = x;
        this.y = y;
    }

    // returns the x index of the cell
    public int getX() {
        return x;
    }

    // returns the y index
    public int getY() {
        return y;
    }

    // below are getter and setter methods for representation of existence of walls
    public void setTop(boolean b) {
        top = b;
    }

    public void setBottom(boolean b) {
        bottom = b;
    }

    public void setLeft(boolean b) {
        left = b;
    }

    public void setRight(boolean b) {
        right = b;
    }

    public boolean getTop() {
        return top;
    }

    public boolean getBottom() {
        return bottom;
    }

    public boolean getRight() {
        return right;
    }

    public boolean getLeft() {
        return left;
    }

    public boolean getVisited() {
        return visited;
    }

    //If the cell has been visited during the traversal
    public void setVisited(boolean b) {
        visited = b;
    }

    //Checks if the cell's indexes are the same
    public boolean equals(Cell cell) {
        return (this.x == cell.getX() && this.y == cell.getY());
    }

    public String toString() {
        return ("Cell (" + x + "," + y + ")");
    }
}