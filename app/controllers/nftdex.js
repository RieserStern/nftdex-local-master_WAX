import { Eosio } from "../services/eosjs";
import { innerJoin } from "../util/index";
import { pgClient } from "../models/index";
import { Graph } from "../util/multilateral";
import {
  NFTDEX_CONTRACT,
  GETPOTTRADES_ACTION,
  TOKEN_SYMBOL,
  SIMPLEASSET_CONTRACT,
  SASSETS_TABLE,
  OFFER_TABBLE,
} from "../util/ContractAbi";
export const getTable = async (
  code,
  scope,
  tableName,
  upper_bound,
  lower_bound,
  index_position = 1,
  key_type = "i64",
  limit = -1
) => {
  try {
    let eosio = new Eosio();
    await eosio.setWorkingEndpoint();
    const result = await eosio.rpc.get_table_rows({
      json: true, // Get the response as json
      code: code, // Contract that we target
      scope: scope, // Account that owns the data
      table: tableName, // Table name
      index_position,
      key_type,
      limit, // Maximum number of rows that we want to get
      reverse: false, // Optional: Get reversed data
      show_payer: false, // Optional: Show ram payer
      upper_bound,
      lower_bound,
    });
    return result;
  } catch (err) {
    return { error: err };
  }
};

export const pushTransaction = async (
  actions,
  options = { blocksBehind: 3, expireSeconds: 120 }
) => {
  try {
    let eosio = new Eosio();
    await eosio.setWorkingEndpoint();
    const result = await eosio.api.transact(
      {
        actions,
      },
      options
    );
    return result;
  } catch (err) {
    return { error: err };
  }
};

export const getOptionsByAccount = async (req, res) => {
  try {
    let eosio = new Eosio();
    await eosio.setWorkingEndpoint();
    const { account } = req.params;
    if (!account) {
      res.send({ error: { message: "Missing account param." } });
      return;
    }
    let options = [];

    //Get all sasset of account
    let currentSasset = (
      await getTable(
        NFTDEX_CONTRACT,
        SIMPLEASSET_CONTRACT,
        SASSETS_TABLE,
        account,
        account,
        3
      )
    ).rows;
    currentSasset = currentSasset.filter((sasset) => {
      return sasset.status == "active";
    });

    if (currentSasset.length <= 0) {
      res.send({ account, options: [] });
      return;
    }

    //Get all existing Sasset
    let existingSasset = (
      await getTable(NFTDEX_CONTRACT, SIMPLEASSET_CONTRACT, SASSETS_TABLE)
    ).rows;
    currentSasset = currentSasset.filter((sasset) => {
      return sasset.status == "active";
    });

    if (existingSasset.length <= 1) {
      res.send({ account, options: [] });
      return;
    }

    // Get all offers in offers table
    let offers = (
      await getTable(NFTDEX_CONTRACT, NFTDEX_CONTRACT, OFFER_TABBLE)
    ).rows;
    offers = offers.filter((it) => {
      return new Date(it.expires_at) > Date.now();
    });
    // Find options
    for (const i in currentSasset) {
      options = await getOption(
        account,
        currentSasset[i].sasset_id,
        existingSasset,
        options,
        offers
      );
    }

    res.send({ account, options });
    return;
  } catch (err) {
    console.log("err", err);
    res.send({ error: err.message });
    return;
  }
};

export const getSelectedPath = async (req, res) => {
  try {
    let eosio = new Eosio();
    await eosio.setWorkingEndpoint();
    const { supply_id, demand_id } = req.params;
    if (!supply_id) {
      res.send({ error: { message: "Missing supply_id param." } });
      return;
    }

    if (!demand_id) {
      res.send({ error: { message: "Missing demand_id param." } });
      return;
    }

    let fakeRouteId = -1;

    let offerTable = (
      await getTable(NFTDEX_CONTRACT, NFTDEX_CONTRACT, OFFER_TABBLE)
    ).rows;
    let g = new Graph();
    if (offerTable.length < 1) {
      console.log("only have one offers");
      return;
    }
    offerTable.push({
      route_id: fakeRouteId,
      supply_id,
      demand_id,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    for (let it of offerTable) {
      g.addEdge(it.supply_id, it.demand_id, it.route_id);
    }

    // g.addEdge(supply_id, demand_id, -1);
    let paths = g.getTradePath(demand_id, supply_id, parseInt(fakeRouteId));
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
        selectedPath = path.filter((it) => {
          return it != -1;
        });
        break;
      }
    }
    console.log("selectedPath: ", selectedPath);

    res.send({ selectedPath });
    return;
  } catch (err) {
    console.log("err", err);
    res.send({ error: err.message });
    return;
  }
};

