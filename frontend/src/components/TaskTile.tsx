import {
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
  IconButton,
  MobileStepper,
  Typography,
} from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Client as TileApiClient, Paths } from "../api/client";
import { ApiClientType } from "../App";
import { EditTaskForm, EditTileForm } from "./Forms";

const mod = (n: number, m: number) => ((n % m) + m) % m;

export function TaskTile({
  api,
  tile,
}: {
  api: ApiClientType;
  tile: Paths.RetrieveTile.Responses.$200;
}) {
  const [taskId, setTaskId] = useState(0);

  const [localTile, updateLocalTile] = useState<typeof tile>(tile);
  const nTasks = localTile.tasks.length;

  const [
    currentTask,
    setCurrentTask,
  ] = useState<Paths.RetrieveTask.Responses.$200>();

  useEffect(() => {
    setCurrentTask(localTile.tasks[taskId]);
  }, [taskId, localTile]);

  const handleNavigate = (dir: number) => {
    setTaskId((prev) => mod(prev + dir, nTasks));
  };

  const [editTile, setEditTile] = useState(false);
  const [editTask, setEditTask] = useState(false);

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
            <Typography
              gutterBottom
              variant="h5"
              component="h1"
              style={{ marginBottom: 0 }}
            >
              {localTile.get_status_display}
            </Typography>
          </CardContent>
        </CardActionArea>

        <Divider />

        <MobileStepper
          steps={nTasks}
          position="static"
          variant="text"
          activeStep={taskId}
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
        <CardContent>
          <Chip label={currentTask?.task_type} size="small" />
          <Typography variant="body1">{currentTask?.title}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {currentTask?.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            (order: {currentTask?.order})
          </Typography>
        </CardContent>

        <Divider />

        <CardActions disableSpacing style={{ justifyContent: "flex-end" }}>
          <Chip
            label={moment(localTile.launch_date).calendar()}
            size="small"
            style={{ marginRight: "auto" }}
          />
          <IconButton
            color="primary"
            size="small"
            onClick={() => setEditTile(true)}
          >
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" size="small">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      <Dialog open={editTile} onClose={() => setEditTile(false)}>
        <DialogTitle>Edit tile</DialogTitle>
        <DialogContent>
          <EditTileForm
            tile={localTile}
            updateTile={updateLocalTile}
            api={api}
            onClose={() => setEditTile(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={editTask} onClose={() => setEditTask(false)}>
        <DialogTitle>Edit task: {currentTask?.title}</DialogTitle>
        <DialogContent>
          <EditTaskForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
