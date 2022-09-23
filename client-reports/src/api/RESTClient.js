async function doGetAction(url) {
  //  return await fetchAction(url, "GET");

  const options = {
    method: "GET" // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
  };
  // options["headers"] = { "Content-Type": "application/json" };
  const response = await fetch(url, options);
  if (!response.ok) {
    const message = `${url} An error has occured: ${response.status}`;
    throw new Error(message);
  }

  let d = await response.json();

  return d;
}

async function doPostAction(url, data = {}) {
  // return await fetchAction(url, "POST", data);
  let options = {
    method: "POST" // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
  };
  options["headers"] = { "Content-Type": "application/json" };
  if (data) {
    options["body"] = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  let d = await response.json();
  if (!response.ok) {
    throw new Error(`An error has occured: ${response.status} : ${d.message}`);
  }

  console.log(" response>>>>>", d);
  return d;
}

export { doGetAction, doPostAction };
