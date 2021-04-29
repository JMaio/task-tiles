import React from "react";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Client as TileApiClient, Paths } from "../api/client";

export function TaskTile({
  api,
  tile,
}: {
  api: Promise<TileApiClient>;
  tile: Paths.RetrieveTask.Responses.$200;
}) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          image="https://picsum.photos/300/100"
          title="Lorem Picsum"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {tile.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {tile.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
      </CardActions>
    </Card>
  );
}
