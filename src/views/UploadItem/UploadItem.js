import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AllItems from './AllItems/AllItems';
import ItemDetail from './Item/ItemDetail';

function UploadItem() {
  return (
    <Switch>
      <Route path='/admin/upload' component={AllItems} exact />
      <Route path='/admin/upload/:item_id' component={ItemDetail} exact />
    </Switch>
  );
}

export default UploadItem;
