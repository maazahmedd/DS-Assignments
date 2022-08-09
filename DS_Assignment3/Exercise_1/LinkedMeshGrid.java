import java.util.Iterator;
import java.util.*;

public class LinkedMeshGrid<E> implements Iterable<E>{

	int h = 0;
	int w = 0;
	private Node<E> head;

	private static class Node<E> implements Position<E>{

		Node<E> left;
		Node<E> right;
		Node<E> above;
		Node<E> below;
		E element;

		public Node(){

			left = null;
			right = null;
			above = null;
			below = null;
			element = null;
		}

		public Node(E e, Node<E> l, Node<E> r, Node<E> b, Node<E> a){

			left = l;
			right = r;
			above = a;
			below = b;
			element = e;
		}

		public E getElement(){

			return element;
		}

		public Node<E> getLeft(){

			return left;

		}

		public Node<E> getRight(){

			return right;

		}
		public Node<E> getAbove(){

			return above;

		}
		public Node<E> getBelow(){

			return below;

		}

		public void setElement(E e){

			element = e;

		}

		public void setAbove(Node<E> a){

			above =a;

		} 
		public void setBelow(Node<E> b){

			below =b;

		} 
		public void setLeft(Node<E> l){

			left =l;

		} 
		public void setRight(Node<E> r){

			right =r;

		} 

	}

	//main constructor for LinkedMeshgrid class
	public LinkedMeshGrid(int height, int width){

		h = height;
		w = width;
		Node<E> currentNode = new Node<>();
		head = currentNode;
		Node<E> previousNode = head;

		for (int j=0; j<h; j++){

			//if row number is even
			if (j%2 == 0){

				//creating horizontal connections
				for (int i=0; i<w-1; i++){

					currentNode = new Node<>();
					previousNode.setRight(currentNode);
					currentNode.setLeft(previousNode);
					previousNode = currentNode;

				}

				if (j != h-1){

					currentNode = new Node<>();
					previousNode.setBelow(currentNode);
					currentNode.setAbove(previousNode);
					previousNode = currentNode;

			    }	
			}

			//if row number is odd
			else{

				//creating horizontal connections
				for (int i=0; i<w-1; i++){

					currentNode = new Node<>();
					previousNode.setLeft(currentNode);
					currentNode.setRight(previousNode);
					previousNode = currentNode;

				}

				if (j != h-1){

					currentNode = new Node<>();
					previousNode.setBelow(currentNode);
					currentNode.setAbove(previousNode);
					previousNode = currentNode;

				}
			}
		}

		Node<E> current1 = head;
		Node<E> current2;

		for(int k=0; k<h-1; k++){

			current2 = current1;

			//if row number is even
			if(k%2 == 0){

				for(int i=0; i<w-1; i++){

					current2 = current2.getRight();

				}

				current2 = current2.getBelow();

				for(int i=0; i<w-1; i++){

					current2 = current2.getLeft();

				}

				//creating vertical connections
				for(int j=0; j<w-1; j++){

					current1.setBelow(current2);
					current2.setAbove(current1);
					current1 = current1.getRight();
					current2 = current2.getRight();

				}

				if (k != h - 1){

					current1.setBelow(current2);
					current2.setAbove(current1);
					current1 = current1.getBelow();
				}

			}

			//if row number is odd
			else{

				for(int i=0; i<w-1; i++){

					current2 = current2.getLeft();

				}

				current2 = current2.getBelow();

				for(int i=0; i<w-1; i++){

					current2 = current2.getRight();

				}

				//creating vertical connections
				for(int j=0; j<w-1; j++){

					current1.setBelow(current2);
					current2.setAbove(current1);
					current1 = current1.getLeft();
					current2 = current2.getLeft();

				}

				if (k != h - 1){

					current1.setBelow(current2);
					current2.setAbove(current1);
					current1 = current1.getBelow();

				}

			}
		}
	}

	public int grid_height(){

		return h;

	}

	public int grid_width(){

		return w;

	}

	
	private Node<E> validate(Position<E> p) throws IllegalArgumentException{

		Node<E> node = (Node<E>) p; 
		return node;

	}

	public boolean isEmpty(){

		return ((h==0) && (w == 0));

	}

	private Position<E> position(Node<E> node){

		return node;

	}

	public Position<E> leftPos(Position<E> p){
		 
		Node<E> node = validate(p);
		return position(node.getLeft());

	} 

	public Position<E> rightPos(Position<E> p){
		 
		Node<E> node = validate(p);
		return position(node.getRight());

	} 

	public Position<E> abovePos(Position<E> p){
		 
		Node<E> node = validate(p);
		return position(node.getAbove());

	} 

	public Position<E> belowPos(Position<E> p){
		 
		Node<E> node = validate(p);
		return position(node.getBelow());

	} 

