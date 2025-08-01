import { SimpleDB } from "@nshiab/simple-data-analysis";
import crunchData from "./helpers/crunchData.ts";
import visualizeData from "./helpers/visualizeData.ts";

const sdb = new SimpleDB();
const fires = sdb.newTable("fires");
const provinces = sdb.newTable("provinces");

await crunchData(fires, provinces);
await visualizeData(fires);

await sdb.done();
