import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  MobileStepper,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useEffect, useState } from "react";
import { Client as TileApiClient, Paths } from "../api/client";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

const mod = (n: number, m: number) => ((n % m) + m) % m;

export function TaskTile({
  api,
  tile,
}: {
  api: Promise<TileApiClient>;
  tile: Paths.RetrieveTile.Responses.$200;
}) {
  const nTasks = tile.tasks.length;
  const [taskId, setTaskId] = useState(0);

  const [
    currentTask,
    setCurrentTask,
  ] = useState<Paths.RetrieveTask.Responses.$200>();

  useEffect(() => {
    setCurrentTask(tile.tasks[taskId]);
  }, [taskId]);

  const handleNavigate = (dir: number) => {
    setTaskId((prev) => mod(prev + dir, nTasks));
  };

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          image="https://picsum.photos/360/120.jpg?blur=1"
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
            {tile.get_status_display}
          </Typography>
        </CardContent>
      </CardActionArea>
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

      <CardActions disableSpacing style={{ justifyContent: "flex-end" }}>
        <Chip
          label={tile.launch_date}
          size="small"
          style={{ marginRight: "auto" }}
        />
        <IconButton color="primary">
          <EditIcon />
        </IconButton>
        <IconButton color="secondary">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
