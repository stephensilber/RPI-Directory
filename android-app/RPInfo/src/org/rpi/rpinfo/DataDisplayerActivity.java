package org.rpi.rpinfo;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

import android.app.Activity;
import android.os.Bundle;

public class DataDisplayerActivity extends Activity {
	
	private String readInputStream(InputStream in){
		try {
			String result = "";
			byte[] buffer = new byte[1024];
			
			while( in.available() > 0 ){
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return null;
	}

	public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.result);
		
		Bundle b = getIntent().getExtras();
		if( b == null ){
			finish();
		}
		
		String searchTerm = (String)b.get("searchTerm");
		
		try {
			URL apiURL = new URL("rpidirectory.appspot.com/api?name=" + searchTerm);
			URLConnection connection = apiURL.openConnection();
			InputStream in = new BufferedInputStream(connection.getInputStream());
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
}