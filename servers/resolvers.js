const pubsub = require("./pubsub");
const { get, set, getRange } = require("./utils/redis");

const COMPONENTS = {
  CPUChart: "cpuchart",
  ErrorChart: "errorchart",
  ErrorTable: "errortable",
  Topology:"topology",
  Gis:"gis",
  RealTime:"realtime",
  PerServerPage:"perserverpage",
  PerNetPage:"pernetpage",
  PerSenPage:"persenpage"
};

/**
 * (1) Get random data for `component` by calling `generator` function
 * (2) Publish the data to channel for `component`
 * (3) Cache the data in redis against key `component`
 *
//  * @param {function} generator - Corresponding data generator function for `component`
 * @param {string} component
 */
// const publishRandomData = async (generator, component) => {
//   const data = generator();
//   pubsub.publish(component, { [component]: data });
//   await set(component, data);
//   return data;
// };
module.exports = {
  Query: {
    cpuchart: () => get(COMPONENTS.CPUChart),
    errorchart: () => get(COMPONENTS.ErrorChart),
    errortable: () => get(COMPONENTS.ErrorTable),
    topology:()=>get(COMPONENTS.Topology),
    perserverpage:()=>get(COMPONENTS.PerServerPage),
  
  },

  Subscription: {
    cpuchart: {
      subscribe: () => pubsub.asyncIterator(COMPONENTS.CPUChart),
    },
    errorchart: {
      subscribe: () => pubsub.asyncIterator(COMPONENTS.ErrorChart),
    },
    errortable: {
      subscribe: () => pubsub.asyncIterator(COMPONENTS.ErrorTable),
    },
    topology:{
      subscribe:()=>pubsub.asyncIterator(COMPONENTS.Topology),
    },
    gis:{
      subscribe:()=>pubsub.asyncIterator(COMPONENTS.Gis),
    },
    realtime:{
      subscribe:()=>pubsub.asyncIterator(COMPONENTS.RealTime),
    },
    perserverpage:{
      subscribe:()=>pubsub.asyncIterator(COMPONENTS.PerServerPage),
    },
    pernetpage:{
      subscribe:()=>pubsub.asyncIterator(COMPONENTS.PerNetPage),
    },
    persenpage:{
      subscribe:()=>pubsub.asyncIterator(COMPONENTS.PerSenPage),
    },
  },
};

