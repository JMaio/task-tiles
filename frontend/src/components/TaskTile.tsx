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
import { Paths } from "../api/client";
import { ApiClientType } from "../App";
import { EditTaskForm, TileForm } from "./Forms";

const mod = (n: number, m: number) => ((n % m) + m) % m;

export function TaskTile({
  api,
  tile,
  remove,
}: {
  api: ApiClientType;
  tile: Paths.RetrieveTile.Responses.$200;
  remove: (id: number) => void;
}) {
  const [localTile, updateLocalTile] = useState<typeof tile>(tile);
  const nTasks = localTile.tasks.length;

  const [taskStepperIndex, setTaskStepperIndex] = useState(0);

  const [
    currentTask,
    setCurrentTask,
  ] = useState<Paths.RetrieveTask.Responses.$200>(localTile.tasks[0]);

  // stores changes made to a task without querying the API
  const updateCurrentTask = (
    updatedTask: Paths.RetrieveTask.Responses.$200
  ) => {
    updateLocalTile((t: typeof tile) => {
      t.tasks[taskStepperIndex] = updatedTask;
      setCurrentTask(updatedTask);
      return t;
    });
  };

  useEffect(() => {
    setCurrentTask(localTile.tasks[taskStepperIndex]);
  }, [taskStepperIndex, localTile]);

  const handleNavigate = (dir: number) => {
    setTaskStepperIndex((prev) => mod(prev + dir, nTasks));
  };

  const [newTask, setNewTask] = useState(false);

  const [editTile, setEditTile] = useState(false);
  const [editTask, setEditTask] = useState(false);

  const [deleteTile, setDeleteTile] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);

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
                onClick={dummySnackbar}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>

            <MobileStepper
              steps={nTasks}
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
          {/* <Chip
            label={moment(localTile.launch_date).calendar()}
            size="small"
            style={{ marginRight: "auto" }}
          /> */}
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

          {/* <TileForm
            tile={undefined}
            updateTile={updateLocalTile}
            api={api}
            apiLogic={(data: typeof tile) => {
              const parsedDate = moment(data.launch_date).toISOString();
              console.log(data.launch_date);
              console.log(parsedDate);
              return;
            }}
            onClose={() => setEditTile(false)}
          /> */}
        </DialogContent>
      </Dialog>

      <Dialog open={editTask} onClose={() => setEditTask(false)}>
        <DialogTitle>Edit task: {currentTask?.title}</DialogTitle>
        <DialogContent>
          <EditTaskForm
            task={currentTask}
            api={api}
            updateTask={updateCurrentTask}
            onClose={() => setEditTask(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
