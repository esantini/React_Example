import React from "react";
import ReactDOM from "react-dom";

import "file-loader?name=[name].[ext]!../public/favicon.ico";
import "file-loader?name=[name].[ext]!../public/index.html";
import "file-loader?name=[name].[ext]!../public/manifest.json";

import "file-loader?name=[name].[ext]!./index.css";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
