const express = require("express");
const axios = require('axios');
const cors = require('cors');
const { ACTION_TYPES } = require("../common/events/action-types");
const { SERVICE_MAP } =  require("../common/service-map");
const PORT = 9400;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const isValidEventType = (req, res, next) => {
  const evtTypes = Object.keys(ACTION_TYPES);
  if (!evtTypes.includes(req.body.name)) {
    return res.status(400).body({ message: "Event Type is NOT valid, dummy!"});
  }

  if (!req.body.message) {
    return res.status(400).body({ message: "Event Message must be defined"});
  }

  next();
}

app.post("/events", isValidEventType, (req, res) => {
  try {
    const evt = {};
    evt.name = req.body.name;
    evt.message = req.body.message;

    console.log(`BROADCASTING EVENT: ${JSON.stringify(evt)}`);

    for (const key in SERVICE_MAP) {
      if (SERVICE_MAP[key] !== SERVICE_MAP.EVENT_BUS) {
        axios.post(`${SERVICE_MAP[key]}/events`, evt).catch(err => console.error(err.message));
      }
    }

    res.send({ status: "OK" });
  } catch (error) {
    res.status(500).json({ message: "Event could not be broadcasted!", error});
  }
})

app.listen(PORT, () => {
  console.log(`Event Bus service listening on PORT: ${PORT}`);
})