# API README

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
