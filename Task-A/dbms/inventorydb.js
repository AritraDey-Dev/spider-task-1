const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb://localhost:27017/";
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db('inventoryDB');
    const collection = database.collection('products');

  
    const products = [
      {
        name: "Product1",
        description: "Description for Product1",
        price: 10.99,
        quantity: 100,
        category: "Category1"
      },
      {
        name: "Product2",
        description: "Description for Product2",
        price: 19.99,
        quantity: 150,
        category: "Category2"
      },
      {
        name: "Product3",
        description: "Description for Product3",
        price: 5.99,
        quantity: 200,
        category: "Category1"
      },
      {
        name: "Product4",
        description: "Description for Product4",
        price: 25.99,
        quantity: 50,
        category: "Category3"
      },
      {
        name: "Product5",
        description: "Description for Product5",
        price: 15.99,
        quantity: 75,
        category: "Category2"
      }
    ];

    await collection.insertMany(products);
    console.log("Inserted products");

    const allProducts = await collection.find().toArray();
    console.log("All products:", allProducts);

    const affordableProducts = await collection.find({ price: { $lt: 20 } }).toArray();
    console.log("Affordable products:", affordableProducts);


    const highQuantityProducts = await collection.find({ quantity: { $gt: 100 } }).toArray();
    console.log("High quantity products:", highQuantityProducts);


    await collection.updateOne({ name: "Product1" }, { $set: { price: 12.99 } });
    console.log("Updated price of Product1");


    await collection.deleteOne({ name: "Product5" });
    console.log("Deleted Product5");
  } finally {
    await client.close();
  }
}

main().catch(console.error);
