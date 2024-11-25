
const express = require("express");
const app = express();
const cors = require("cors");

const jsonData = require("./calendarfromtoenddate.json");

app.use(cors());


const PORT=process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json(jsonData);
});

app.get("/:id", (req, res) => {
   const {id}=req.params;
   const filtered=jsonData.find(item=>item.id===parseInt(id));
   if(!filtered){
    return res.status(404).json({error:'Data Not Found!!!'})
   }
   res.json(filtered)
  });


app.listen(5000, () => {
  console.log(`Server started on port ${PORT}`);
});