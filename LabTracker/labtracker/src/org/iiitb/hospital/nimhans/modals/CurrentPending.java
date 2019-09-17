package org.iiitb.hospital.nimhans.modals;

public class CurrentPending {
	
private int gross_count=0;
private int embedding_count=0;
private int typing_count=0;
private int sectioning_count=0;
private int staining_count=0;
private int reporting_count=0;
private int verification_count=0;
private int dispatch_count=0;
public CurrentPending() {
	super();
	// TODO Auto-generated constructor stub
}
public CurrentPending(int gross_count, int embedding_count, int typing_count, int sectioning_count, int staining_count,
		int reporting_count, int verification_count, int dispatch_count) {
	super();
	this.gross_count = gross_count;
	this.embedding_count = embedding_count;
	this.typing_count = typing_count;
	this.sectioning_count = sectioning_count;
	this.staining_count = staining_count;
	this.reporting_count = reporting_count;
	this.verification_count = verification_count;
	this.dispatch_count = dispatch_count;
}
public int getGross_count() {
	return gross_count;
}
public void setGross_count(int gross_count) {
	this.gross_count = gross_count;
}
public int getEmbedding_count() {
	return embedding_count;
}
public void setEmbedding_count(int embedding_count) {
	this.embedding_count = embedding_count;
}
public int getTyping_count() {
	return typing_count;
}
public void setTyping_count(int typing_count) {
	this.typing_count = typing_count;
}
public int getSectioning_count() {
	return sectioning_count;
}
public void setSectioning_count(int sectioning_count) {
	this.sectioning_count = sectioning_count;
}
public int getStaining_count() {
	return staining_count;
}
public void setStaining_count(int staining_count) {
	this.staining_count = staining_count;
}
public int getReporting_count() {
	return reporting_count;
}
public void setReporting_count(int reporting_count) {
	this.reporting_count = reporting_count;
}
public int getVerification_count() {
	return verification_count;
}
public void setVerification_count(int verification_count) {
	this.verification_count = verification_count;
}
public int getDispatch_count() {
	return dispatch_count;
}
public void setDispatch_count(int dispatch_count) {
	this.dispatch_count = dispatch_count;
}


}
