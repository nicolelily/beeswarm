import { SimpleTable } from "@nshiab/simple-data-analysis";

export default async function crunchData(
  fires: SimpleTable,
  provinces: SimpleTable,
) {
  await fires.cache(async () => {
    await fires.loadData(
      "https://raw.githubusercontent.com/nshiab/data-fetch-lesson/refs/heads/main/reported_fires_2023.csv",
    );
    await fires.points("lat", "lon", "geom");
    await fires.addColumn("isFire", "boolean", `TRUE`);
    await fires.sort({ lat: "desc" });
  });

  await provinces.cache(async () => {
    await provinces.loadGeoData(
      "https://raw.githubusercontent.com/nshiab/simple-data-analysis/main/test/geodata/files/CanadianProvincesAndTerritories.json",
    );
  });

  await fires.insertTables(provinces, { unifyColumns: true });
}
