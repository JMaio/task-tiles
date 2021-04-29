import { Container, Divider, Fab, Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import api from "./api/api";
import { Client as TileApiClient, Paths } from "./api/client";
import "./App.css";
import { TaskTile } from "./components/TaskTile";

export type ApiClientType = Promise<TileApiClient>;

function App() {
  const ApiClient = api.getClient<TileApiClient>();

  console.log(ApiClient);

  const [tiles, setTiles] = useState<
    AxiosResponse<Paths.ListTiles.Responses.$200>
  >();

  useEffect(() => {
    ApiClient.then(
      (c: TileApiClient) => {
        c.listTiles().then((t) => {
          setTiles(t);
          console.log(t);
        });
      },
      (e) => console.log(e)
    );
  }, []);

  return (
    <Container maxWidth="md" style={{ paddingTop: "1rem" }}>
      <Typography style={{ color: "#fefefe", fontSize: "3rem" }} variant="h1">
        Piles o' Tiles
      </Typography>
      <Divider style={{ margin: "1rem 0", backgroundColor: "#fefefe" }} />
      <Grid container spacing={2}>
        {tiles?.data.map((t) => (
          <Grid item xs={12} sm={6} md={4} key={t.id}>
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
