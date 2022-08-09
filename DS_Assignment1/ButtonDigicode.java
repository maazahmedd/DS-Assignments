import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import javax.swing.BoxLayout;


public class ButtonDigicode extends JPanel{

	// creating an array which will store all buttons including those for "*" and "#"
	private JButton[] buttons = new JButton[12];
	private JLabel label;
	private JPanel buttonPanel;
	private JPanel panel1, panel2, panel3, panel4;


	public ButtonDigicode(){
		// constructor, sets up the GUI 


		JFrame frame = new JFrame();
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(new BoxLayout(frame.getContentPane(), BoxLayout.Y_AXIS));
		panel1 = new JPanel();
		panel2 = new JPanel();
		panel3 = new JPanel();
		panel4 = new JPanel();

		// adding numbers to first 10 indices of the array
		for (int i = 0; i < 10; i++){
			buttons[i] = new JButton(String.valueOf(i));
		}

		// adding the "*" and the "#" to the array
		buttons[10] = new JButton("*");
		buttons[11] = new JButton("#");

		ButtonListener listener = new ButtonListener();
		for (int i = 0; i < 12; i++){
			buttons[i].addActionListener(listener);
		}

		label = new JLabel("Indicate a number between 0 and 9");

		buttonPanel = new JPanel();
		buttonPanel.setPreferredSize(new Dimension(300,180));
		buttonPanel.setBackground(Color.blue);


		buttonPanel.add(panel1);
		buttonPanel.add(panel2);
		buttonPanel.add(panel3);
		buttonPanel.add(panel4);

		for (int i = 1; i < 4; i++){
			panel1.add(buttons[i]);
		}

		for (int i = 4; i < 7; i++){
			panel2.add(buttons[i]);
		}

		for (int i = 7; i < 10; i++){
			panel3.add(buttons[i]);
		}

		panel4.add(buttons[10]);
		panel4.add(buttons[0]);
		panel4.add(buttons[11]);

		panel1.setAlignmentX(Component.CENTER_ALIGNMENT);
		panel2.setAlignmentX(Component.CENTER_ALIGNMENT);
		panel3.setAlignmentX(Component.CENTER_ALIGNMENT);
		panel4.setAlignmentX(Component.CENTER_ALIGNMENT);

		setPreferredSize(new Dimension(300,300));
		setBackground(Color.cyan);
		add(label);
		add(buttonPanel);

	}

		// defining the listener for the buttons

		private class ButtonListener implements ActionListener {


			public void actionPerformed (ActionEvent event){

				// finding the index in the array which equalled the user's click
				int k = -1;
				for(int i = 0; i < 12; i++){
					if (event.getSource() == buttons[i]){
						k = i;
					}
				} 

				// using switch case to display appropriate text
				switch(k){
					case 0:
						label.setText("0");
						break;
					case 1:
						label.setText("1");
						break;
					case 2:
						label.setText("2");
						break;
					case 3:
						label.setText("3");
						break;
					case 4:
						label.setText("4");
						break;
					case 5:
						label.setText("5");
						break;
					case 6:
						label.setText("6");
						break;
					case 7:
						label.setText("7");
						break;
					case 8:
						label.setText("8");
						break;
					case 9:
						label.setText("9");
						break;
					case 10:
						label.setText(" ");
						break;
					case 11:
						label.setText(" ");
						break;
				}

			}


		}




}