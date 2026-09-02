const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://huyle_user:Dkgh72113221@cluster0.lzelvpa.mongodb.net/cloud-lab?appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Đã kết nối thành công tới MongoDB!");
    const db = client.db("cloud-lab");
    const collections = await db.listCollections().toArray();
    console.log("Các collection trong cloud-lab:", collections.map(c => c.name));
  } catch (err) {
    console.error("❌ Lỗi kết nối:", err);
  } finally {
    await client.close();
  }
}

run();
