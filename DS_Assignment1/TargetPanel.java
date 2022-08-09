

import javax.swing.JPanel;

import java.awt.*;

public class TargetPanel extends JPanel{


	private final int MAX_WIDTH = 300, NUM_RINGS = 5, RING_WIDTH = 25;

	// setting up the target panel 

	public TargetPanel(){


		setBackground (Color.cyan);
		setPreferredSize(new Dimension(300,300));

	}


	// Paint the target

	public void paintComponent(Graphics page){

		super.paintComponent(page);

		int x =0, y=0, diameter = MAX_WIDTH;

		page.setColor(Color.white);

		// complete the code by drawing NUM_RINGS alternating white 
		// and black rings around the center of the target

		for (int i = 0; i < NUM_RINGS; i++){ 
			if (page.getColor() == Color.white){
				page.setColor(Color.black);
			}
			else if (page.getColor() == Color.black){
				page.setColor(Color.white);
			}
			page.fillOval(x, y, diameter, diameter);
			x += RING_WIDTH;
			y += RING_WIDTH;
			diameter -= 2*RING_WIDTH;
		}

		// Use the function fillOval(x, y, diameter, diameter) as well as page.SetColor(Color.xxx) 
		// and page.GetColor() with color.white and color.black
		// You should start with a diameter given by 2*MAX_WIDTH and then gradually decrease
		// that diameter by 2*RING_WIDTH to draw each ring. Use the final diameter to draw the center of the 
		// target in red. YOU MUST USE A FOR LOOP 






		page.setColor(Color.red);
		page.fillOval(x, y, diameter, diameter);  // change the value of diameter to 
												// to draw the center of the target in red




	}





}
