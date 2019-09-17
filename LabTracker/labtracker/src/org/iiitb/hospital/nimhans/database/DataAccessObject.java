package org.iiitb.hospital.nimhans.database;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

//Data access object layer Singleton class
public class DataAccessObject {

	private static Connection conn;

	private DataAccessObject() {
		try {
			Properties prop = new Properties();
			String propFileName = "config.properties";
			InputStream inputStream = getClass().getClassLoader().getResourceAsStream(propFileName);
			prop.load(inputStream);
			String userName = prop.getProperty("UserName");
			String password = prop.getProperty("Password");
			String url = prop.getProperty("DataBaseURL");
			Class.forName(prop.getProperty("DriverName")).newInstance();
			conn = DriverManager.getConnection(url, userName, password);
			System.out.println("connection !");
		} catch (Exception e) {
			System.out.println("Exception found" + e);
			closeConnection();
		}
	}

	private static class DAOHelper {
		private static final DataAccessObject dataobject_INSTANCE = new DataAccessObject();
	}

	public static DataAccessObject getInstance() {

		return DAOHelper.dataobject_INSTANCE;
	}

	public Connection Connect() {
		return DataAccessObject.conn;
	}

	public void closeConnection() {
		try {
			conn.close();
		} catch (Exception e) {
			System.out.println("Connection close error");
		}
	}

}
