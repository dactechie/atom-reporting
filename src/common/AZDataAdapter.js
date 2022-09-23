// import { getFriendlyTimestampString } from "@/common/utils";
/**
 * @function fromAZDataArray
 * @returns Parsed (unflattened) dict with Dates and Objects
 * @param {*} data
 */
export function fromAZDataArray(data) {
  let cdata = [];

  for (const dat in data) {
    let cd = {};
    //let dataDict = _fixTypes(data[dat]);
    let dataDict = {
      ...data[dat],
      Timestamp: new Date(data[dat]["Timestamp"])
    };
    // delete data[dat]["Timestamp"];
    delete dataDict["odata.etag"];
    for (const [k, v] of Object.entries(dataDict)) {
      if (!v) continue;
      if (v[0] === "[" || v[0] === "{") cd[k] = JSON.parse(v);
      else cd[k] = v;
    }
    cdata.push(cd);
  }
  return cdata;
}
