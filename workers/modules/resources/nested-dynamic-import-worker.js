let promises = [];
promises.push(new Promise(resolve => {
  self.onmessage = e => {
    // DedicatedWorkerGlobalScope doesn't fill in e.source,
    // so use e.target instead.
    const source = e.source ? e.source : e.target;
    resolve(source);
  };
}));

promises.push(new Promise(resolve => {
  import('./export-on-dynamic-import-script.js')
    .then(async module => {
      await module.ready;
      resolve(module.importedModules);
    }).catch(error => {
      resolve(`Failed to do dynamic import: ${error}`);
    });
}));

Promise.all(promises).then(results => {
  results[0].postMessage(results[1]);
});
