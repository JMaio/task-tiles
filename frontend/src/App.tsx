import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
  Grid,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { AxiosResponse } from "axios";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { Component, useEffect, useState } from "react";
import api from "./api/api";
import { Client as TileApiClient, Components, Paths } from "./api/client";
import "./App.css";
import { TileForm } from "./components/Forms";
import { TaskTile } from "./components/TaskTile";

export type ApiClientType = Promise<TileApiClient>;

function App() {
  const ApiClient = api.getClient<TileApiClient>();

  const [tiles, setTiles] = useState<Components.Schemas.Tile[]>([]);

  const addNewTile = (newT: Components.Schemas.Tile) => {
    setTiles((oldTileList) => [...oldTileList, newT]);
  };

  const removeTile = (tileId: number) => {
    setTiles((oldTileList) => oldTileList.filter((t) => t.id != tileId));
  };

  const [newTile, setNewTile] = useState(false);

  useEffect(() => {
    console.log(ApiClient);

    ApiClient.then(
      (c: TileApiClient) => {
        c.listTiles().then((t) => {
          setTiles(t.data);
          console.log(t);
        });
      },
      (e) => console.log(e)
    );
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dummySnackbar = () =>
    enqueueSnackbar("This is a placeholder for this functionality");

  return (
    <>
      <Container
        maxWidth="md"
        style={{
          paddingTop: "1rem",
          // need margin bottom to offset the fab size
          marginBottom: "6rem",
        }}
      >
        <Typography style={{ color: "#fefefe", fontSize: "3rem" }} variant="h1">
          Piles o' Tiles
        </Typography>
        <Divider style={{ margin: "1rem 0", backgroundColor: "#fefefe" }} />
        <Grid container spacing={2}>
          {tiles.map((t) => (
            <Grid item xs={12} sm={6} md={4} key={t.id}>
              <TaskTile api={ApiClient} tile={t} remove={removeTile} />
            </Grid>
          ))}
        </Grid>
        <Fab
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "1rem",
          }}
          onClick={() => setNewTile(true)}
        >
          <AddIcon />
        </Fab>
      </Container>

      <Dialog open={newTile} onClose={() => setNewTile(false)}>
        <DialogTitle>New tile</DialogTitle>
        <DialogContent>
          <TileForm
            tile={undefined}
            updateTile={addNewTile}
            api={ApiClient}
            apiLogic={(data) => {
              const parsedDate = moment(data.launch_date).toISOString();
              console.log(data.launch_date);
              console.log(parsedDate);
              return ApiClient.then((c) =>
                c.createTile(null, {
                  ...data,
                  launch_date: parsedDate,
                })
              );
            }}
            onClose={() => setNewTile(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
