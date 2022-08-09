/*************************************************************************************/
// Card.java 
//
// implements a simple French-suited card game. Ranks go from 2 to 14, the highest  
// 4 cards being the Jack, Queen, King and Ace (Ace being the higest card)
// The game contains 4 suits: clovers, diamonds, spades and hearts. 
//
//*************************************************************************************/


public class Card{
	

	private static String[] suits = {"clovers", "diamonds", "spades", "hearts"};
	private static String[] ranks = {"2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"}; 


	public String cardSuit;
	public String cardRank;

	// constructor 

	public Card(String suit, String rank){

		cardSuit = suit;
		cardRank = rank; 

	}

	// Accessor Methods


	public String getRank(){

		return cardRank;

	}

	public String getSuit(){

		return cardSuit;

	}

	public String whichCard(){

		return cardRank + " of " + cardSuit;

	}

	// used to compare the cards 

	public boolean isStrongerThan(Card c){

		int value_c;
		int myValue;

		value_c = 0;
		myValue = 0;

		/* returns True if the current card is stronger than c */
		if (c.cardRank != "Jack" && c.cardRank != "Queen" && c.cardRank != "King" && c.cardRank != "Ace"){
		value_c = Integer.parseInt(c.cardRank);}

		if (this.cardRank != "Jack" && this.cardRank != "Queen" && this.cardRank != "King" && this.cardRank != "Ace"){
		myValue = Integer.parseInt(this.cardRank);}

		switch (c.cardRank){

		case "Jack":
			value_c = 11;
			break;
		case "Queen":
			value_c = 12;
			break;
		case "King":
			value_c = 13;
			break; 
		case "Ace":
			value_c = 14;
			break;
		}

		switch (this.cardRank){
		case "Jack":
			myValue  = 11;
			break;
		case "Queen":
			myValue = 12;
			break;
		case "King":
			myValue = 13;
			break; 
		case "Ace":
			myValue = 14;
			break;
		}



		return myValue>value_c ;



	}


	public boolean isEqual(Card c){

 		int value_c = -1;
		int myValue = -1;

		/* returns True if the current card is stronger than c */
		if (c.cardRank != "Jack" && c.cardRank != "Queen" && c.cardRank != "King" && c.cardRank != "Ace"){
		value_c = Integer.parseInt(c.cardRank);}

		if (this.cardRank != "Jack" && this.cardRank != "Queen" && this.cardRank != "King" && this.cardRank != "Ace"){
		myValue = Integer.parseInt(this.cardRank);}


		switch (c.cardRank){

		case "Jack":
			value_c = 11;
			break;
		case "Queen":
			value_c = 12;
			break;
		case "King":
			value_c = 13;
			break; 
		case "Ace":
			value_c = 14;
			break;
		}

		switch (this.cardRank){
		case "Jack":
			myValue  = 11;
			break;
		case "Queen":
			myValue = 12;
			break;
		case "King":
			myValue = 13;
			break; 
		case "Ace":
			myValue = 14;
			break;
		}


		return myValue == value_c ;

	}






}