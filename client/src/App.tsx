import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { About, Article, Galery, Home, Softmar } from './pages';
import Layout from './components/Layout';
import path from 'path';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home /></Layout>
  },
  {
    path: "about",
    element: <Layout><About /></Layout>
  },
  {
    path: "galery",
    element: <Layout><Galery /></Layout>
  },
  {
    path: "softmar",
    element: <Layout><Softmar /></Layout>
  },
  {
    path: "*",
    element: <Layout><Home /></Layout>
  },
  {
    path: "article",
    element: <Layout><Article /></Layout>
  },
]);

function App() { 
  return (
    <div className="App scroll-smooth">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