	public E set(Position<E> p, E e)throws IllegalArgumentException{

		Node<E> node = validate(p);
		E answer = node.getElement();
		node.setElement(e);
		return answer; 

	}

	//End of 1.1

	//function to get node from node number
	public Position<E> getNode(int nodeNum){

		head = new Node<>();
		Node<E> currentNode = head;
		int currentIter = 0;

		for(int j=0; j<h; j++){

			if(j%2 == 0){

				for (int i=0; i<w-1; i++){

					if (((j*w) + i) == nodeNum){return currentNode;}
					currentNode = currentNode.getRight();
					currentIter ++;

				}

				if((j+1)*(w-1) == nodeNum){return currentNode;}
				currentNode = currentNode.getBelow();
				currentIter ++;

			}

			else{

				for(int i=0; i<w-1; i++){

					if (((j*w) +i) == nodeNum){return currentNode;}
					currentNode = currentNode.getLeft();
					currentIter ++;

				}

				if((j+1)*(w-1) == nodeNum){return currentNode;}
				currentNode = currentNode.getBelow();
				currentIter ++;

			}
		}

		return currentNode;

	}

	private int currentNodeNumber = 0;
	private int currentPositionNumber = 0;

	//defining gridIterator class (implemented with help from slides)
	private class gridIterator implements Iterator<E>{

		public boolean hasNext(){

			//using current and current2 to move between different rows and columns
			Node<E> current;
			Node<E> current2;
			current = head;
			current2 = head;
			int k=0;

			while(k<currentNodeNumber){

				current = current.getRight();

				if(current == null){

					current2 = current2.getBelow();
					current = current2;

				}

				k++;

			}

			return (current.getRight() != null || current.getBelow() != null);

		}

		//using current and current2 to get next element from different rows and columns
		public E next() throws NoSuchElementException{

			Node<E> current;
			Node<E> current2;
			current = head;
			current2 = head;
			int k=0;

			while(k<currentNodeNumber){

				current = current.getRight();

				if(current == null){

					current2 = current2.getBelow();
					current = current2;

				}

				k++;
			}

			// using conditional statements to return appropriate element
			if(current.getRight()!=null) {

				return current.getRight().getElement();

			}
			
			else if(current.getRight() == null && current.getBelow()!=null) {

				current2 = current2.getBelow();
				current = current2;
				return current.getElement();

			}

			else if(current.getRight()==null && current.getBelow()==null){

				throw new NoSuchElementException("No such element");

			}

			return current.getRight().getElement();

		}

		public void remove(){}
	}

	//overwriting the iterator
	public Iterator<E> iterator(){

		Iterator<E> mygridIterator = new gridIterator();
		return mygridIterator;

	}

	//defining positionIterator class
	private class positionIterator implements Iterator<Position<E>>{

		// defining the boolean hasNext() function using current and current2
		public boolean hasNext(){

			Node<E> current;
			Node<E> current2;
			current = head;
			current2 = head;
			int k=0;

			while(k<currentNodeNumber){

				current = current.getRight();

				if(current == null){

					current2 = current2.getBelow();
					current = current2;

				}

				k++;

			}

			return (current.getRight() != null || current.getBelow() != null);

		}

		// using current and current2 to get the next position
		public Position<E> next() throws NoSuchElementException{

			Node<E> current;
			Node<E> current2;
			current = head;
			current2 = head;
			int k=0;

			while(k<currentNodeNumber){

				current = current.getRight();

				if(current == null){

					current2 = current2.getBelow();
					current = current2;

				}

				k++;

			}

			// using conditonal statements to return the appropriate position
			if(current.getRight()!=null) {

				return current.getRight();

			}
			
			else if(current.getRight() == null && current.getBelow()!=null) {

				current2 = current2.getBelow();
				current = current2;
				return current;

			}

			else if(current.getRight()==null && current.getBelow()==null){

				throw new NoSuchElementException ("No such element");

			}

			return current.getRight();

		}

		public void remove(){}

	}

	// method to get element from a position given as an argument
	public E getElementFromPosition(Position<E> p){

		Node<E> node = validate(p);
		Node<E> myNode;
		myNode = (Node<E>) p;

		return myNode.getElement();

	}

	//defining the PositionIterable class
	private class PositionIterable implements Iterable<Position<E>>{

		public Iterator<Position<E>> iterator(){

			Iterator<Position<E>> myPositionIterator = new positionIterator();
			return myPositionIterator;

		}

	}

	public Iterable<Position<E>> position(){

		return new PositionIterable();
		
	}

	//defining the main function
	public static void main(String[] args){

		LinkedMeshGrid<Integer> myMesh = new LinkedMeshGrid<>(4,4);
		System.out.println("Meshgrid has been generated with "+myMesh.grid_height()+" rows and "+myMesh.grid_width()+" columns");


	}
}
