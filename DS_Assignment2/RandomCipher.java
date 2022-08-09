 /* Encryption with the Random Cipher */
/* Goodrich, Tamassia, Goldwasser */
import java.util.Random;


public class RandomCipher{

	protected char[] encoder = new char[30]; // Encryption Array 
	protected char[] decoder = new char[30]; // Decryption array
	// the character list stores in order the alphabets followed by the special character
	protected char[] character_list = new char[30];

	/* The constructor initializes the  encryption and decryption arrays*/

	public RandomCipher(){

		// adding the uppercase letters to the character_list
		for(int i = 0; i < 26; i++){
		character_list[i] = (char)(65+i);
		}

		//adding the special characters to the character_list
		character_list[26] = (char)('#');
		character_list[27] = (char)('$');
		character_list[28] = (char)('&');
		character_list[29] = (char)('=');

		/* the code below uses a variable 'same' to check if the new
		random entry in the encoder matches with any other previous entry
		to avoid repetition */
		char encoder_element = (char)(' ');
		int same;
		int random_number;
		Random ran = new Random();
		for(int k = 0; k < 30; k++){
			same = 0;
			while (same != 1){
				same = 0;
				random_number = ran.nextInt(30);
				encoder_element = character_list[random_number];
				encoder[k] = encoder_element;
				for (int i = 0; i <= k; i++){
					if (encoder_element == encoder[i]){
						same++;
					}
				}
			}
		}

		/* after creating the encoder array, the code below uses the
		character list to find the position of each character in the encoder
		and then to eventually create the decoder array */
		int position = -1;
		for (int j = 0; j < 30; j++){
			for (int i = 0; i < 30; i++){
				if (character_list[j] == encoder[i]){
					position = i;
					break;
				}
			}
			decoder[j] = character_list[position];
		}
	}

	
	public String encrypt(String message){

		/*return String representing the encrypted message */
		return transform(message, encoder);

	}


	public String decrypt(String secret){

		return transform(secret, decoder); 

	}

	/* the code below transforms the message into the encoded or 
	decoded form by checking each character in the character_list
	and then replacing it with the appropriate character in the
	code list (encoder or decoder) */
	private String transform(String original, char[] code){

		char[] msg = original.toCharArray();
		for(int k = 0; k < msg.length; k++){

			for (int j = 0; j < 30; j++){
				if (msg[k] == character_list[j]){
					msg[k] = code[j];
					break;
				}

				}
			}

			return new String(msg);

		}


	public static void main (String [] args){
		/*main method for testing the Caesar Cipher*/


		RandomCipher cipher = new RandomCipher();
		System.out.println("Encryption code = "+ new String(cipher.encoder));
		System.out.println("Decryption code = "+ new String(cipher.decoder));
		String message = "THE EAGLE IS IN PLAY; MEET AT JOE'S";
		String coded = cipher.encrypt(message);
		System.out.println("Secret: "+ coded);
		String answer = cipher.decrypt(coded);
		System.out.println("Message: " + answer);

	}
}

