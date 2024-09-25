import _ from "lodash";

export function getSum(machine, materialtype) {
  let sum = _(machine)

    .groupBy("materialtype")
    .map((objs, key) => {
      if (!materialtype) return _.sumBy(objs, "Cost"); // [300, 350, 500]
      return {
        materialtype: key,
        color: objs[0].color,
        total: _.sumBy(objs, "Cost"),
      };
    })
    .value();
  return sum;
}

export function getLabels(machine) {
  let amountSum = getSum(machine, "materialtype");
  let Total = _.sum(getSum(machine));

  let percent = _(amountSum)
    .map((objs) => _.assign(objs, { percent: (100 * objs.total) / Total }))
    .value();

  return percent;
}

export function chart_Data(machine, custom) {
  let bg = _.map(machine, (a) => a.color);
  bg = _.uniq(bg);
  let dataValue = getSum(machine);

  const config = {
    data: {
      datasets: [
        {
          data: dataValue,
          backgroundColor: bg,
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 125,
    },
  };

  return custom ?? config;
}

export function getTotal(machine) {
  return _.sum(getSum(machine));
}
