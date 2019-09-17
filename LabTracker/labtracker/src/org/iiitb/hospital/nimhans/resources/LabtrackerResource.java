package org.iiitb.hospital.nimhans.resources;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.iiitb.hospital.nimhans.modals.CurrentPending;
import org.iiitb.hospital.nimhans.modals.IOmodel;
import org.iiitb.hospital.nimhans.services.LabtrackerService;


//@Path("/")
public class LabtrackerResource {
	

	@Path("/labtrackerio")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
public Response LabTrackerIO_data( @QueryParam("start") String start,@QueryParam("end") String end,@QueryParam("mergedays") String mergedays){
		System.out.println("financial yearsssssssssssssssssssssssssssssssssssssssssssssssssssssss");

		LabtrackerService stateService = new LabtrackerService();	
		List<IOmodel> stateBudgetMaster = stateService.find_InputOutput(start,end,mergedays);
//		System.out.println("66666666"+stateBudgetMaster.get(0).getDate()+" "+stateBudgetMaster.get(0).getInput_count());
//		System.out.println("66666666"+stateBudgetMaster.get(5).getDate()+" "+stateBudgetMaster.get(5).getOutput_count());

		
		
		if (stateBudgetMaster.isEmpty()) {
			System.out.println("failed1234566");

			return Response.noContent().build();
		} else {
			System.out.println("SUCCESS 1233");

			return Response.ok().entity(new GenericEntity<List<IOmodel>>(stateBudgetMaster) {
			}).build();

		}	
	}
	
	@Path("/labtrackercurrentpending")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
public Response LabTracker_currentpending( @QueryParam("date") String date){
		System.out.println("financial yearsssssssssssssssssssssssssssssssssssssssssssssssssssssss"+date);

		LabtrackerService stateService = new LabtrackerService();	
//		List<CurrentPending> stateBudgetMaster = new ArrayList<CurrentPending>();
//		stateBudgetMaster.add(stateService.current_pending(financial_year));stateBudgetMaster.add(stateService.current_pending(financial_year));
		CurrentPending cp=stateService.current_pending(date);
		//System.out.println("66666666"+stateBudgetMaster.get(0).getDate()+" "+stateBudgetMaster.get(0).getInput_count());
		//System.out.println("66666666"+stateBudgetMaster.get(5).getDate()+" "+stateBudgetMaster.get(5).getOutput_count());

		
		
//		if (stateBudgetMaster.isEmpty()) {
//			System.out.println("failed1234566");
//
//			return Response.noContent().build();
//		} else {
//			System.out.println("SUCCESS 1233");

			return Response.ok().entity(new GenericEntity<CurrentPending>(cp) {
			}).build();

			
	}
	@Path("/labtrackertat")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
public Response LabTrackertat( @QueryParam("start_date") String start,@QueryParam("end_date") String end){
		System.out.println("financial yearsssssssssssssssssssssssssssssssssssssssssssssssssssssss  "+start+" "+end);

		LabtrackerService stateService = new LabtrackerService();	
		List<IOmodel> stateBudgetMaster = stateService.tat(start,end);
//		System.out.println("66666666"+stateBudgetMaster.get(0).getDate()+" "+stateBudgetMaster.get(0).getInput_count());
//		System.out.println("66666666"+stateBudgetMaster.get(5).getDate()+" "+stateBudgetMaster.get(5).getOutput_count());

		
		
		if (stateBudgetMaster.isEmpty()) {
			System.out.println("failed1234566");

			return Response.noContent().build();
		} else {
			System.out.println("SUCCESS 1233");

			return Response.ok().entity(new GenericEntity<List<IOmodel>>(stateBudgetMaster) {
			}).build();

		}	
	}
}
