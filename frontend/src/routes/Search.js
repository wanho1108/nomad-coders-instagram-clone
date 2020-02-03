import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(({location: { search }}) => {
  const searchTerm = search.split('=')[1];

  if (searchTerm == undefined) {

  }
  return null;
});