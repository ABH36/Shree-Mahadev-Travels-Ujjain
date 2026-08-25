import dotenv from "dotenv";
import dns from "node:dns";
import { MongoClient } from "mongodb";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();

const users = [
  "shreemahadev",
  "shree_mahadev",
  "shreemahadevtravels",
  "shreemahadevtravelsujjain",
  "admin",
  "root",
  "user",
  "shree",
  "mahadev",
  "travels",
  "ujjain",
  "dbuser"
];

const passwords = [
  "qPIVe8GksdzIfNNe",
  encodeURIComponent("qPIVe8GksdzIfNNe")
];

async function test() {
  const host = "cluster0.fa5ljoa.mongodb.net";
  const db = "shree_mahadev_travels";

  for (const u of users) {
    for (const p of passwords) {
      const uri = `mongodb+srv://${u}:${p}@${host}/${db}?retryWrites=true&w=majority`;
      try {
        const client = new MongoClient(uri, { serverSelectionTimeoutMS: 3000 });
        await client.connect();
        console.log(`\n========================================`);
        console.log(`>>> SUCCESS! MongoDB Username is: "${u}"`);
        console.log(`>>> Connection URI: ${uri}`);
        console.log(`========================================\n`);
        await client.close();
        return { u, p, uri };
      } catch (err: any) {
        if (!err.message.includes("bad auth")) {
          console.log(`Error for ${u}: ${err.message}`);
        }
      }
    }
  }
  console.log("None of the standard combinations authenticated.");
}

test();
