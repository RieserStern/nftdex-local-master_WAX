import {
  createDfuseClient,
  waitFor,
  dynamicMessageDispatcher,
  OnStreamMessage,
  InboundMessageType,
} from "@dfuse/client";
import {
  NFTDEX_CONTRACT,
  SIMPLEASSET_CONTRACT,
  DAPPSERVICES_PERMISSION,
  CANCELOFFER_SA_ACTION,
  GETPOTTRADES_ACTION,
  OFFER_TABBLE,
  TRADEBUILD_ACTION,
  SASSETS_TABLE,
  SASSETRM_ACTION,
  OFFERSDELALL_ACTION,
  TRADELOG_ACTION,
} from "../util/ContractAbi";
import { getTable, pushTransaction } from "../controllers/nftdex";
import { Graph } from "../util/multilateral";
const dotenv = require("dotenv");
dotenv.config();
import { retryPromiseWithDelay } from "../util/index";
// TODO: need cron job for offersdelexp, check offer for asset and offer

export const SCListener = () => {
  const dfuseConfig = {
    apiKey: process.env.DFUSE_API_KEY,
    network: process.env.DFUSE_NETWORK,
  };
  const client = createDfuseClient(dfuseConfig);
  console.log("WAX config: ", dfuseConfig);

  global.io.on("connection", (socket) => {
    console.log("a user connected");
    socket.emit("hello", "world");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  client
    .streamActionTraces(
      {
        accounts: NFTDEX_CONTRACT,
        action_names: TRADELOG_ACTION,
      },
      async (message) => {
        if (message.type === InboundMessageType.ACTION_TRACE) {
          const data = message.data.trace.act.data;
          console.log("data tradelog: ", data);
          const { demand_id, demand_owner, supply_id, supply_owner, traded } =
            data;
          console.log("Emit to:", supply_owner);
          // global.io.emit(demand_owner, data);
          global.io.sockets.emit(supply_owner, data);
        }
      }
    )
    .catch((error) => {
      console.log("An error occurred.", error);
    });
  client
    .streamActionTraces(
      {
        accounts: NFTDEX_CONTRACT,
        action_names: GETPOTTRADES_ACTION,
      },
      async (message) => {
        if (message.type === InboundMessageType.ACTION_TRACE) {
          const data = message.data.trace.act.data;
          console.log("data getpottrades: ", data);
          const { supply_id, demand_id, routeId, trade_contingent } = data;
          if (!supply_id || !demand_id || !routeId) {
            console.log("Missing params");
            return;
          }
          let checkForTrades = true;
          const offersByDemandLower = (
            await getTable(
              NFTDEX_CONTRACT,
              NFTDEX_CONTRACT,
              OFFER_TABBLE,
              supply_id,
              supply_id,
              3,
              "i64"
            )
          ).rows;

          if (!(offersByDemandLower.length > 0)) {
            checkForTrades = false;
          }

          const offersBySupplyLower = (
            await getTable(
              NFTDEX_CONTRACT,
              NFTDEX_CONTRACT,
              OFFER_TABBLE,
              demand_id,
              demand_id,
              2,
              "i64",
              1
            )
          ).rows;

          if (!(offersBySupplyLower.length > 0)) {
            checkForTrades = false;
          }

          console.log(checkForTrades);
          if (!checkForTrades) {
            if (trade_contingent) {
              console.log("No trade found.");
            }
            return;
          }

          let offerTable = (
            await getTable(NFTDEX_CONTRACT, NFTDEX_CONTRACT, OFFER_TABBLE)
          ).rows;
          let g = new Graph();
          if (offerTable.length <= 1) {
            console.log("only have one offers");
            return;
          }
          for (let it of offerTable) {
            g.addEdge(it.supply_id, it.demand_id, it.route_id);
          }
          let paths = g.getTradePath(demand_id, supply_id, parseInt(routeId));
          console.log("paths: ", paths);
          let selectedPath = [];
          for (let path of paths) {
            let valid = true;
            for (let id of path) {
              let offer = offerTable.find((item) => {
                return item.route_id == id;
              });
              if (offer.expires_at <= Date.now()) {
                valid = false;
              }
            }
            if (valid) {
              selectedPath = path;
              break;
            }
          }

          if (selectedPath.length == 0) {
            if (trade_contingent == true) {
              console.log("No trade found.");
            }
          }
          console.log("selectedPath: ", selectedPath);

          const tradeBuildActions = [
            {
              account: NFTDEX_CONTRACT,
              name: TRADEBUILD_ACTION,
              authorization: [
                {
                  actor: NFTDEX_CONTRACT,
                  permission: DAPPSERVICES_PERMISSION,
                },
              ],
              data: {
                selectedPath,
              },
            },
          ];

          const retry = 4;
          const wait = 2000;

          const result = await retryPromiseWithDelay(
            pushTransaction(tradeBuildActions),
            retry,
            wait
          ).catch((e) => {
            console.log("error", e.message);
            return;
          });
          console.log("tradecreated:", result);
        }
      }
    )
    .catch((error) => {
      console.log("An error occurred.", error);
    });

  // Listen simpleasset canceloffer
  client
    .streamActionTraces(
      {
        accounts: SIMPLEASSET_CONTRACT,
        action_names: CANCELOFFER_SA_ACTION,
      },
      async (message) => {
        if (message.type === InboundMessageType.ACTION_TRACE) {
          const data = message.data.trace.act.data;
          console.log("data canceloffer: ", data);
          const { assetids } = data;
          if (assetids.length == 0) {
            console.log("No cancel assets.");
            return;
          }
          let assetsIdToRemove = [];
          for (let id of assetids) {
            const offer = (
              await getTable(
                NFTDEX_CONTRACT,
                SIMPLEASSET_CONTRACT,
                SASSETS_TABLE,
                id,
                id,
                1,
                "i64",
                1
              )
            ).rows;
            if (offer.length > 0) {
              assetsIdToRemove.push(id);
            }
          }
          console.log("assets to remove: ", assetsIdToRemove);
          if (assetsIdToRemove.length == 0) {
            console.log("No cancel assets from nftdexnfedex");
            return;
          }
          // Remove from sassets and offers
          const rmActions = [
            {
              account: NFTDEX_CONTRACT,
              name: SASSETRM_ACTION,
              authorization: [
                {
                  actor: NFTDEX_CONTRACT,
                  permission: DAPPSERVICES_PERMISSION,
                },
              ],
              data: {
                sasset_ids: assetsIdToRemove,
              },
            },
            {
              account: NFTDEX_CONTRACT,
              name: OFFERSDELALL_ACTION,
              authorization: [
                {
                  actor: NFTDEX_CONTRACT,
                  permission: DAPPSERVICES_PERMISSION,
                },
              ],
              data: {
                sasset_ids: assetsIdToRemove,
              },
            },
          ];

          const retry = 4;
          const wait = 2000;

          const result = await retryPromiseWithDelay(
            pushTransaction(rmActions),
            retry,
            wait
          ).catch((e) => {
            console.log("error", e.message);
            return;
          });
          console.log("rmActions:", result);
        }
      }
    )
    .catch((error) => {
      console.log("An error occurred.", error);
    });
};
