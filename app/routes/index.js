import express from "express";
import * as NFTDEXController from "../controllers/nftdex";

export default (app) => {
  const apiRoutes = express.Router();

  // Set API group
  app.use("/api", apiRoutes);
  apiRoutes.get("/options/:account", NFTDEXController.getOptionsByAccount);
  apiRoutes.get(
    "/selectedPath/:supply_id/:demand_id",
    NFTDEXController.getSelectedPath
  );
};
