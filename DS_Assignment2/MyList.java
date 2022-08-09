public class MyList<E> implements ListInterface<E>{
	

 /*Implements a singly linked list of generic types*/


/* We first defining the inner node class */

private static class Node<E>{

	private E element;
	private Node<E> next;
	public Node(E e, Node<E> n){

		element = e;
		next = n;


	}

	public E getElement() {return element;}
	public Node<E> getNext() {return next;}
	public void setNext(Node<E> n) {next = n;}
}

/* We then define the instance variables */

private Node<E> head = null; // head node of the list
private Node<E> tail = null;
private int size = 0;

// Constructor: construct initially empty list
public MyList() {}


/* Methods from ListInterface */

public boolean isEmpty(){ 

/******************************************************************/
/* To be completed
/* should return True if the List is empty 
/******************************************************************/

	return size == 0;

}
public int numElem(){
/******************************************************************/
/* To be completed
/* should return the number of elements in the list 
/******************************************************************/

	return size;


} // 
public void addFirst(E e){

/******************************************************************/
/* To be completed
/* should add an element on top of the list
/******************************************************************/
	
	head = new Node<>(e, head); 
	if (size == 0){
	tail = head;
	}
	size++;


} 
public void addLast(E e){
/******************************************************************/
/* To be completed
/* should add an element at the end of the list 
/******************************************************************/

	Node<E> newest = new Node<>(e, null);
	
	if (isEmpty()) {
	head = newest;
	}
	else {
	tail.setNext(newest);
	}
	tail = newest; 
	size++;


} 
public E removeFirst(){
/******************************************************************/
/* To be completed
/* should remove and return first element 
/******************************************************************/

	if (isEmpty()) {return null;}
	E temp = head.getElement();
	head = head.getNext();
	size--;
	if (size == 0) {tail = null;}
	return temp;


}  
public void insert(int position, E e){
/******************************************************************/
/* To be completed
/* should insert element at given position in the list 
/******************************************************************/

	Node<E> newest = new Node<>(e, null);
	Node<E> temp = head;

	if (position == 0) {
		newest.setNext(head);
		head = newest;
		size++;

	}


	else {
		// the code below will set a temporary variable at position-1
		for (int k = 0; temp!=null && k < position - 1; k++) {
			temp = temp.getNext();
		}

		newest.setNext(temp.getNext());
		temp.setNext(newest);
		size++;

	}

} 
										   
public E remove(int position, E e){
/******************************************************************/
/* To be completed
/* should remove and return element at given position 
/******************************************************************/

	if (isEmpty()) {
		return null;
	}

	Node<E> temp = new Node<>(head.getElement(), head.getNext());

	// checking for the first position of the list
	if (position == 0) {

		temp = head;
		head = head.getNext();
		size--;
		return temp.getElement();
	}

	else {

		temp = head;
		// the following code runs the for loop to reach one position before the desired position
		for (int i = 0; temp!=null && i < position - 1; i++) { 
			temp = temp.getNext();
		}


		// return null if the list was empty or had only a single element inside it initially
		if (temp == null || temp.getNext() == null){
			return null;
		}

		// next_node is the node which appears after the one which is to be removed
		Node<E> next_node = temp.getNext().getNext(); 
		Node<E> removed_node = temp.getNext();
		// next_node is now the node which comes after temp
		temp.setNext(next_node); 
		size--;
		return removed_node.getElement();

	}

} 

public E checkFirst(){
/******************************************************************/
/* To be completed
/* should return (but does not remove) first element
/******************************************************************/
	
	if (isEmpty()) {
		return null;
	}
	return head.getElement();


}  
public E checkLast(){
/******************************************************************/
/* To be completed
/* should return (but does not remove) last element
/******************************************************************/
	
	if (isEmpty()) {
		return null;
	}
	return tail.getElement();


} 
public E checkElement(int position){
/******************************************************************/
/* To be completed
/* should return (but does not remove) element at any given position
/******************************************************************/

	if (isEmpty()){
		return null;
	}

	Node<E> temp = head;

	if (position == 0) {
		return temp.getElement();
	}

	else {
	// the following code runs the for loop to reach one position before the desired position
	for (int i = 0; temp!=null && i < position - 1; i++) {
		temp = temp.getNext();
	}

	// return null if the list was empty or had only a single element inside it initially
	if (temp == null || temp.getNext() == null){
		return null;
	}

	return temp.getNext().getElement();
	}

}  



}