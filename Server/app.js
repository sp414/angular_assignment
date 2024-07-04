const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs/promises");
const cors = require("cors"); // Import CORS packag

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all origins
app.use(cors());

// Endpoint to retrieve transactions sorted by date and filtered by status
app.get("/transactions", async (req, res) => {
  await fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to read data file");
    } else {
      try {
        const transactions = JSON.parse(data);
        const allowedStatus = ["COMPLETED", "IN PROGRESS", "REJECTED"];
        const filteredTransactions = transactions.filter((transaction) =>
          allowedStatus.includes(transaction.status)
        );
        filteredTransactions.sort((a, b) => a.date - b.date); // Sort by date ascending
        res.json(filteredTransactions);
      } catch (err) {
        console.error(err);
        res.status(500).send("Failed to parse JSON data");
      }
    }
  });
});

app.post("/updateComment", async (req, res) => {
  const { id, comments } = req.body;

  if (!id || !comments) {
    return res.status(400).send("Transaction ID and comments are required");
  }

  if (!/^[a-zA-Z0-9\s]*$/.test(comments)) {
    return res
      .status(400)
      .send("Comments can only contain alphanumeric characters and spaces.");
  }

  try {
    const data = await fs.readFile("./data.json", "utf8");
    const transactions = JSON.parse(data);
    const transaction = transactions.filter((t) => {return t.id === id});


    if (!transaction) {
      return res.status(404).send("Transaction not found");
    }

    transaction.comments = comments;
    await fs.writeFile(
      "./data.json",
      JSON.stringify(transactions, null, 2),
      "utf8"
    );

    res.send("Comments updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update comments");
  }
});

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
