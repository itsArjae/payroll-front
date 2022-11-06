import { useState, CSSProperties } from "react";
import ClockLoader from "react-spinners/ClockLoader";


function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className=" flex flex-col items-center content-center ">
      <ClockLoader color="white" size={100} />
      <h1 className=' font-serif text-3xl text-test mt-10 ' >Please Wait</h1>
    </div>
  );
}

export default Loader;