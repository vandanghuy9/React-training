import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Input, inputClasses } from "@mui/base/Input";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { LinearProgress } from "@mui/material";
import clsx from "clsx";
import { useGetBuildingInfo } from "../../context/StateContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { request } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Label = styled(({ children, className }: any) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p className={clsx(className, error || showRequiredError ? "invalid" : "")}>
      {children}
      {required ? " *" : ""}
    </p>
  );
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;
type Inputs = {
  name: string;
  floorNum: number | string;
  classNum: number | string;
  builtYear: number | string;
  onService?: boolean;
};
const CreateBuildingForm = () => {
  const { isLoading, setIsLoading, getData } = useGetBuildingInfo();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const onSubmit = (data: Inputs) => {
    const { name, floorNum, classNum, builtYear } = data;
    if (!name || !floorNum || !classNum || !builtYear) {
      toast.warn("Please enter all fields", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      data.onService = true;
      request("post", "/building/save", data, (response: any) => {
        toast.success(response.name + " was created successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getData();
      });
      navigate("/");
    }
  };
  return (
    <FormControl defaultValue="" required>
      {isLoading && (
        <LinearProgress
          style={{
            position: "fixed",
            top: 0,
            left: -250,
            width: "calc(100% + 300px)",
            zIndex: 1202,
          }}
        />
      )}
      <Label>Create new building</Label>
      <Box
        sx={{
          backgroundColor: "white",
          p: 1,
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        }}
      >
        <TextField
          required
          id="outlined-required"
          label="Tên tòa nhà"
          {...register("name")}
          sx={{ m: 1 }}
        />
        <TextField
          required
          id="outlined-required"
          label="Số tầng"
          {...register("floorNum")}
          sx={{ m: 1 }}
        />
        <TextField
          required
          id="outlined-required"
          label="Số phòng"
          {...register("classNum")}
          sx={{ m: 1 }}
        />
        <TextField
          required
          id="outlined-required"
          label="Năm xây dựng"
          {...register("builtYear")}
          sx={{ m: 1 }}
        />
        <Button
          variant="contained"
          sx={{ width: 214, m: 1 }}
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </Box>
    </FormControl>
  );
};

export default CreateBuildingForm;
