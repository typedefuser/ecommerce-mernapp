const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

const url = 'mongodb://userbane:password@localhost:27017/databasename?authSource=admin';// Update with your username and password
const collectionName = 'products';

async function importCSV(filePath) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to database');

    const db = client.db('mydb');
    const collection = db.collection(collectionName);

    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Convert fields to appropriate types
        const formattedData = {
          product_id: parseInt(data.product_id, 10), // Convert to integer
          product_name: data.product_name,
          price: parseFloat(data.price), // Convert to float
          quantity_available: parseInt(data.quantity_available, 10), // Convert to integer
          category: data.category,
          brand: data.brand,
          shipping_cost: parseFloat(data.shipping_cost), // Convert to float
          arrival_date: new Date(data.arrival_date) // Convert to Date
        };
        results.push(formattedData);
      })
      .on('end', async () => {
        try {
          await collection.insertMany(results);
          console.log('CSV file successfully processed and data inserted');
        } catch (err) {
          console.error('Insert failed:', err.message);
        } finally {
          await client.close();
        }
      });
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
}

// Use the path to your CSV file
importCSV('./data.csv');