// import { doPostAction } from "./RESTClient";
import {
  PARTITION_KEY,
  DB_ENTITY_NAME,
  APPLICATION_MODE_NORMAL
} from "../common/constants";
// import { fromAZDataArray } from "../common/AZDataAdapter";
// import mockClientData from "./mockClientData";

const GET_URL = import.meta.env.VITE_APP_GET_TABLESTORE_LOGAPP;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getClientDataByPartitionKey(
  partitionKey,
  userMode = APPLICATION_MODE_NORMAL,
  entity = DB_ENTITY_NAME
) {
  let data = {
    Entity: entity,
    idType: PARTITION_KEY,
    clientID: partitionKey,
    requestType: "GET",
    userMode: userMode
  };
  const result = await doPostAction(GET_URL, data);
  // const r = fromAZDataArray(await result.value);
  // const r = await mockClientData;

  // let url = "../src/api/mockClientData2.json";
  // await sleep(500);
  // let response = await fetch(url);
  // await sleep(500);
  // let rjson = await response.json();
  // let result = await rjson[partitionKey];

  // console.log("return from backend ", await result);
  return await result;
}

export { getClientDataByPartitionKey };
