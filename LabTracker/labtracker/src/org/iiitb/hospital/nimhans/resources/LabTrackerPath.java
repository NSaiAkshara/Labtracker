package org.iiitb.hospital.nimhans.resources;

import javax.ws.rs.Path;

@Path("/labtracker")
public class LabTrackerPath {

	@Path("/labtrackerapplication")
	public LabtrackerResource getlabtrackerinfo(){
		System.out.println("entered what i wanted ");
		return new LabtrackerResource();
	}
	
	

}