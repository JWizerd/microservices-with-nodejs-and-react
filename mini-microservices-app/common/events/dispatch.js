const { ACTION_TYPES } = require("./action-types");
const { SERVICE_MAP } = require("../service-map");
const axios = require("axios");

module.exports.DISPATCH = (evtType, message) => {
  const ENDPOINT = `${SERVICE_MAP.EVENT_BUS}/events`;
  console.log(`DISPATCHING EVENT TO BUS: ${evtType} \n MESSAGE: ${JSON.stringify(message)}`);
  switch (evtType) {
    case ACTION_TYPES.POST_CREATED:
      axios.post(ENDPOINT, {
        name: ACTION_TYPES.POST_CREATED,
        message
      }).catch((err) => console.error(err.message));
      break;
    case ACTION_TYPES.POST_UPDATED:
      axios.post(ENDPOINT, {
        name: ACTION_TYPES.POST_UPDATED,
        message
      }).catch((err) => console.error(err.message));
      break;
    case ACTION_TYPES.COMMENT_CREATED:
      axios.post(ENDPOINT, {
        name: ACTION_TYPES.COMMENT_CREATED,
        message
      }).catch((err) => console.error(err.message));
      break;
  }
}