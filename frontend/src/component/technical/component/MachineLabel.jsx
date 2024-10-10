import React from "react";
import { default as api } from "../store/apiSlice";
import { getLabels } from "../helpers/helpers";

export default function MachineLabels() {
  const { data, isFetching, isSuccess, isError } =
    api.useGetMachineLabelsQuery();
  let Expence;
  if (isFetching) {
    Expence = <div>Fetching</div>;
  } else if (isSuccess) {
    Expence = getLabels(data, "materialtype").map((v, i) => (
      <LabelComponent key={i} data={v}></LabelComponent>
    ));
  } else if (isError) {
    Expence = <div>Error</div>;
  }

  return <>{Expence}</>;
}

function LabelComponent({ data }) {
  if (!data) return <></>;
  return (
     <div className="labels flex justify-between bg-gray-200 rounded-md ">
     <div className="flex gap-2">
       <div
         className="w-2 h-3 rounded-md py-3 "
         style={{ background: data.color ?? "#f9c74f" }}
       ></div>
       <h3 className="text-md">{data.materialtype ?? ""}</h3>
     </div>
     <h3 className="font-bold">{Math.round(data.percent) ?? 0}%</h3>
   </div>
  );
}
