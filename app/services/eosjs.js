import { Api, JsonRpc, RpcError } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
const { TextDecoder, TextEncoder } = require("util");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const PKEY = process.env.PKEY_SECRET;
const signatureProvider = new JsSignatureProvider([PKEY]);

export const createUserApi = (privateKey, rpc) => {
  let userSignatureProvider = new JsSignatureProvider([privateKey]);
  return new Api({
    rpc,
    signatureProvider: userSignatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder(),
  });
};

export class Eosio {
  constructor() {
    this.rpc = new JsonRpc(process.env.WAX_ENDPOINTS.split(" ")[0], { fetch });
    this.api = new Api({
      rpc: this.rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
    });
  }

  async setWorkingEndpoint() {
    for (let endpoint of process.env.WAX_ENDPOINTS.split(" ")) {
      this.rpc = new JsonRpc(endpoint, { fetch });
      this.api = new Api({
        rpc: this.rpc,
        signatureProvider,
        textDecoder: new TextDecoder(),
        textEncoder: new TextEncoder(),
      });
      let isWork = await this.rpc
        .get_info()
        .then((res) => {
          return true;
        })
        .catch((err) => {
          console.log("err", err);
          return false;
        });

      if (isWork) {
        break;
      }
    }
  }
}
