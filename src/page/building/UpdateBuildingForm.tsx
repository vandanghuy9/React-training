import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useLocation, useParams } from "react-router-dom";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { LinearProgress } from "@mui/material";
import clsx from "clsx";
import { useGetBuildingInfo } from "../../context/StateContext";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { toast } from "react-toastify";
import { request } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Building } from "../../data/data";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

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
  onService: boolean | number;
};
const UpdateBuildingForm = () => {
  const { buildingId } = useParams();
  const { isLoading, setIsLoading, buildings, getData } = useGetBuildingInfo();
  const [building, setBuilding] = useState<any>({
    name: "",
    floorNum: "",
    classNum: 0,
    onService: true,
    builtYear: "",
  });
  useEffect(() => {
    setIsLoading(true);
    request("get", `/building/${buildingId}`, null, (data: Building) => {
      setBuilding(data);
      setIsLoading(false);
    });
  }, []);
  const handleChange = (e: any) => {
    console.log(e.target.name, e.target.value);
    setBuilding((prev: Building) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();
  const onSubmit = () => {
    const { name, floorNum, classNum, builtYear } = building;
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
      return;
    }
    building.floorNum = parseInt(building.floorNum);
    building.classNum = parseInt(building.classNum);
    if (building.onService === 1) {
      building.onService = true;
    } else {
      building.onService = false;
    }
    request(
      "put",
      "/building/update?id=" + buildingId,
      building,
      (response: any) => {
        toast.success(response.name + " was updated successfully", {
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
      }
    );
    navigate("/");
    return;
  };
  return isLoading ? (
    <LinearProgress
      style={{
        position: "fixed",
        top: 0,
        left: -250,
        width: "calc(100% + 300px)",
        zIndex: 1202,
      }}
    />
  ) : (
    <FormControl defaultValue="" required>
      <Label>Update new building</Label>
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
          sx={{ m: 1 }}
          name="name"
          value={building?.name}
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Số tầng"
          sx={{ m: 1 }}
          name="floorNum"
          value={building?.floorNum}
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Số phòng"
          sx={{ m: 1 }}
          name="classNum"
          value={building?.classNum}
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Năm xây dựng"
          sx={{ m: 1 }}
          name="builtYear"
          value={building?.builtYear}
          onChange={handleChange}
        />
        <Select
          id="demo-simple-select"
          value={building?.onService == 1 ? 1 : 0}
          name="onService"
          onChange={handleChange}
          sx={{ m: 1 }}
        >
          <MenuItem value={1}>Đang Hoạt động</MenuItem>
          <MenuItem value={0}>Ngừng Hoạt động</MenuItem>
        </Select>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          p: 1,
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        }}
      >
        <Button
          variant="contained"
          sx={{ width: 214, m: 1 }}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Box>
    </FormControl>
  );
};

export default UpdateBuildingForm;
