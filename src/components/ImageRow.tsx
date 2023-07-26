import { ImageRowProps } from "../data/data";

const renderRow = (col: number, img: any) => {
  let imgArray = [];
  for (let i = 0; i < col; i++) {
    imgArray.push(
      <img
        key={i}
        src={img}
        width={200}
        height={160}
        alt="furniture"
        className="border-solid border-black border-[1px]"
      ></img>
    );
  }
  return imgArray;
};
const ImageRow = (props: ImageRowProps) => {
  const { col, img } = props;
  const imgRow = renderRow(col, img);
  return <div className="flex flex-row gap-[5px] px-[10px] ">{imgRow}</div>;
};
export default ImageRow;
