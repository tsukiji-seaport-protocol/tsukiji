# API README

## API Overview
URI: `/api/orders`
- `GET` returns all orders
- `POST` writes a provided order to DB (via `req.body`)

URI: `/api/orders/:orderId
- `GET` returns specified order
- `PUT` updates specified order in DB (via `req.body`)

URI: `/api/orders/relatedOrders/:addressParam`
- `GET` returns orders related to address param


## Order Schema
```
{
  "type": type string (e.g. 'offer' or 'consideration'),
  "items":[
    {
      "quantity": type string (using numbers could lead to overflow),
      "contractAddress": type string: contract address for respective token, null for native eth",
      "symbol": type string (e.g. 'MAYC'),
      "type": type string (e.g. 'erc721')
    }
  ]
}
```
