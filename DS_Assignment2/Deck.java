import java.util.Random;

public class Deck{
	
	/* Implements a Deck of cards */
	public MyList<Card> myDeck = new MyList<>();

	

	public Deck(){

		/************************************************************/
		/* constructor, returns empty deck 
		/************************************************************/


	}

	public void shuffle(){

		/************************************************************/
		/* complete
		/* should shuffle the deck randomly         
		/************************************************************/

		// picking a random card in the deck and shuffling it with another card in the deck
		// this makes use of the remove and insert functions
		Random rand_int = new Random();
		int random_index = 0;
		Card card1, card2;
		for(int k = 0; k < myDeck.numElem(); k++){
			random_index = rand_int.nextInt(52);
			card1 = myDeck.checkElement(k);
			card2 = myDeck.checkElement(random_index);
			myDeck.remove(k, card1);
			myDeck.insert(k, card2);
			myDeck.remove(random_index, card2);
			myDeck.insert(random_index, card1);
			

		}

	}


	public void initFullDeck(){

		/************************************************************/
		/* complete 
		/* Should initialize a deck with the 52 cards of a regular  
		/************************************************************/
		String[] ranks = {"2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"};

		for (int i = 0; i < 13; i++){
			myDeck.insert(i, new Card("clovers", ranks[i]));
		}

		for (int j = 0; j < 13; j++){
			myDeck.insert(j+13, new Card("diamonds", ranks[j]));
		}

		for (int k = 0; k < 13; k++){
			myDeck.insert(k + 26, new Card("spades", ranks[k]));
		}

		for (int l = 0; l < 13; l++){
			myDeck.insert(l + 39, new Card("hearts", ranks[l]));
		}

	}


	public int numCards(){

		/************************************************************/
		/* complete 
		/* should return the number of cards in the deck
		/************************************************************/

		return myDeck.numElem();

	}


	public boolean isEmpty(){

		/************************************************************/
		/* complete 
		/* should return true if the deck is empty
		/************************************************************/

		return myDeck.isEmpty();

	}

}