import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Building, buildingTableHeader } from "../data/data";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useGetBuildingInfo } from "../context/StateContext";
import { IconButton, LinearProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";

export default function HomePage() {
  const { isLoading, buildings, handleDelete } = useGetBuildingInfo();
  const deleteBuilding = (id: any, url: string) => {
    const result = handleDelete(id, url);
    toast.success(" Deleted successfully", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  if (isLoading) {
    return (
      <LinearProgress
        style={{
          position: "fixed",
          top: 0,
          left: -250,
          width: "calc(100% + 300px)",
          zIndex: 1202,
        }}
      />
    );
  }
  return (
    <Stack spacing={2} direction="column">
      <Button variant="contained" sx={{ width: 200 }}>
        <Link to={"/building/create"}>Add new building</Link>
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {buildingTableHeader.map((item, index) => (
                <TableCell align="left" key={index}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {buildings.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">
                  <Link
                    to={`/building/${row.id}`}
                    className="underline decoration-solid"
                  >
                    {row.name}
                  </Link>
                </TableCell>
                <TableCell align="right">{row.floorNum}</TableCell>
                <TableCell align="right">{row.classNum}</TableCell>
                <TableCell align="right">
                  {row.onService === true
                    ? "Đang hoạt động"
                    : "Ngừng hoạt động"}
                </TableCell>
                <TableCell>
                  <Link to={`/building/update/${row.id}`}>
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    aria-label="delete"
                    onClick={() =>
                      deleteBuilding(row.id, `/building/delete?id=${row.id}`)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
