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
import React, { useState } from "react";
import { Client as TileApiClient, Paths } from "../api/client";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

export function TaskTile({
  api,
  tile,
}: {
  api: Promise<TileApiClient>;
  tile: Paths.RetrieveTile.Responses.$200;
}) {
  const [taskId, setTaskId] = useState(0);

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          image="https://picsum.photos/360/120.jpg?blur=1"
          title="Lorem Picsum"
          style={{ height: 120 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {tile.status}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Task Name
        </Typography>
      </CardContent>
      <MobileStepper
        steps={1}
        position="static"
        variant="text"
        activeStep={1}
        backButton={
          <IconButton
            size="small"
            onClick={() => {}}
            // disabled={activeStep === 0}
          >
            <KeyboardArrowLeft />
          </IconButton>
        }
        nextButton={
          <IconButton
            size="small"
            onClick={() => {}}
            // disabled={activeStep === maxSteps - 1}
          >
            <KeyboardArrowRight />
          </IconButton>
        }
      />
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
