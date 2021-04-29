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
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { Paths } from "../api/client";
import { ApiClientType } from "../App";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

export function EditTileForm({
  tile,
  updateTile,
  api,
  onClose,
}: {
  tile: Paths.UpdateTile.RequestBody;
  updateTile: Dispatch<SetStateAction<Paths.UpdateTile.Responses.$200>>;
  api: ApiClientType;
  onClose: () => void;
}): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<typeof tile>();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSubmit = (data: typeof tile) => {
    const parsedDate = moment(data.launch_date).toISOString();
    console.log(data.launch_date);
    console.log(parsedDate);
    api
      .then((c) =>
        c.partialUpdateTile(tile.id, { ...data, launch_date: parsedDate })
      )
      .then(
        (res) => {
          console.log(res);
          updateTile(res.data);
          enqueueSnackbar(`[${res.status}] ${res.statusText}`, {
            variant: "success",
          });
        },
        (err) => {
          enqueueSnackbar(err, { variant: "error" });
        }
      );
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
          defaultValue={moment(tile.launch_date).format("yyyy-MM-DDThh:mm")}
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
        defaultValue={tile.status}
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

export function EditTaskForm(): JSX.Element {
  // Task
  // Tile

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Paths.RetrieveTask.Responses.$200>();

  const onSubmit = (data: any) => console.log(data);

  console.log(watch("id")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* register your input into the hook by invoking the "register" function */}
      {/* <input defaultValue="test" {...register("example")} /> */}
      {/* <TextField label="Standard" {...register("example")} /> */}

      {/* include validation with required or other standard HTML validation rules */}
      {/* <input {...register("exampleRequired", { required: true })} /> */}
      {/* <TextField {...register("exampleRequired", { required: true })} /> */}
      {/* errors will return when field validation fails  */}
      {/* {errors.exampleRequired && <span>This field is required</span>} */}

      <input type="submit" />
    </form>
  );
}
