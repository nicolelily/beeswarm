import { SimpleTable } from "@nshiab/simple-data-analysis";
import { dodgeX, dot, plot } from "@observablehq/plot";
 
export default async function visualizeData(fires: SimpleTable) {
  await fires.logTable();
  const drawChart = (data: unknown[]) =>
    plot({
      width: 800,
      marginTop: 40,
      y: {
        type: "log",
        label: "Hectares",
        ticks: 5,
        grid: true,
      },
      r: {
        range: [1, 20],
      },
      fx: {
        label: null,
      },
      marks: [
        dot(
          data,
          dodgeX("middle", {
            y: "hectares",
            r: "hectares",
            fill: "cause",
            fx: "cause",
          }),
        ),
      ],
    });
  await fires.writeChart(drawChart, "./sda/output/beeswarm.png");
}
