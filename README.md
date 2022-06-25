# Tsukiji: Seaport Protocol Order Aggregator

Prototype: API to facilitate order creation and submission on the Seaport Protocol

1. Aggregate user orders (e.g. `createOrder(orderParams) returns bool`)
2. Create endpoint that returns orders (e.g. `getOrders() returns Orders[]`)
3. Create endpoint to fulfill orders (e.g. `fulfillOrders(Orders[]) returns bool`)
