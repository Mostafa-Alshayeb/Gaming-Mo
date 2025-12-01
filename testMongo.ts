import { connect } from "./app/actions/connet.ts";

async function testMongo() {
  try {
    const db = await connect();
    console.log("✅ MongoDB is working!");
    console.log("Database Name:", db.connection.db.databaseName);
    process.exit(0);
  } catch (err) {
    console.error("❌ MongoDB test failed:", err);
    process.exit(1);
  }
}

testMongo();
