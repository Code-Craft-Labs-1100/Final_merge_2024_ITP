import React from "react";
import { default as api } from "../store/apiSlice";
import { getLabels } from "../helpers/helpers";

export default function Labels() {
  const { data, isFetching, isSuccess, isError } =
    api.useGetTransportLabelsQuery();
  let Transport;
  if (isFetching) {
    Transport = <div>Fetching</div>;
  } else if (isSuccess) {
    Transport = getLabels(data, "vehicletype").map((v, i) => (
      <LabelComponent key={i} data={v}></LabelComponent>
    ));
  } else if (isError) {
    Transport = <div>Error</div>;
  }

  return <>{Transport}</>;
}

function LabelComponent({ data }) {
  if (!data) return <></>;
  return (
    <div
      className="w-2 h-2 border-2  rounded-md py-3 mt-2"
      style={{ background: data.color ?? "" }}
    >
      <div className="item flex justify-between">
        <div className="flex gap-2">
          <h3 className="text-md font-bold">{data.vehicletype ?? ""}</h3>
        </div>
        <h3 className="font-bold">{Math.round(data.percent) ?? 0}%</h3>
      </div>
    </div>
  );
}
