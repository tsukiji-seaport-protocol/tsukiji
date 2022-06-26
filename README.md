# Tsukiji: Seaport Protocol Order Aggregator
Tsukiji is built on the Seaport Protocol. We are building the next-generation NFT marketplace. Create orders and asks. We aggregate and matchers are incentivized to match orders.

## Two-sided marketplace
The web app serves consumers - users are able to create orders and view open orders. The API serves fulfillers and incentivized community members that help match all the open orders. Consumers submit a tip amount upon creating the order to incentivize their orders to be matched. Fulfillers receive the tip amount for their work in aggregating and matching orders.


WEB APP (offerers):
1. Aggregate user orders (e.g. createOrder(orderParams) returns bool)
2. Showcase orders relevant to users (i.e. an explore page)

API / SDK (fulfillers):
1. Endpoint that returns orders (e.g. getOrders() returns Orders[])
2. Endpoint to fulfill orders (e.g. fulfillOrders(Orders[]) returns bool)

Prototype: API to facilitate order creation and submission on the Seaport Protocol

1. Aggregate user orders (e.g. `createOrder(orderParams) returns bool`)
2. Create endpoint that returns orders (e.g. `getOrders() returns Orders[]`)
3. Create endpoint to fulfill orders (e.g. `fulfillOrders(Orders[]) returns bool`)

## Seaport Alternative Chain Deployments
Seaport Protocol was previously only available on ETH Mainnet and Rinkeby but to facilitate some of our project needs, we launched it on Polygon and Kovan. This is now available for the convenience of future developers to test on these lower-cost/free networks.

Source Repo: [`0xgoretex/seaport`](https://github.com/0xgoretex/seaport)

## Tech Stack
Tsukiji is built on top of the Seaport Protocol, a protocol created by Opensea. Our Next.js front-end is hosted on Skynet and Vercel. Our live demo link is on Vercel as our automated SkyNet deploys would require us to continuously update the links as we are rapidly iterating this weekend. However, in our repository, we have set up automated deploys to Skynet to switch over to in the future.

To ensure maximum data availability for fulfillers, we store order data in Skynet and Filecoin. We expose APIs for developers to choose which decentralized storage system to query.

## API Docs
[`API Docs`](pages/api)
## License
[MIT License](LICENSE)
