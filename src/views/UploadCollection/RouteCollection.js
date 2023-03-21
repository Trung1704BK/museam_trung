import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AllCollection from './AllCollection/AllCollection';
import CollectionDetail from './CollectionDetail/CollectionDetail';

function RouteCollection() {
  return (
    <Switch>
      <Route path='/admin/collection' component={AllCollection} exact />
      <Route
        path='/admin/collection/:collection_id'
        component={CollectionDetail}
        exact
      />
    </Switch>
  );
}

export default RouteCollection;
