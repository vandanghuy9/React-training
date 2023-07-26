export interface Person {
  id: number;
  mssv: string;
  name: string;
  dob: string;
  email: string;
}
export type ImageRowProps = {
  col: number;
  img: any;
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

export default people;
