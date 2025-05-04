import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'

const root = createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
      <App />
      <Toaster position="bottom-right" />
    </BrowserRouter>
)