const code =
  "let promises = [];" +
  "promises.push(new Promise(resolve => {" +
  "  self.onmessage = e => {" +
  "    const source = e.source ? e.source : e.target;" +
  "    resolve(source);" +
  "  };" +
  "}));" +
  "promises.push(new Promise(resolve => {" +
  "import('./export-on-load-script.js')" +
  "  .then(module => {" +
  "    resolve(module.importedModules);" +
  "  }).catch(error => {" +
  "    resolve(`Failed to do dynamic import: ${error}`);" +
  "  });" +
  "}));" +
  "Promise.all(promises).then((results) => {" +
  "  results[0].postMessage(results[1]);" +
  "});";
eval(code);
