package org.iiitb.hospital.nimhans.services;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.io.InputStream;

import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


import org.iiitb.hospital.nimhans.database.DataAccessObject;
import org.iiitb.hospital.nimhans.modals.CurrentPending;

import org.iiitb.hospital.nimhans.modals.IOmodel;


import com.mysql.fabric.xmlrpc.base.Data;

import java.lang.*;
public class LabtrackerService {
	
	private Connection connection;
	public LabtrackerService(){
		connection = DataAccessObject.getInstance().Connect();
	}
	

public List<IOmodel> find_InputOutput(String startd,String endd,String mergedays){
	  System.out.println("These are start = " + startd +" end = "+ endd +" mergedays = "+ mergedays + " in sbs");
	  SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd"); 
	  List<IOmodel> io_list=new ArrayList<IOmodel>();
	  int input_count=0;
	  int output_count=0;
	  int pending_count=0;
	  int mer_days = Integer.parseInt(mergedays);
	//
	  String csvFile = "AllTransaction-2.csv";
	  String propFileName = "AllTransaction-2.csv";
	  String line = "";
	  String line1 = "";
	  String cvsSplitBy = ",";
	//int k=0;
	  ArrayList<String> Dates=new ArrayList<String>();
	  //ArrayList<String> ids=new ArrayList<String>();
	//  String given_date1=endd;
	//
	 // Dates.add(given_date1);
	  try{
	  Date start = sdf.parse(startd);
	  Date end = sdf.parse(endd);
	// Date given_date = sdf.parse(given_date1);
	      Date current_date=start;
	      Date previous_date=sdf.parse(endd.split("/")[0]+"/"+ Integer.toString(Integer.parseInt(endd.split("/")[1]) - 1) +"/"+endd.split("/")[2]);
	      System.out.println("current_date = " + current_date +" previous_date = "+ previous_date + "in sbs");
	      int in=0,out=0;
	      InputStream inputStream1 = getClass().getClassLoader().getResourceAsStream(propFileName);
	      BufferedReader br1 = new BufferedReader(new InputStreamReader(inputStream1));
	      int lastDate=0;
	      line1 = br1.readLine();
	  while ((line1 = br1.readLine()) != null) {
	  //   k+=1;
	      String[] data = line1.split(cvsSplitBy);
	      String[] id=data[0].split(":");
	      char x_value=data[0].charAt(0);
	      String status=data[3];
	      String[] date=data[4].split(" ")[0].split("/");
	      Date date_1=sdf.parse(date[2]+"/"+date[0]+"/"+date[1]);
	    if(date_1.compareTo(current_date)<=0 && date_1.compareTo(previous_date)>=0 && id.length==1){
	    if(status.equals("Grossing")){
	        in+=1;
	      }
	    else if(status.equals("Dispatch")  ){
	      out+=1;
	    }
	    else if(status.equals("Verification") && x_value!='X' ){
	        out+=1;
	      }
	    }
	  }
	  int pending_month=Math.abs(in-out);
	  if(pending_month < 0) {pending_month=0;}
	  //   pending_count=Math.abs(in-out);
	    System.out.println("pending_month : "+pending_month);
             line="";
	          InputStream inputStream = getClass().getClassLoader().getResourceAsStream(propFileName);
	          BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
	        // line = br.readLine();
	          pending_count=pending_month;
	          int temp=0,flag=0;
	          String start_date=null,end_date=null;
	          line = br.readLine();
	          while ((line = br.readLine()) != null ) {
		          //System.out.println("enters while: ");

	          String[] data = line.split(cvsSplitBy);
	          String id=data[0];
	          char x_value=id.charAt(0);
	          String status=data[3];
	          String[] date=data[4].split(" ")[0].split("/");
	          String date_11=date[2]+"/"+date[0]+"/"+date[1];
	          Date date_1 = sdf.parse(date_11);
	         // System.out.println("dddatteee: "+date_11+"--"+ end);
	        if(end.compareTo(date_1)>=0 && start.compareTo(date_1) <=0){
	        	flag=1;
	  	        if(!Dates.contains(date_11)) {
	        	if(temp==0) {start_date=date_11;}
                if(temp==(mer_days-1)) {end_date=date_11;}
                  Dates.add(date_11);
	              temp=temp+1;
	             
		        }
				  if(status.equals("Grossing")   ){
			          input_count+=1;
			        }
			      else if(status.equals("Dispatch")  ){
			        output_count+=1;
			      }
			      else if(status.equals("Verification") && x_value!='X' ){
			          output_count+=1;
			       }
				  if(temp==mer_days)
	              {
	                   // System.out.println("Date = "+date_11);
	                    //System.out.println("temp = "+temp + ",in = "+input_count+",out = "+output_count + ",pending = "+pending_count);
	                    temp=0;
	                    if(pending_count < 0){pending_count=0;}
	                    String Date_1=null;
	                    if(start_date.equals(end_date)) {Date_1=start_date;}
	                    else {Date_1=start_date+"-"+end_date;}
	                    IOmodel io=new IOmodel(Date_1,input_count,output_count,pending_count);
	                    lastDate=Dates.size()-1;
	                    System.out.println(date_11);
	                    io_list.add(io);
	                    //pending_count=pending_count-(input_count-output_count);
	                    input_count=0;
	                    output_count=0;
	               
	            }
	        }
	        else if(flag==1 && temp!=0)
	        {
	        	//System.out.println("dateeeesize:  "+(Dates.size()-1)+" "+lastDate);
                String Date_1=null;
	        	if(start_date.equals(Dates.get(Dates.size()-1))){Date_1=Dates.get(Dates.size()-1);}
	        	else {Date_1=start_date+"-"+Dates.get(Dates.size()-1);}
	        IOmodel io=new IOmodel(Date_1,input_count,output_count,pending_count);
	        io_list.add(io);
	        break;

	        }
	       
	        }
         for(int i=0;i<io_list.size();i++)
         {   IOmodel io=io_list.get(io_list.size()-1-i);
        	 pending_count=pending_count+io.getInput_count()-io.getOutput_count();
             io.setPending_count(pending_count);
         }
	      //System.out.println("size = " + Dates.size());
	  }
	  catch (IOException e) {
	      e.printStackTrace();
	  } catch (ParseException e) {
	e.printStackTrace();
	}
	return io_list;
	}

public CurrentPending current_pending(String date_s)
{      System.out.println("line1");

	List<Integer> list_pending=new ArrayList<Integer>();
  SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
  int gross_count=0;
  int embedding_count=0;
  int typing_count=0;
  int sectioning_count=0;
  int staining_count=0;
  int reporting_count=0;
  int verification_count=0;
  int dispatch_count=0;
  String propFileName = "AllTransaction-2.csv";
  String line = "";
  String cvsSplitBy = ",";
 ArrayList<String> visited_ids=new ArrayList<String>();
  try{
	  Date given_date=sdf.parse(date_s);

			InputStream inputStream = getClass().getClassLoader().getResourceAsStream(propFileName);
          BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
          line = br.readLine();
int i=0;
      while ((line = br.readLine()) != null) {
    	  System.out.println("entered while:"+i);
    	  i++;
          String[] data = line.split(cvsSplitBy);
          String id=data[0];
          char x_value=id.charAt(0);
          String status=data[3];
          String[] date=data[4].split(" ")[0].split("/");
          Date date_1=sdf.parse(date[2]+"/"+date[0]+"/"+date[1]);
         if(given_date.compareTo(date_1)>=0 && !visited_ids.contains(id))
          {
        	 visited_ids.add(id);
         if(status.equals("Grossing"))
          {
        	 gross_count+=1;
          }
         else if(status.equals("Embedding")  )
         {
        	 embedding_count+=1;

         }
         else if(status.equals("Typing")  )
         {
        	 typing_count+=1;

         }
         else if(status.equals("Sectioning")  )
         {
        	 sectioning_count+=1;

         }
         else if(status.equals("Staining")  )
         {
        	 staining_count+=1;

         }
         else if(status.equals("Reporting")  )
         {
        	 reporting_count+=1;

         }
        else if(status.equals("Dispatch")  )
        {
        	dispatch_count+=1;

        }
        else if(status.equals("Verification"))
          {
        	verification_count+=1;

          }
       
        }
         


        }
      System.out.println("check123----------->"+gross_count+" "+embedding_count+" "+typing_count+" "+sectioning_count+" "+staining_count+" "+reporting_count+" "+verification_count+" "+dispatch_count);

      System.out.println("finished");

  } 
  catch (IOException e) {
      e.printStackTrace();
  } catch (ParseException e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
}
  CurrentPending cp=new CurrentPending(gross_count,embedding_count,typing_count,sectioning_count,staining_count,reporting_count,verification_count,dispatch_count);
System.out.println("check----------->"+gross_count+" "+embedding_count+" "+typing_count+" "+sectioning_count+" "+staining_count+" "+reporting_count+" "+verification_count+" "+dispatch_count);
return cp;
}	
int numdays(String d1,String d2)
{
	String[] dd1 =d1.split("/");
    String[] dd2 =d2.split("/");
    if( Integer.parseInt(dd2[0]) == Integer.parseInt(dd1[0]) && Integer.parseInt(dd2[1]) == Integer.parseInt(dd1[1]) ){

           return  Integer.parseInt(dd2[2]) - Integer.parseInt(dd1[2]) ;
     }
  else if(Integer.parseInt(dd2[0]) == Integer.parseInt(dd1[0]) && Integer.parseInt(dd2[1]) == Integer.parseInt(dd1[1])+1 && Integer.parseInt(dd2[2]) <= Integer.parseInt(dd1[2]) ){
	  return 30-Integer.parseInt(dd1[2])+ Integer.parseInt(dd2[2]) ;
  }
  else if(Integer.parseInt(dd2[0]) == Integer.parseInt(dd1[0])+1 && (Integer.parseInt(dd1[1]) == 12 && Integer.parseInt(dd2[1]) == 1) && Integer.parseInt(dd2[2]) <= Integer.parseInt(dd1[2]) ){

	  return 30-Integer.parseInt(dd1[2])+ Integer.parseInt(dd2[2]) ;
    }

    return 31;
}
public List<IOmodel> tat(String start_s, String end_s){
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
	 System.out.println("entertat");
	int[] total_out = new int[32];
int[] total_pending = new int[32];
List<IOmodel> out_pendinglist=new ArrayList<IOmodel>();


for(int i=0;i<32;i++) {
total_out[i]=0;
total_pending[i]=0;

}
  String propFileName = "AllTransaction-2.csv";
  String line = "";
  String cvsSplitBy = ",";
  try{
	  Date start=sdf.parse(start_s);
	  Date end=sdf.parse(end_s);
      InputStream inputStream = getClass().getClassLoader().getResourceAsStream(propFileName);
      BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
      ArrayList<String> dis_ids=new ArrayList<String>();
      ArrayList<Date> dis_dates=new ArrayList<Date>();
      
      line = br.readLine();
      while ((line = br.readLine()) != null) {
      String[] data = line.split(cvsSplitBy);
			      String status = data[3];
			      String[] id=data[0].split(":");
			      String[] dates = data[4].split(" ")[0].split("/");
			      //System.out.println("date :"+"/"+data[4].split(" ")[0]);
			      Date date_1=sdf.parse(dates[2]+"/"+dates[0]+"/"+dates[1]);
			     // System.out.println("date error");
			  if(date_1.compareTo(start) >= 0 && date_1.compareTo(end) <= 0 && id.length==1){
			        if(status.equals("Grossing")){
				        dis_ids.add(id[0]);
				        dis_dates.add(date_1);
				        
				    }
				      }
     
  }
      System.out.println("sizeeeeee:->"+dis_ids.size());
      
      for(int i=0;i<dis_ids.size();i++) {
    	 
      String d1=null,d2=null;
      InputStream inputStream1 = getClass().getClassLoader().getResourceAsStream(propFileName);
      BufferedReader br1 = new BufferedReader(new InputStreamReader(inputStream1));
      String line1 = "";
      line1 = br1.readLine();
      while ((line1 = br1.readLine()) != null) {
	      System.out.println("entered while loop"+i);

      String[] data = line1.split(cvsSplitBy);
      String status = data[3];
      String[] id=data[0].split(":");
      String[] dates = data[4].split(" ")[0].split("/");
      Date date_1=sdf.parse(dates[2]+"/"+dates[0]+"/"+dates[1]);
 
         if((status.equals("Dispatch") || (status.equals("Verification") && (id[0].charAt(0)!='X')) ) && date_1.compareTo(end) <= 0 && dis_ids.get(i).equals(id[0])){
	      d2 = sdf.format(date_1).toString();
	      System.out.println("entered dispatch");
	      total_out[numdays(sdf.format(dis_dates.get(i)).toString(),d2)]++;
	      }
	      
      
  }
      if(d2==null)
      {
    	  total_pending[numdays(sdf.format(dis_dates.get(i)).toString(),end_s)]++;
      }
      
      }
     
  }
  catch (IOException e) {
      e.printStackTrace();
  } catch (ParseException e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
}
  for(int i=0;i<32;i++) {
	  System.out.println(total_out[i]+" "+total_pending[i]);
	  out_pendinglist.add(new IOmodel(null,0,total_out[i],total_pending[i]));
	  }
return out_pendinglist;
}
//int numdays(String d1,String d2){
////System.out.println("numdays");
////System.out.println("date1 = " + d1 + " date2 = " + d2);
//    String[] dd1 =d1.split("/");
//    String[] dd2 =d2.split("/");
//    if( Integer.parseInt(dd2[0]) == Integer.parseInt(dd1[0]) && Integer.parseInt(dd2[1]) == Integer.parseInt(dd1[1]) ){
//    //System.out.println("case 1 : ");
//    //System.out.println(Integer.parseInt(dd2[2]) - Integer.parseInt(dd1[2]));   
//    return  Integer.parseInt(dd2[2]) - Integer.parseInt(dd1[2]) ;
//           
//     }
//
//    else if(Integer.parseInt(dd2[0]) == Integer.parseInt(dd1[0]) && Integer.parseInt(dd2[1]) == Integer.parseInt(dd1[1])+1 && Integer.parseInt(dd2[2]) <= Integer.parseInt(dd1[2]) ){
//   // System.out.println("case 2 : ");
//    //System.out.println(30-Integer.parseInt(dd1[2]) + Integer.parseInt(dd2[2]));   
//    return 30-Integer.parseInt(dd1[2])+ Integer.parseInt(dd2[2]) ;
//    }
//
//    else if(Integer.parseInt(dd2[0]) == Integer.parseInt(dd1[0])+1 && (Integer.parseInt(dd1[1]) == 12 && Integer.parseInt(dd2[1]) == 1) && Integer.parseInt(dd2[2]) <= Integer.parseInt(dd1[2]) ){
//    //System.out.println("case 3 : ");
//    //System.out.println(30-Integer.parseInt(dd1[2])+ Integer.parseInt(dd2[2]));
//    return 30-Integer.parseInt(dd1[2])+ Integer.parseInt(dd2[2]) ;
//    }
//    return 31;
//}
//
//public List<IOmodel> tat(String start, String end){
//  System.out.println("entered sbs tat");
//  System.out.println("start = " + start + "end = " + end);
//  int[] total_out = new int[32];
//  int[] total_pending = new int[32];
//  List<IOmodel> total_data = new ArrayList<IOmodel>();
//  for(int i=0;i<31;i++) {
//total_out[i]=0;
//total_pending[i]=0;
//  }
//  String csvFile = "AllTransaction-2.csv";
//  String propFileName = "AllTransaction-2.csv";
//  String line = "";
//  String cvsSplitBy = ",";
//  try{
//      InputStream inputStream = getClass().getClassLoader().getResourceAsStream(propFileName);
//      BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
//      ArrayList<String> dis_ids=new ArrayList<String>();
//      ArrayList<String> dis_dates=new ArrayList<String>();
//
//      line = br.readLine();
//      while ((line = br.readLine()) != null) {
//      String[] data = line.split(cvsSplitBy);
//      String status = data[3];
//      String[] id1=data[0].split(":");
//      String[] dates = data[4].split(" ")[0].split("/");
//      String date_1=dates[2]+"/"+dates[0]+"/"+dates[1];
//  if(date_1.compareTo(start) >= 0 && date_1.compareTo(end) <= 0 && id1.length==1){
//        if(status.equals("Grossing")){
//        dis_ids.add(id1[0]);
//        dis_dates.add(date_1);
//        }
//  }
//      }
//      System.out.println("size = " + dis_ids.size());
//      for(int i=0;i<dis_ids.size();i++) {
//      //System.out.println(dis_ids.get(i));
//      }
////      InputStream inputStream1 = getClass().getClassLoader().getResourceAsStream(propFileName);
////      BufferedReader br1 = new BufferedReader(new InputStreamReader(inputStream1));
//     // String line1 = "";
//      for(int i=0;i<dis_ids.size();i++) {
//      //System.out.println("for loop size = " + dis_ids.size());
//      String d1=null,d2=null;
//      int flag=0;
//      //System.out.println("Entering while");
//      InputStream inputStream1 = getClass().getClassLoader().getResourceAsStream(propFileName);
//      BufferedReader br1 = new BufferedReader(new InputStreamReader(inputStream1));
//      String line1 = "";
//      line1 = br1.readLine();
//  while ((line1 = br1.readLine()) != null) {
// // System.out.println("Entered while");
//      String[] data = line1.split(cvsSplitBy);
//      String status = data[3];
//      String[] id=data[0].split(":");
//      String[] dates = data[4].split(" ")[0].split("/");
//      String date_1=dates[2]+"/"+dates[0]+"/"+dates[1];
//      //System.out.println("array_ids = " + dis_ids.get(i) + "current_id = " + id[0]);
//  if(dis_ids.get(i).equals(id[0]) && id.length==1) {
//  
//     if((status.equals("Dispatch") || (status.equals("Verification") && (id[0].charAt(0)!='X')) ) && date_1.compareTo(end) <= 0 ){
//      d2 = date_1;
//     // System.out.println("date2 is :" + d2 +"Its total out");
//      total_out[numdays(dis_dates.get(i),d2)]++;
//      }
//  }
//  }
//      if(d2==null){
//   
//  //System.out.println("date1 is :" + d1 + "end is :" + end + "Its total pending");
//          total_pending[numdays(dis_dates.get(i),end)]++;
//      }
//      }
//  }
//  catch (IOException e) {
//      e.printStackTrace();
//  }
//  for(int i=0;i<32;i++) {
//  IOmodel currentData =  new IOmodel(null,0,total_out[i],total_pending[i]);
//  System.out.println(total_out[i]+" "+total_pending[i]);
//
//  total_data.add(currentData);
//  }
//  System.out.println(total_data);
//return total_data;
//}

}
