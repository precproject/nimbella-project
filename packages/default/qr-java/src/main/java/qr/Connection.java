//package qr;
//
//import java.sql.DriverManager;
//import com.google.cloud.storage.Storage;
//import com.google.cloud.storage.StorageOptions;
//import com.google.gson.Gson;
//import com.google.gson.JsonObject;
//
//import redis.clients.jedis.Client;
//import redis.clients.jedis.Jedis;
//import redis.clients.jedis.JedisPoolConfig;
//
//public class Connection {
//
//	public static Client redisConnect() throws Exception {
//		String redisHost = System.getenv().get("__NIM_REDIS_IP");
//		if(redisHost.isEmpty() || redisHost == null) {
//			throw new Exception("Key-Value store is not available");
//		}
//		String redisPassword = System.getenv().get("__NIM_REDIS_PASSWORD");
//		if(redisPassword.isEmpty() || redisPassword == null) {
//			throw new Exception("Key-Value store password is not available");
//		}
//		Jedis client = new Jedis(redisHost,6379,300);
//		if(client.getClient() == null) {
//			throw new Exception("Error creating redis client");
//		}
//		client.auth(redisPassword);
//		return client.getClient();
//	}
//
//	private JedisPoolConfig buildPoolConfig() {
//	    final JedisPoolConfig poolConfig = new JedisPoolConfig();
//	    poolConfig.setMaxTotal(1);
//	    poolConfig.setMaxIdle(2);
//	    poolConfig.setMinIdle(1);
//	    poolConfig.setBlockWhenExhausted(true);
//	    return poolConfig;
//	}
//	
//	public static Storage storageConnect() throws Exception {
//		boolean web = false;
//		String cred = System.getenv().get("__NIM_STORAGE_KEY");
//		if (cred == null || cred.isEmpty())
//			throw new Exception("Objectstore credentials are not available");
//
//		String namespace = System.getenv().get("__OW_NAMESPACE");
//		String apiHost = System.getenv().get("__OW_API_HOST");
//		if (namespace == null || namespace.isEmpty() || apiHost == null || apiHost.isEmpty())
//			if (cred == null || cred.isEmpty())
//				throw new Exception(
//						"Not enough information in the environment to determine the object store bucket name");
//
//		String hostpart = String.join("-", apiHost.replace("https://", "").split("."));
//		String datapart = web == true ? "" : "data-";
//		String bucket = "gs://" + datapart + namespace + "-" + hostpart;
//
//		Storage storage = null;
//		JsonObject parsedCreds = null;
//		try {
//			parsedCreds = new Gson().fromJson(cred, JsonObject.class);				
//		} catch (Exception e) {
//			throw new Exception("Insufficient information in provided credentials or credentials were invalid");
//		}
//		if(parsedCreds!=null) {
//			String client_email = parsedCreds.get("client_email").getAsString();
//			String project_id = parsedCreds.get("project_id").getAsString();
//			String private_key = parsedCreds.get("private_key").getAsString();
//			storage = StorageOptions.newBuilder()
//					.setProjectId(project_id).build().getService();
//			//return storage.get(bucket,");
//		}
//		return storage;
//	}
//
//	public static Connection sqlConnect() throws Exception {
//		String creds  = System.getenv().get("__NIM_SQL_KEY");
//		if(creds.isEmpty() || creds == null) {
//			throw new Exception("Sql credentials are not available");
//		}
//		JsonObject parsedCreds = new Gson().fromJson(creds, JsonObject.class);
//		String host = parsedCreds.get("host").getAsString();
//		String user = parsedCreds.get("user").getAsString();
//		String database = parsedCreds.get("database").getAsString();
//		String password = parsedCreds.get("password").getAsString();
//
//		return (Connection) DriverManager.getConnection("jdbc:mysql://"+host+":3306/"+database+"?useSSL=true&requireSSL=true&serverSslCert=/tmp/ssl/server-cert.pem", user, password);
//	}
//}
