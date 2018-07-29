import React from 'react'
import HeaderView from './HeaderView'
import MasterView from './MasterView'

// This is a view which will be used inside BrowserRouter.

const Root = () => (
  <div>
    <HeaderView />
    <MasterView />
  </div>
)

export default Root
