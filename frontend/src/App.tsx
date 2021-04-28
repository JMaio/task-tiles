import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import api from "./api/api";
import { Client as TileApiClient, Paths } from "./api/client";
import { Card, Grid } from "@material-ui/core";
import { TaskTile } from "./components/TaskTile";
import { AxiosResponse } from "axios";

function App() {
  const ApiClient = api.getClient<TileApiClient>();

  console.log(ApiClient);

  const [tiles, setTiles] = useState<AxiosResponse<Paths.ListTasks.Responses.$200>>()

  useEffect(() => {
    ApiClient.then(
      (c: TileApiClient) => {
        c.listTasks().then((tasks) => {
          setTiles(tasks)
          console.log(tasks)
        })
      },
      (e) => console.log(e)
    )
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Grid container>
          {/* {ApiClient.} */}
        </Grid>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <TaskTile api={ApiClient} />
      </header>
    </div>
  );
}

export default App;
