// importing the java scanner module
import java.util.Scanner;

public class Main{

	MyList<Card> player = new MyList<>();
	MyList<Card> computer = new MyList<>();
	Deck game_deck = new Deck();

	public Main(){
		// the startGame method is called inside the constructor of the Main class
		this.startGame();
	}

	public void deal() {
		// the deal method divides the cards between the player and the computer from a deck
		game_deck.initFullDeck();
		game_deck.shuffle();

		for(int i = 0; i < 26; i++) {
			player.insert(i, game_deck.myDeck.checkElement(i));
		}

		for(int j = 0; j < 26; j++) {
			computer.insert(j, game_deck.myDeck.checkElement(j + 26));
		}


	}

	public void startGame() {
		// the startGame method first calls the deal method
		this.deal();
		System.out.println("Start game: [y]/[n]");
		Scanner input = new Scanner(System.in);
		String input2 = input.nextLine();

		if (input2.equals("n")) {
			return;
		}

		if (input2.equals("y")){
			String input_player;
			Scanner user_input;
			Card player_card, computer_card;
			int player_score = 0;
			int computer_score = 0;

			// setting a while loop to prompt the user to press a key and play a card
			while(!player.isEmpty() && !computer.isEmpty()){
				input_player = " ";
				while (!input_player.equals("s")){
					System.out.println("Please press the key s to play");
					user_input = new Scanner(System.in);
					input_player = user_input.nextLine();
				}

				player_card = player.removeFirst();

				System.out.println("The Player's card is " + player_card.whichCard());

				computer_card = computer.removeFirst();
				
				System.out.println("The Computer's card is " + computer_card.whichCard());

				// comparing the strength of the cards
				if (player_card.isStrongerThan(computer_card)){
					player_score++;
					System.out.println("The Player has won this round");
				}

				else if (computer_card.isStrongerThan(player_card)){
					computer_score++;
					System.out.println("The Computer has won this round");
				}

				else if (player_card.isEqual(computer_card)){
					System.out.println("This round has been tied");
				}

			}

			// checking the winner
			if (player_score > computer_score){
				System.out.println("The Player has won the game");
			}

			else if (computer_score > player_score){
				System.out.println("The Computer has won the game");
			}

			else{
				System.out.println("The game has been tied");
			}

			System.out.println("Game finished, Start new game? [y]/[n]");
			Scanner input4 = new Scanner(System.in);
			String input3 = input4.nextLine();

			if (input3.equals("n")) {
			 	return;
			}

			// restarting the game when needed
			if (input3.equals("y")) {
				this.startGame();
			}

		}
	}


	public static void main(String[] args) {

		Main war_game = new Main();
		
	}


}