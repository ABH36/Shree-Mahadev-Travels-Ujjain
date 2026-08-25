import dotenv from "dotenv";
import dns from "node:dns";
import { MongoClient } from "mongodb";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();

const users = [
  "shree",
  "mahadev",
  "travels",
  "ujjain",
  "shreemahadev1",
  "shreemahadev2",
  "shree_mahadev",
  "shree_mahadev_user",
  "shreemahadev_user",
  "shreemahadevtravels_user",
  "admin1",
  "user1",
  "demo",
  "test",
  "cluster0"
];

async function test() {
  const password = "qPIVe8GksdzIfNNe";
  const host = "cluster0.fa5ljoa.mongodb.net";
  const db = "shree_mahadev_travels";

  for (const u of users) {
    const uri = `mongodb+srv://${u}:${password}@${host}/${db}?retryWrites=true&w=majority`;
    try {
      const client = new MongoClient(uri, { serverSelectionTimeoutMS: 3000 });
      await client.connect();
      console.log(`>>> SUCCESS! Valid username is: ${u}`);
      await client.close();
      return u;
    } catch (err: any) {
      if (!err.message.includes("bad auth")) {
        console.log(`Error for ${u}: ${err.message}`);
      }
    }
  }
  console.log("No matching username in list.");
}

test();
