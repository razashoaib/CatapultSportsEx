import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Root from './Root';


// Here we are implementing BrowserRouter to enable routing in the application.

render((
  <BrowserRouter>
    <Root />
  </BrowserRouter>
), document.getElementById('root'));

