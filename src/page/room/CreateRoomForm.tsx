import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { LinearProgress } from "@mui/material";
import clsx from "clsx";
import { useGetBuildingInfo } from "../../context/StateContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { request } from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { Building } from "../../data/data";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
  seatNum: number | string;
  roomType: number | string;
  floor: number | string;
  onService?: boolean;
  building: Building;
};
const CreateRoomForm = () => {
  const { id } = useParams();
  const { isLoading, setIsLoading, getData, buildings, getBuildingRoom } =
    useGetBuildingInfo();
  const [building, setBuilding] = useState<Building>({
    id: 0,
    name: "",
    floorNum: 0,
    classNum: 0,
    onService: true,
    roomList: [],
    builtYear: 0,
  });
  const [floors, setFloors] = useState<number[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      seatNum: 0,
      roomType: "classroom",
      floor: 0,
      onService: true,
    },
  });
  useEffect(() => {
    setIsLoading(true);
    request("get", `/building/${id}?random=${id}`, null, (data: Building) => {
      setBuilding(data);
      setFloors(Array.from(Array(data.floorNum).keys()));
      setIsLoading(false);
    });
  }, []);
  const navigate = useNavigate();
  const onSubmit = (data: Inputs) => {
    const { name, seatNum, roomType, floor } = data;
    if (!name || !seatNum || !roomType || !floor) {
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
      data.building = building;
      request("post", "/room/create", data, (response: any) => {
        toast.success("Room " + response.name + " was created successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getBuildingRoom(id);
      });
      navigate(`/building/${id}`);
    }
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
      <Label>Create new room for {building.name} building</Label>
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
          label="Tên Phòng"
          {...register("name")}
          sx={{ m: 1 }}
        />
        <TextField
          required
          id="outlined-required"
          label="Số chỗ ngồi"
          {...register("seatNum")}
          sx={{ m: 1 }}
        />
        <Select
          {...register("roomType")}
          labelId="demo-select-small-label"
          id="demo-select-small"
          sx={{ height: 55, m: 1 }}
          defaultValue={"roomType"}
        >
          <MenuItem value={"roomType"}>Chọn Loại phòng</MenuItem>
          <MenuItem value={"classroom"}>Phòng học</MenuItem>
          <MenuItem value={"auditorium"}>Giảng đường</MenuItem>
        </Select>
        <Select
          {...register("floor")}
          labelId="demo-select-small-label"
          id="demo-select-small"
          sx={{ height: 55, m: 1, color: "black" }}
          label="App"
          defaultValue={0}
        >
          <MenuItem value={0}>Chọn tầng</MenuItem>
          {floors.map((item) => (
            <MenuItem value={item + 1}>Tầng {item + 1}</MenuItem>
          ))}
        </Select>
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

export default CreateRoomForm;
