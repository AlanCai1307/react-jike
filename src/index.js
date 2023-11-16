import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './index.scss';
import router from "./router";
import { RouterProvider } from 'react-router-dom'
import {Provider} from "react-redux";
import store from "@/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={ store }>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
