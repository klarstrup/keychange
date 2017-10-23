[![Build Status](https://travis-ci.org/klarstrup/keychange.svg?branch=master)](https://travis-ci.org/klarstrup/keychange)

# keychange
Utility function for acting upon specific differences in javascript objects.

## basic operation

`keychange` will take three objects as parameters, two to compare and another that serves as a mapping of keys to check for differences and their handlers for the new values.

```js
  const someObject = {
    foo: 'value',
    bar: 'hi',
  };
  const anotherObject = {
    foo: 'value',
    bar: 'hello',
  };
  keyChange({
    foo: anotherObject => { /* respond to new foo */ }, // Not called
    bar: ({ bar }) => { alert(`bar became ${bar}!`) }, // will be called
    // We can also check for differences in any of a number of keys at once
    [[ 'bar', 'foo' ]]: ({ bar }) => { alert(`bar and/or foo was different!`) }, // will be called
    // This sort of thing is fine too
    'foo,bar': ({ bar }) => { alert(`bar and/or foo was different!`) }, // will be called
  }, someObject, anotherObject);
```

## real life examples
Mostly useful for reducing ridiculous `componentWillReceiveProps` methods.

```js
componentWillReceiveProps = newProps => {
  if (!R.equals(newProps.query, this.props.query)) {
    newProps.fetchCatalogs();
  }
  if (!R.equals(newProps.catalogs, this.props.catalogs)) {
    newProps.fetchStores(R.pluck('store_id', newProps.catalogs));
  }
};
// Becomes
componentWillReceiveProps = newProps =>
  keyChange({
    query: ({ fetchCatalogs }) => fetchCatalogs(),
    catalogs: ({ catalogs, fetchStores }) => fetchStores(R.pluck('store_id', catalogs)),
  }, this.props, newProps);
```

```js
componentWillReceiveProps(newProps) {
  if(!R.equals(this.props.latitude, newProps.latitude) || !R.equals(this.props.longitude, newProps.longitude) {
    this.map.panTo({ lat: newProps.latitude, lng: newProps.longitude })
  }
}
// Becomes
componentWillReceiveProps(newProps) {
  keyChange({
    [['latitude', 'longitude']]: ({ latitude, longitude }) =>
      this.map.panTo({ lat: latitude, lng: longitude }),
  }, this.props, newProps);
}
```

Heck, for `componentWillReceiveProps` specifically you could even do:
```js
componentWillReceiveProps = keyChange({
  query: ({ fetchCatalogs }) => fetchCatalogs(),
  catalogs: ({ catalogs, fetchStores }) => fetchStores(R.pluck('store_id', catalogs)),
}, this.props);
```