export const getOption = async (
  account,
  sasset_id,
  existingSasset = [],
  options = [],
  offers = []
) => {
  const sasset = [];
  for (const s of existingSasset) {
    sasset[s.sasset_id] = s;
  }

  // Create edges
  let edges = innerJoin(
    existingSasset,
    offers,
    ({ sasset_id, status }, { demand_id, supply_id, route_id }) => {
      return (
        sasset_id == demand_id &&
        status == "active" && { demand_id, sasset_id, supply_id, route_id }
      );
    }
  );
  edges = innerJoin(
    edges,
    existingSasset,
    ({ sasset_id, supply_id, route_id }, { sasset_id: option_id, status }) => {
      return (
        supply_id == option_id &&
        status == "active" && { sasset_id, option_id, route_id }
      );
    }
  );

  // Clear table
  let dropTable = `DROP TABLE IF EXISTS ${account} CASCADE;`;
  await pgClient.query(dropTable);

  // Get all potential options
  let queryInit = [
    `CREATE TEMPORARY TABLE ${account} (route_id integer, sasset_id varchar, option_id varchar);`,
  ];
  // Add edge to table
  edges.forEach((element) => {
    queryInit.push(
      `insert into ${account} (route_id, sasset_id, option_id) values ('${element.route_id}', '${element.sasset_id}', '${element.option_id}');`
    );
  });
  let queryPath = [
    "WITH RECURSIVE search_path (depth, option_tree) AS (",
    "SELECT 1, ARRAY[e.sasset_id]",
    `FROM ${account} e`,
    "UNION ALL",
    "SELECT f.depth + 1, option_tree || d.option_id",
    `FROM ${account} d, search_path f`,
    "WHERE f.option_tree[array_length(option_tree, 1)] = d.sasset_id",
    ")",
    "SELECT * FROM search_path",
    `WHERE option_tree[1] = '${sasset_id}'`,
    "ORDER BY depth DESC;",
  ];
  const query = queryInit.concat(queryPath).join(" ");

  const res = await pgClient.query(query);
  const results = res[res.length - 1].rows;

  if (results.length == 0) {
    return options;
  }

  // Grab the current Sasset
  const currentSasset = sasset[parseInt(sasset_id)];

  // Determine branches by only keeping the longest legs (we don't need to consider the smaller depths)
  const branches = results.reduce((remaining, current) => {
    let alreadyHave = false;

    for (const i of remaining) {
      alreadyHave = current.option_tree.every((o) => i.indexOf(o[1]) > -1);
      if (alreadyHave) {
        break;
      }
    }

    if (!alreadyHave) {
      remaining.push(current.option_tree);
    }

    return remaining;
  }, []);

  // If we have branches then let's flatten them
  if (branches.length > 0) {
    var merged = [].concat.apply([], branches);
  }

  // Then remove dupes
  merged = merged.filter((a, b) => merged.indexOf(a) === b);

  const data = new Set();

  for (const o of merged) {
    const oSasset = sasset[parseInt(o)];

    data.add({
      owner: oSasset.owner,
      sasset_id: oSasset.sasset_id,
    });
  }

  for (var d of data) {
    // Don't save options that belong to the same owner as the Sasset in question,
    // or options that we already have saved,
    // or that hasn't been declined
    if (
      d.owner !== currentSasset.owner &&
      !options.find(
        (f) => f.supply === currentSasset.sasset_id && f.demand === d.sasset_id
      )
    ) {
      let supply = (
        await getTable(
          NFTDEX_CONTRACT,
          SIMPLEASSET_CONTRACT,
          SASSETS_TABLE,
          currentSasset.sasset_id,
          currentSasset.sasset_id,
          1,
          "i64",
          1
        )
      ).rows[0];
      let demand = (
        await getTable(
          NFTDEX_CONTRACT,
          SIMPLEASSET_CONTRACT,
          SASSETS_TABLE,
          d.sasset_id,
          d.sasset_id,
          1,
          "i64",
          1
        )
      ).rows[0];

      options.push({
        supply_owner: currentSasset.owner,
        supply,
        demand_owner: d.owner,
        demand,
      });
    }
  }
  // let dropTable = `DROP TABLE ${account};`;
  await pgClient.query(dropTable);

  return options;
};
