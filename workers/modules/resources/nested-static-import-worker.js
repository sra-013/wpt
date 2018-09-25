import * as module from './export-on-static-import-script.js';
self.onmessage = e => {
  // DedicatedWorkerGlobalScope doesn't fill in e.source,
  // so use e.target instead.
  const source = e.source ? e.source : e.target;
  source.postMessage(module.importedModules);
};
