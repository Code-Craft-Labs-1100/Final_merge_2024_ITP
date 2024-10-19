import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { chart_Data, getTotal } from "../helpers/helpers";
import { default as api } from "../store/apiSlice";
import TransportLabel from "../component/TransportLabel";

Chart.register(ArcElement);

export default function MachineGraph() {
  const { data, isFetching, isSuccess, isError } =
    api.useGetTransportLabelsQuery();
  let graphData;

  if (isFetching) {
    graphData = <div>Fetching</div>;
  } else if (isSuccess) {
    graphData = <Doughnut {...chart_Data(data)}></Doughnut>;
  } else if (isError) {
    graphData = <div>Error</div>;
  }

  return (
    <div className="">
      <div className="item">
        <div className="ml-8">{graphData}</div>

        <div className="flex flex-col py-10 gap-4 mt-4">
          {/* Labels */}
          <TransportLabel />
        </div>
      </div>
    </div>
  );
}
