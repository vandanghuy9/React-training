import { useLocation, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridActionsCellItem,
  GridRowId,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useGetBuildingInfo } from "../../context/StateContext";
import { request } from "../../utils/api";
import { LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
    editable: false,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: false,
  },
  {
    field: "seatNum",
    headerName: "Số chỗ ngồi",
    width: 110,
    editable: false,
  },
  {
    field: "roomType",
    headerName: "Loại phòng",
    type: "string",
    width: 120,
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.roomType === "classroom" ? "Phòng học" : "Giảng đường",
  },
  {
    field: "floor",
    headerName: "Tầng",
    type: "string",
    width: 80,
    editable: false,
  },
  {
    field: "isOnservice",
    headerName: "Đang hoạt động",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.onService === true ? "Đang hoạt động" : "Ngừng hoạt đông",
  },
  {
    field: "action",
    headerName: "Thao tác",
    type: "actions",
    sortable: true,
    width: 150,
    getActions: ({ id }) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        className="textPrimary"
        color="inherit"
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        color="inherit"
      />,
    ],
  },
];
const Building = () => {
  const { isLoading, setIsLoading, setRows, rows, getBuildingRoom } =
    useGetBuildingInfo();
  const { id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    getBuildingRoom(id);
  }, []);
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
    <div>
      <Button variant="contained" sx={{ width: 200, marginBottom: 1 }}>
        <Link to={`/building/${id}/create`}>Add new room</Link>
      </Button>
      <Box sx={{ height: 400, width: "100%", backgroundColor: "#FFF" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
        />
      </Box>
    </div>
  );
};

export default Building;
