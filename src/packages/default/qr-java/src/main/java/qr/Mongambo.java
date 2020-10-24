package qr;

import org.bson.Document;

import com.google.gson.JsonObject;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.*;

public class Mongambo {
	public static void main(String[] args) throws Exception {
		MongoClientURI uri = new MongoClientURI(
				"mongodb+srv://"+System.getenv().get("username")+":"+System.getenv().get("password")+"@cluster0.oc00k.mongodb.net/"+System.getenv().get("database")+"?retryWrites=true&w=majority");
		MongoClient mongoClient = new MongoClient(uri);
		MongoDatabase database = mongoClient.getDatabase(System.getenv().get("database"));
		MongoCollection<Document> collection = database.getCollection("ADMIN");
		Document document = new Document();
		document.put("username", "test");
		document.put("password", "test");
		collection.insertOne(document);
		Document user = collection.find(eq("username", "test")).first();
		JsonObject response = new JsonObject();
		response.addProperty("user", user.toString());
		System.out.println(response);
		mongoClient.close();
	}
}
