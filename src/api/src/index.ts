import express from "express";
import scrapeVPlan from "./lib/vplan-scraper.js";

const app = express();

app.get("/", async (_, res) => {
  const scrapedData = await scrapeVPlan();

  if (!scrapedData) {
    res.status(500).send("Error fetching data");
    return;
  }

  res.json(scrapedData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
