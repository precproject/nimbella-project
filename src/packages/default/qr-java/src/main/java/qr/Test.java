package qr;

import java.io.*;
import java.util.Base64;

import com.google.gson.JsonObject;

import com.google.zxing.*;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;

public class Test {
  public static JsonObject main(JsonObject args) throws Exception {
    String property = "text";
    String text = "Hello. Try with a 'text' value next time.";
    if (args.has(property)) {
      text = args.get(property).toString();
    }

    JsonObject response = new JsonObject();
    JsonObject headers = new JsonObject();
    headers.addProperty("content-type", "text/html; charset=UTF-8");
    response.addProperty("body", System.getenv().keySet().toString());
    return response;
  }
}
