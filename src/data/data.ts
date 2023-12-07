import { ChangeEventHandler } from "react";

export interface Person {
  id: number;
  mssv: string;
  name: string;
  dob: string;
  email: string;
}
export type Props = {
  type: string;
  id: string;
  value: string;
  name: string;
  placeHolder: string;
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ImageRowProps = {
  // col: number;
  img: Image[];
};
const people: Array<Person> = [
  {
    id: 1,
    mssv: "20205086",
    name: "Van Dang Huy",
    dob: "2020/11/15",
    email: "",
  },
  {
    id: 2,
    mssv: "20211234",
    name: "Phạm Văn A",
    dob: "2020/11/15",
    email: "",
  },
  {
    id: 3,
    mssv: "20211546",
    name: "Trần Đức B",
    dob: "2020/11/15",
    email: "",
  },
  {
    id: 4,
    mssv: "20205086",
    name: "Nguyễn V. C",
    dob: "2020/11/15",
    email: "",
  },
];
export type Row = number[];
export const number: Row[] = [
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 2],
];

export type Image = {
  key: number;
  img: string;
};

export const ImageArr: Image[] = [
  { key: 1, img: "/furniture.jpg" },
  { key: 2, img: "/furniture-2.jpg" },
  { key: 3, img: "/furniture-3.jpg" },
  { key: 4, img: "/furniture-4.jpg" },
  { key: 5, img: "/furniture-5.jpg" },
  { key: 6, img: "/furniture-6.jpg" },
  { key: 7, img: "/furniture-7.jpg" },
];
export default people;

export const buildingTableHeader = [
  "STT",
  "Tòa nhà",
  "Số tầng",
  "Tổng số lớp học",
  "Trạng thái hoạt động",
  "Thao tác",
];

export type Building = {
  id?: number | null;
  name: string;
  floorNum: number | string;
  classNum: number | string;
  onService?: boolean;
  roomList?: Array<any> | null;
  builtYear: number | string;
};

export type BuildingContextType = {
  isLoading: boolean;
  buildings: Building[];
  newBuilding: Building;
  handleChange: any;
  handleDelete: any;
  setIsLoading: any;
  getData: any;
  getBuildingRoom: any;
  rows: any;
  setRows: any;
};
