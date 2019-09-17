package org.iiitb.hospital.nimhans.modals;

public class IOmodel {
	
	private String date;
	private  int input_count,output_count,pending_count;
	    
		public IOmodel() {
			
		}
		
	
		

		public IOmodel(String date, int input_count, int output_count, int pending_count) {
			super();
			this.date = date;
			this.input_count = input_count;
			this.output_count = output_count;
			this.pending_count = pending_count;
		}




		public String getDate() {
			return date;
		}




		public void setDate(String date) {
			this.date = date;
		}




		public int getInput_count() {
			return input_count;
		}




		public void setInput_count(int input_count) {
			this.input_count = input_count;
		}




		public int getOutput_count() {
			return output_count;
		}




		public void setOutput_count(int output_count) {
			this.output_count = output_count;
		}




		public int getPending_count() {
			return pending_count;
		}




		public void setPending_count(int pending_count) {
			this.pending_count = pending_count;
		}


}
