import React from "react";
import { default as api } from "../store/apiSlice";
import { getLabels } from "../helpers/helpers";

export default function MachineLabels() {
  const { data, isFetching, isSuccess, isError } =
    api.useGetMachineLabelsQuery();
  
  let Expence;
  if (isFetching) {
    Expence = <div id="fetching-message">Fetching...</div>;
  } else if (isSuccess) {
    Expence = getLabels(data, "materialtype").map((v, i) => (
      <LabelComponent key={i} data={v} />
    ));
  } else if (isError) {
    Expence = <div id="error-message">Error</div>;
  }

  return <div id="machine-labels">{Expence}</div>;
}

function LabelComponent({ data }) {
  if (!data) return <></>;

  return (
    <div className="labels flex justify-between bg-gray-200 rounded-md h-12" id="label-component">
      <div className="flex gap-3" id="label-content">
        <div
          className="h-0 w-4 rounded-md mt-0 py-4"
          style={{ background: data.color ?? "#f9c74f" }}
          id="label-color"
        ></div>
        <h3 className="text-xl" id="label-material-type">{data.materialtype ?? ""}</h3>
      </div>
      <h3 className="font-style: normalc" id="label-percent">{Math.round(data.percent) ?? 0}%</h3>
    </div>
  );
}
