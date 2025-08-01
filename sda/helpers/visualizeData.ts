import { SimpleTable } from "@nshiab/simple-data-analysis";
import { geo, plot, spike } from "@observablehq/plot";

export default async function visualizeData(fires: SimpleTable) {
  await fires.logTable();
  const drawMap = (
    data: { features: { properties: { [key: string]: unknown } }[] },
  ) => {
    const firesPoints = data.features.filter(
      (feature) => feature.properties.isFire,
    );
    const provincesPolygons = data.features.filter(
      (feature) => !feature.properties.isFire,
    );

    return plot({
      projection: {
        type: "conic-conformal",
        rotate: [100, -60],
        domain: data,
      },
      length: {
        range: [1, 200],
      },
      color: {
        legend: true,
      },
      marks: [
        geo(provincesPolygons, {
          stroke: "lightgray",
          fill: "whitesmoke",
        }),
        spike(firesPoints, {
          x: (d) => d.properties.lon,
          y: (d) => d.properties.lat,
          length: (d) => d.properties.hectares,
          stroke: (d) => d.properties.cause,
          fillOpacity: 1,
          fill: (d) => {
            if (d.properties.cause === "Human") {
              return "#b5caff";
            } else if (d.properties.cause === "Natural") {
              return "#ffe6a8";
            } else {
              return "#ffb9ad";
            }
          },
        }),
      ],
    });
  };
  await fires.writeMap(drawMap, "./sda/output/map.png");
}
