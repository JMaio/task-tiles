import { Container, Divider, Fab, Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import api from "./api/api";
import { Client as TileApiClient, Paths } from "./api/client";
import "./App.css";
import { TaskTile } from "./components/TaskTile";

function App() {
  const ApiClient = api.getClient<TileApiClient>();

  console.log(ApiClient);

  const [tiles, setTiles] = useState<
    AxiosResponse<Paths.ListTasks.Responses.$200>
  >();

  useEffect(() => {
    ApiClient.then(
      (c: TileApiClient) => {
        c.listTasks().then((tasks) => {
          setTiles(tasks);
          console.log(tasks);
        });
      },
      (e) => console.log(e)
    );
  }, []);

  return (
    <Container maxWidth="md">
      <Typography style={{ color: "#fefefe", fontSize: "3rem" }} variant="h1">
        Piles 'o Tiles
      </Typography>
      <Divider style={{ margin: "1rem 0", backgroundColor: "#fefefe" }} />
      <Grid container spacing={2}>
        {tiles?.data.map((t) => (
          <Grid item xs={12} sm={6} md={4}>
            <TaskTile api={ApiClient} tile={t} />
          </Grid>
        ))}
      </Grid>
      <Fab
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
        }}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
}

export default App;
