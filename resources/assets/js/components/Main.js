import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Root from './Root';

render((
  <BrowserRouter>
    <Root />
  </BrowserRouter>
), document.getElementById('root'));

