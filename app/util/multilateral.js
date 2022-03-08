export class Graph {
  constructor() {
    // this.V = v;
    this.adj = {};
    this.paths = [];
  }

  getTradePathUtil(supply, demand, visited, path, index, id) {
    visited[supply] = true;
    path[index] = id;
    index++;

    if (supply == demand) {
      let value = [];
      for (let i = 0; i < index; i++) {
        value.push(path[i]);
      }
      this.paths.push(value);
    } else {
      if (this.adj[supply]) {
        for (let it of this.adj[supply]) {
          !visited[it.Sasset] &&
            this.getTradePathUtil(
              it.Sasset,
              demand,
              visited,
              path,
              index,
              it.Id
            );
        }
      }
    }
    index--;
    visited[supply] = false;
  }

  getTradePath(supply, demand, id) {
    let visited = {};
    let path = [];
    let index = 0;

    for (let [key, value] of Object.entries(this.adj)) {
      visited[key] = false;
    }

    this.getTradePathUtil(supply, demand, visited, path, index, id);

    return this.paths;
  }

  addEdge(u, v, id) {
    let e = new Edge(v, id);
    if (this.adj[u]) {
      this.adj[u].push(e);
    } else {
      this.adj[u] = [e];
    }
  }
}

export class Edge {
  constructor(s, id) {
    this.Sasset = s;
    this.Id = id;
  }

  setSasset(sasset) {
    this.Sasset = sasset;
  }
  setId(id) {
    this.Id = id;
  }

  getSasset() {
    return this.Sasset;
  }
  getId() {
    return this.Id;
  }
}
