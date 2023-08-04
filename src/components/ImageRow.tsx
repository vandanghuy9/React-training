import { Image, ImageRowProps } from "../data/data";

// const renderRow = (col: number, img: any) => {
//   let imgArray = [];
//   console.log(col, img);
//   for (let i = 0; i < col; i++) {
//     imgArray.push(
//       <img
//         key={img[i]?.key}
//         src={img[i]?.img}
//         width={200}
//         height={200}
//         alt="furniture"
//         className="border-solid border-black border-[1px]"
//       ></img>
//     );
//   }
//   return imgArray;
// };
const ImageRow = (props: ImageRowProps) => {
  const { img } = props;
  // console.log(col, img);
  return (
    <div className="flex flex-row gap-2 px-5 py-1 h-[200px] ">
      {img?.map((item) => (
        <img
          key={item?.key}
          src={item?.img}
          width={200}
          height={200}
          alt="furniture"
          className="border-solid border-black border-[1px]"
        ></img>
      ))}
    </div>
  );
};
export default ImageRow;
