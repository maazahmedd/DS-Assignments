

//*************************************************************************************
// ListInterface.java 
//
// Represents the interface for a list of objects
//
//*************************************************************************************

public interface ListInterface<E>{



	public boolean isEmpty(); // returns True if the List is empty
	public int numElem(); // return the number of elements in the list 
	public void addFirst(E e); // Add an element on top of the list
	public void addLast(E e); // Add an element at the end of the list 
	public E removeFirst(); // remove and return first element 
	public void insert(int position, E e); // insert element at given position in the list 
										   // position 0 is head of the list 
	public E remove(int position, E e); // remove and return element at given position 

	public E checkFirst(); // return (but does not remove) first element
	public E checkLast(); // return (but does not remove) last element
	public E checkElement(int position); // return (but does not remove) element at any given position



}
