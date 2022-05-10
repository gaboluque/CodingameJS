async function runSequentially(functions) {
  try {
    const result = await Promise.all(functions.map((f) => f()));
    return result;
  } catch(e) {
    throw e;
  }
}

let counter = 1;
function incrementCounterAsync() {
  return new Promise((resolve, reject) => {
      counter += 1;
      resolve(counter);
  });
}
let promise = runSequentially([incrementCounterAsync, incrementCounterAsync]);
if(promise) {
  promise.then(result => console.log(result))
  .catch(error => console.log("Error: " + error));
}

