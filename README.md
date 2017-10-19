[![Build Status](https://travis-ci.org/klarstrup/keychange.svg?branch=master)](https://travis-ci.org/klarstrup/keychange)

# keychange
Utility function for reacting to specific differences in javascript objects.

## basic operation

`keychange` will take three objects as parameters, two to compare and a third that serves as a mapping of keys to watch for changes and their handlers for the new values.

```js
  const someObject = {
    foo: 'value',
    bar: 'hi',
  };
  const anotherObject = {
    foo: 'value',
    bar: 'hello',
  };
  keyChange(someObject, anotherObject, {
    foo: anotherObject => { /* respond to new foo */ }, // Not called
    bar: ({ bar }) => { alert(`bar became ${bar}!`) }, // will be called
    // We can also "watch" for changes in any of a number of keys
    [[ 'bar', 'foo' ]]: ({ bar }) => { alert(`bar or foo changed!`) }, // will be called
  });
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
  keyChange(this.props, newProps, {
    query: ({ fetchCatalogs }) => fetchCatalogs(),
    catalogs: ({ catalogs, fetchStores }) => fetchStores(R.pluck('store_id', catalogs)),
  });
```

```js
componentWillReceiveProps(newProps) {
  if(!R.equals(this.props.latitude, newProps.latitude) || !R.equals(this.props.longitude, newProps.longitude) {
    this.map.panTo({ lat: newProps.latitude, lng: newProps.longitude })
  }
}
// Becomes
componentWillReceiveProps(newProps) {
  keyChange(this.props, newProps, {
    [['latitude', 'longitude']]: ({ latitude, longitude }) =>
      this.map.panTo({ lat: latitude, lng: longitude }),
  });
}
```
