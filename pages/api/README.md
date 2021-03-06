# API README

## API Overview
URI: `/api/orders`
- `GET` returns all orders
- `POST` writes a provided order to DB (via `req.body`)

URI: `/api/orders/:orderId`
- `GET` returns specified order
- `PUT` updates specified order in DB (via `req.body`)

URI: `/api/relatedOrders/:addressParam`
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
      "type": type string (e.g. 'erc721'),
      "status": type string (e.g. 'open', 'filled', 'partially filled')
    }
  ]
}
```

## Skynet Data

URI: `/api/sky-orders`
- `GET` returns orders
- `PUT` updates orders in Skynet File (via `req.body`)

URI: `/api/orders/sky-relatedOrders/:addressParam`
- `GET` returns orders related to address param

## Filecoin Data

URI: `/api/filecoin-orders`
- `GET` returns orders
- `PUT` uploads and pins orders in IPFS (via `req.body`)

## Raw Order Schema
```
type CreateOrderInput = {
  conduitKey?: string;
  zone?: string;
  startTime?: string;
  endTime?: string;
  offer: readonly CreateInputItem[];
  consideration: readonly ConsiderationInputItem[];
  counter?: number;
  fees?: readonly Fee[];
  allowPartialFills?: boolean;
  restrictedByZone?: boolean;
  useProxy?: boolean;
  salt?: string;
};
```


## Test API Calls
Get orders
- [tsukiji.vercel.app/api/orders](https://tsukiji.vercel.app/api/orders)
- [https://tsukiji.vercel.app/api/sky-orders](https://tsukiji.vercel.app/api/sky-orders)
- [tsukiji.vercel.app/api/filecoin-orders](https://tsukiji.vercel.app/api/filecoin-orders)

