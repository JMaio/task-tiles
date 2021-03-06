import MomentUtils from "@date-io/moment";
import {
  Button,
  createStyles,
  makeStyles,
  MenuItem,
  TextField,
  Theme,
} from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { AxiosResponse } from "axios";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { Components, Paths } from "../api/client";
import { ApiClientType } from "../App";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

export function TileForm({
  tile,
  updateTile,
  api,
  onClose,
  apiLogic,
}: {
  // text to display in the header (Add / Edit)
  tile?: Components.Schemas.Tile;
  updateTile: (t: Components.Schemas.Tile) => void;
  api: ApiClientType;
  onClose: () => void;
  apiLogic: (
    data: Components.Schemas.Tile
  ) => Promise<AxiosResponse<Components.Schemas.Tile>>;
}): JSX.Element {
  const {
    // register,
    handleSubmit,
    control,
    // watch,
    // formState: { errors },
  } = useForm<Components.Schemas.Tile>();

  // eslint-disable-next-line
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSubmit = (data: Components.Schemas.Tile) => {
    // call the api logic
    apiLogic(data).then(
      (res) => {
        console.log(res);
        console.log(res.data);
        updateTile(res.data);
        enqueueSnackbar(`[${res.status}] ${res.statusText}`, {
          variant: "success",
        });
      },
      (err) => {
        console.log(err);
        enqueueSnackbar(String(err), { variant: "error" });
      }
    );
    // const parsedDate = moment(data.launch_date).toISOString();
    // console.log(data.launch_date);
    // console.log(parsedDate);
    // api.then((c) =>
    //   c.partialUpdateTile(tile.id, { ...data, launch_date: parsedDate })
    // );
    //   .then(
    //     (res) => {
    //       console.log(res);
    //       updateTile(res.data);
    //       enqueueSnackbar(`[${res.status}] ${res.statusText}`, {
    //         variant: "success",
    //       });
    //     },
    //     (err) => {
    //       enqueueSnackbar(err, { variant: "error" });
    //     }
    //   );
    onClose();
  };

  // console.log(watch("id")); // watch input value by passing the name of it

  const classes = useStyles();

  const formStatusTypes = [
    ["LIVE", "Live"],
    ["PEND", "Pending"],
    ["ARCH", "Archived"],
  ];

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column" }}
      className={classes.root}
    >
      {/* register your input into the hook by invoking the "register" function */}
      {/* <input defaultValue="test" {...register("example")} /> */}
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
        <Controller
          name="launch_date"
          rules={{ required: true }}
          control={control}
          defaultValue={moment(tile?.launch_date).format("yyyy-MM-DDThh:mm")}
          render={({ field }) => (
            <DateTimePicker
              label="Launch date"
              inputVariant="outlined"
              size="small"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </MuiPickersUtilsProvider>

      <Controller
        name="status"
        rules={{ required: true }}
        control={control}
        defaultValue={tile?.status}
        render={({ field }) => (
          <TextField
            variant="outlined"
            size="small"
            select
            label="Status"
            {...field}
          >
            {formStatusTypes.map(([k, v], i) => (
              <MenuItem key={i} value={k}>
                {v}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      {/* errors will return when field validation fails  */}
      {/* {errors.exampleRequired && <span>This field is required</span>} */}
      {/* {errors && <span>{errors.launch_date}</span>} */}

      <Button type="submit">Save changes</Button>
    </form>
  );
}

export function TaskForm({
  task,
  updateTask,
  api,
  onClose,
  apiLogic,
}: {
  task?: Components.Schemas.Task;
  updateTask: (updatedTask: Components.Schemas.Task) => void;
  api: ApiClientType;
  onClose: () => void;
  apiLogic: (
    data: Components.Schemas.Task
  ) => Promise<AxiosResponse<Components.Schemas.Task>>;
}): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    // watch,
    // formState: { errors },
  } = useForm<Components.Schemas.Task>();

  // eslint-disable-next-line
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSubmit = (data: Components.Schemas.Task) => {
    apiLogic(data).then(
      (res) => {
        console.log(res);
        updateTask(res.data);
        enqueueSnackbar(`[${res.status}] ${res.statusText}`, {
          variant: "success",
        });
      },
      (err) => {
        enqueueSnackbar(String(err), { variant: "error" });
      }
    );
    onClose();
  };

  const classes = useStyles();

  const formTaskTypes = [
    ["survey", "Survey"],
    ["discussion", "Discussion"],
    ["diary", "Diary"],
  ];

  // title
  // order
  // description
  // task_type
  // parent_tile

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column" }}
      className={classes.root}
    >
      {/* register your input into the hook by invoking the "register" function */}
      {/* <input defaultValue="test" {...register("example")} /> */}

      <Controller
        name="title"
        rules={{ required: true }}
        control={control}
        defaultValue={task?.title}
        render={({ field }) => (
          <TextField variant="outlined" size="small" label="Title" {...field} />
        )}
      />
      <Controller
        name="description"
        rules={{ required: true }}
        control={control}
        defaultValue={task?.description}
        render={({ field }) => (
          <TextField
            variant="outlined"
            size="small"
            label="Description"
            {...field}
          />
        )}
      />
      <Controller
        name="order"
        rules={{ required: true }}
        control={control}
        defaultValue={task?.order}
        render={({ field }) => (
          <TextField
            variant="outlined"
            size="small"
            label="Order"
            type="number"
            InputProps={{
              inputProps: { min: 0 },
            }}
            {...field}
          />
        )}
      />

      <Controller
        name="task_type"
        rules={{ required: true }}
        control={control}
        defaultValue={task?.task_type}
        render={({ field }) => (
          <TextField
            variant="outlined"
            size="small"
            select
            label="Task type"
            {...field}
          >
            {formTaskTypes.map(([k, v], i) => (
              <MenuItem key={i} value={k}>
                {v}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      {/* errors will return when field validation fails  */}
      {/* {errors.exampleRequired && <span>This field is required</span>} */}
      {/* {errors && <span>{errors.launch_date}</span>} */}

      <Button type="submit" style={{ marginLeft: "auto", marginRight: "auto" }}>
        Save changes
      </Button>
    </form>
  );
}
