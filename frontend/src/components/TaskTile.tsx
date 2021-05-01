import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  MobileStepper,
  Typography,
} from "@material-ui/core";
import { Add, KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Components } from "../api/client";
import { ApiClientType } from "../App";
import { TaskForm, TileForm } from "./Forms";

const mod = (n: number, m: number) => ((n % m) + m) % m;

export function TaskTile({
  api,
  tile,
  remove,
}: {
  api: ApiClientType;
  tile: Components.Schemas.Tile;
  remove: (id: number) => void;
}) {
  const [localTile, updateLocalTile] = useState<Components.Schemas.Tile>(tile);

  const [taskStepperIndex, setTaskStepperIndex] = useState(0);

  const [currentTask, setCurrentTask] = useState<
    Components.Schemas.Task | undefined
  >();

  // stores changes made to a task without querying the API
  const updateCurrentTask = (updatedTask: Components.Schemas.Task) => {
    updateLocalTile((t: Components.Schemas.Tile) => {
      t.tasks[taskStepperIndex] = updatedTask;
      setCurrentTask(updatedTask);
      return t;
    });
  };

  useEffect(() => {
    // update task when tile changes
    setCurrentTask(localTile.tasks[taskStepperIndex]);
  }, [taskStepperIndex, localTile]);

  const addTask = (newTask: Components.Schemas.Task) => {
    updateLocalTile((tile: Components.Schemas.Tile) => {
      tile.tasks.push(newTask);
      return tile;
    });
    // update task when tile changes
    const newIndex = localTile.tasks.length - 1;
    setTaskStepperIndex(newIndex);
    setCurrentTask(localTile.tasks[newIndex]);
  };

  const removeTask = (taskIdx: number) => {
    updateLocalTile((tile: Components.Schemas.Tile) => {
      tile.tasks = tile.tasks.filter((t, i) => i != taskIdx);
      return tile;
    });
    // update task when tile changes
    const newIndex = localTile.tasks.length - 1;
    setTaskStepperIndex(newIndex);
    setCurrentTask(localTile.tasks[newIndex]);
  };

  const handleNavigate = (dir: number) => {
    setTaskStepperIndex((prev) => mod(prev + dir, localTile.tasks.length));
  };

  const [newTask, setNewTask] = useState(false);

  const [editTile, setEditTile] = useState(false);
  const [editTask, setEditTask] = useState(false);

  const [deleteTile, setDeleteTile] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);

  // const removeTask = (taskId: number) => {
  //   setTi((oldTileList) => oldTileList.filter((t) => t.id != tileId));
  // };

  // eslint-disable-next-line
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dummySnackbar = () =>
    enqueueSnackbar("This is a placeholder for this functionality");

  return (
    <>
      <Card>
        <CardActionArea>
          <CardMedia
            image={`https://picsum.photos/360/120.jpg?blur=1&?random=${localTile.id}`}
            title="Lorem Picsum"
            style={{ height: 120 }}
          />
          <CardContent>
            <Typography variant="h5" component="h1">
              {localTile.get_status_display}
            </Typography>
          </CardContent>
        </CardActionArea>

        <Divider />
        {localTile.tasks.length ? (
          <>
            <CardContent>
              <Typography variant="body1">{currentTask?.title}</Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {currentTask?.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                (order: {currentTask?.order})
              </Typography>
            </CardContent>

            <Grid container justify="center" alignItems="center">
              <Chip label={currentTask?.task_type} size="small" />
              <IconButton
                color="primary"
                size="small"
                onClick={() => setEditTask(true)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="secondary"
                size="small"
                onClick={() => setDeleteTask(true)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>

            <MobileStepper
              steps={localTile.tasks.length}
              position="static"
              variant="text"
              activeStep={taskStepperIndex}
              backButton={
                <IconButton size="small" onClick={() => handleNavigate(-1)}>
                  <KeyboardArrowLeft />
                </IconButton>
              }
              nextButton={
                <IconButton size="small" onClick={() => handleNavigate(+1)}>
                  <KeyboardArrowRight />
                </IconButton>
              }
            />
          </>
        ) : (
          <CardContent>
            <Typography variant="body1" color="textSecondary" align="center">
              (No tasks)
            </Typography>
          </CardContent>
        )}

        <Divider />

        <CardActions>
          <Typography
            variant="body2"
            component="p"
            color="textSecondary"
            style={{ marginRight: "auto", marginLeft: 8 }}
          >
            {moment(localTile.launch_date).calendar()}
          </Typography>

          <IconButton
            // color="primary"
            size="small"
            onClick={() => setNewTask(true)}
            style={{ color: "green" }}
          >
            <Add />
          </IconButton>
          <IconButton
            color="primary"
            size="small"
            onClick={() => setEditTile(true)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            size="small"
            onClick={() => setDeleteTile(true)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      <Dialog open={editTile} onClose={() => setEditTile(false)}>
        <DialogTitle>Edit tile</DialogTitle>
        <DialogContent>
          <TileForm
            tile={localTile}
            updateTile={updateLocalTile}
            api={api}
            apiLogic={(data: typeof tile) => {
              const parsedDate = moment(data.launch_date).toISOString();
              console.log(data.launch_date);
              console.log(parsedDate);
              return api.then((c) =>
                c.partialUpdateTile(tile.id, {
                  ...data,
                  launch_date: parsedDate,
                })
              );
            }}
            onClose={() => setEditTile(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteTile} onClose={() => setDeleteTile(false)}>
        <DialogTitle>Delete tile?</DialogTitle>
        <DialogContent style={{ display: "flex" }}>
          <Button
            color="secondary"
            style={{ margin: "auto" }}
            startIcon={<DeleteIcon />}
            onClick={() => {
              api
                .then((c) => c.destroyTile(tile.id))
                .then(
                  (res) => {
                    enqueueSnackbar(`[${res.status}] ${res.statusText}`, {
                      variant: "success",
                    });
                    remove(tile.id as number);
                  },
                  (err) => {
                    enqueueSnackbar(String(err), {
                      variant: "error",
                    });
                  }
                );

              setDeleteTile(false);
            }}
          >
            Delete
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={editTask} onClose={() => setEditTask(false)}>
        <DialogTitle>Edit task: {currentTask?.title}</DialogTitle>
        <DialogContent>
          <TaskForm
            task={currentTask}
            api={api}
            updateTask={updateCurrentTask}
            onClose={() => setEditTask(false)}
            apiLogic={(data) =>
              api.then((c) => c.partialUpdateTask(currentTask?.id, data))
            }
          />
        </DialogContent>
      </Dialog>

      <Dialog open={newTask} onClose={() => setNewTask(false)}>
        <DialogTitle>New task</DialogTitle>
        <DialogContent>
          <TaskForm
            task={undefined}
            api={api}
            updateTask={addTask}
            onClose={() => setNewTask(false)}
            apiLogic={(data) =>
              api.then((c) =>
                c.createTask(null, {
                  ...data,
                  // give this a sensible (fake) default?
                  parent_tile: localTile.id || -1,
                })
              )
            }
          />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteTask} onClose={() => setDeleteTask(false)}>
        <DialogTitle>Delete task "{currentTask?.title}"?</DialogTitle>
        <DialogContent style={{ display: "flex" }}>
          <Button
            color="secondary"
            style={{ margin: "auto" }}
            startIcon={<DeleteIcon />}
            onClick={() => {
              api
                .then((c) => c.destroyTask(currentTask?.id))
                .then(
                  (res) => {
                    enqueueSnackbar(`[${res.status}] ${res.statusText}`, {
                      variant: "success",
                    });
                    removeTask(taskStepperIndex as number);
                  },
                  (err) => {
                    enqueueSnackbar(String(err), {
                      variant: "error",
                    });
                  }
                );
              setDeleteTask(false);
            }}
          >
            Delete
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
