import _ from "lodash";

export function getSum(transports, vehicletype) {
  let sum = _(transports)
    .groupBy("vehicletype")
    .map((objs, key) => {
      if (!vehicletype) return _.sumBy(objs, "rentprice"); // [300, 350, 500]
      return {
        vehicletype: key,
        color: objs[0].color,
        total: _.sumBy(objs, "rentprice")
      };
    })
    .value();
  return sum;
}

export function getLabels(transports) {
  let amountSum = getSum(transports, "vehicletype");
  let Total = _.sum(getSum(transports));

  let percent = _(amountSum)
    .map((objs) => _.assign(objs, { percent: (100 * objs.total) / Total }))
    .value();

  return percent;
}

export function chart_Data(transports, custom) {
  let bg = _.map(transports, (a) => a.color);
  bg = _.uniq(bg);
  let dataValue = getSum(transports);

  const config = {
    data: {
      datasets: [
        {
          data: dataValue,
          backgroundColor: bg,
          hoverOffset: 4,
          borderRadius: 0,
          spacing: 0
        }
      ]
    },
    options: {
      cutout: 0
    }
  };

  return custom ?? config;
}

export function getTotal(transports) {
  return _.sum(getSum(transports));
}
