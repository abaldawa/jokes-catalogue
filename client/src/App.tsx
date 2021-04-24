import React from 'react';
import { Layout } from "./containers/Layout/Layout";
import { Joke } from "./containers/Joke/Joke";

function App() {
  return (
    <Layout>
      <Joke />
    </Layout>
  );
}

export default App;
