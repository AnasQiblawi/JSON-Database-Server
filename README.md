# Online-JSON-Database
Host a free simple json database online 


## Existing databases
```js
GET  localhost/database
```

## General info
```js
GET  localhost/database/<db name>
```

## Get all
```js
GET  localhost/database/<db name>/json
GET   localhost/database/<db name>.json
```
```js
POST  localhost/database/<db name>/json
```

## add
```js
GET  localhost/database/<db name>/set/<key>?a=1&b=2&...
```
```js
POST  localhost/database/<db name>/set
{
  key:    <key>,
  value:  <JSON>
}
```

## get
```js
GET  localhost/database/<db name>/get/<key>
```
```js
POST  localhost/database/<db name>/get
{
  key:  <key>
}
```

## Check data exist
```js
GET  localhost/database/<db name>/has/<key>
```
```js
POST  localhost/database/<db name>/has
{
  key:  <key>
}
```

## Delete
```js
GET  localhost/database/<db name>/delete/<key>
```
```js
POST  localhost/database/<db name>/delete
{
  key:  <key>
}
```

## keys
```js
GET  localhost/database/<db name>/keys
```
```js
POST  localhost/database/<db name>/keys
```

## values
```js
GET  localhost/database/<db name>/values
```
```js
POST  localhost/database/<db name>/values
```


