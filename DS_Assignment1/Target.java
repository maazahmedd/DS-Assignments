/* Assignment 1

given date: Wednesday Feb 03
due date: Thursday Feb 

*/


//package main;

import javax.swing.*;

public class Target{


	// draw the main frame
	public static void main (String[] args){


		JFrame frame = new JFrame ("Target");
		frame.setDefaultCloseOperation (JFrame.EXIT_ON_CLOSE);
		TargetPanel panel = new TargetPanel(); 

		frame.getContentPane().add(panel);
		frame.pack();
		frame.setVisible(true);



	}




}



