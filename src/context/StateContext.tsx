import { useContext, useState, createContext, useEffect } from "react";
import { request } from "../utils/api";
import { Building, BuildingContextType } from "../data/data";

const Context = createContext<BuildingContextType>({
  isLoading: true,
  buildings: [],
  newBuilding: {
    id: null,
    name: "",
    floorNum: "",
    classNum: "",
    onService: true,
    roomList: null,
    builtYear: "",
  },
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {},
  setIsLoading: (data: any) => {},
  handleDelete: () => {},
  getData: () => {},
  getBuildingRoom: () => {},
  rows: [],
  setRows: () => {},
});
export const StateContext = ({ children }: any) => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newBuilding, setNewBuilding] = useState<Building>({
    id: null,
    name: "",
    floorNum: "",
    classNum: "",
    onService: true,
    roomList: null,
    builtYear: "",
  });
  const [rows, setRows] = useState([]);
  const getData = () => {
    request("get", "/building/all", null, (data: Building[]) => {
      setBuildings(data);
      setIsLoading(false);
    });
  };
  const getBuildingRoom = (id: number | string) => {
    request("get", "/room/?building_id=" + id, null, (data: any) => {
      setRows(data);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewBuilding({ ...newBuilding, [e.target.name]: e.target.value });
  };
  const handleDelete = async (id: any, url: string) => {
    setIsLoading(true);
    const building = await request(
      "delete",
      url,
      null,
      (data: Building) => data
    );
    getData();
    return building;
  };
  return (
    <Context.Provider
      value={{
        buildings,
        isLoading,
        newBuilding,
        rows,
        setRows,
        getBuildingRoom,
        handleChange,
        setIsLoading,
        handleDelete,
        getData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGetBuildingInfo = () => useContext(Context);
