const topologicalSort = (original, graph) => {
  // Sort items topologically using a depth-first approach
  const sorted = [];
  const visited = new Set();

  const visit = (mark) => {
    // if item visited return
    if (visited.has(mark)) return;
    // add item to list of visited nodes
    visited.add(mark);
    // get edges from graph for visited id
    const edges = graph.get(mark);
    if (edges != null) {
      // visit each edge
      edges.forEach(visit);
    }
    sorted.push(mark);
  }

  original.forEach(visit);
  return sorted;
};

const areValidTemplateItems = (template) => {
  // validate the menu attributes
  return template.every(item => {
    if (item === null || typeof item !== 'object') {
      return false;
    }
    return (item.hasOwnProperty('label') || item.type === 'separator')
  });
};

const addEdge = (graph, from, to) => {
  if (!graph.has(from)) {
    // create edge list from
    graph.set(from, []);
  }
  // add to edge list from -> to
  graph.get(from).push(to);
};

const sortMenuItems = (menu) => {
  const original = menu.map((item, i) => i);
  const graph = new Map();
  const idToIndex = new Map(menu.map((item, i) => [item.id, i]));
  // add graph edges to perform topological sort
  menu.forEach((item, i) => {
    if (item.before) {
      // get index from item before id
      const to = idToIndex.get(item.before);
      if (to != null) {
        // add edge pointing from item before -> to current item
        addEdge(graph, to, i);
      }
    }
    if (item.after) {
      // get index from item after id
      const to = idToIndex.get(item.after);
      if (to != null) {
        // add edge from current item pointing -> to item after
        addEdge(graph, i, to);
      }
    }
  });
  // sort edges
  const sortedOrder = topologicalSort(original, graph);
  // return sorted menu items
  return sortedOrder.map(i => menu[i]);
};

const sortMenu = (menu) => {
  // sort menu and all submenus
  const sorted = sortMenuItems(menu);
  for (const id in sorted) {
    if (Array.isArray(sorted[id].submenu)) {
      // sort submenus
      sorted[id].submenu = sortMenu(sorted[id].submenu);
    }
  }
  return sorted;
};

export const buildMenu = (menu) => {
  if (!Array.isArray(menu)) {
    throw new TypeError('Menu must be an array');
  }
  if (!areValidTemplateItems(menu)) {
    throw new TypeError('MenuItem must have at least one of label, role or type');
  }
  return sortMenu(menu);
};

export const getPathToMenuItem = (menu, id) => {
  console.log(menu);
  console.log(id);
}
