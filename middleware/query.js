export default function ({ store, redirect }) {
  console.log("state is", store);
  console.log("running getCoinData from middleware");
  store.dispatch("chart/getCoinData");
  console.log("running getPriceData from middleware");
  store.dispatch("syncData");
}
