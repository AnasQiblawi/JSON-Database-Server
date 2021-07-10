# Online-JSON-Database
Host a free simple json database online 

## add data
```js
POST  localhost/database/<db name>/set
{
  key:    <key>,
  value:  <JSON>
}
```

## get data
```js
POST  localhost/database/<db name>/get
{
  key:  <key>
}
```

## Check data exist
```js
POST  localhost/database/<db name>/has
{
  key:  <key>
}
```

## Delete data
```js
POST  localhost/database/<db name>/delete
{
  key:  <key>
}
```

## Get all data
```js
GET   localhost/database/<db name>.json

POST  localhost/database/<db name>/json
```



