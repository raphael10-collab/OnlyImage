import React from 'react';
import { hot } from 'react-hot-loader';

import { Accept } from './drop_zone/dropZone';

interface AppProps {
  title?: string;
}

interface AppState {
  counter: number;
}


class App extends React.Component<AppProps, AppState> {
  readonly state: AppState = { counter: 0 };

  render(): JSX.Element {
    return (
      <div className='container'>
        <Accept />
      </div>
    );
  }
}

export default hot(module)(App);
