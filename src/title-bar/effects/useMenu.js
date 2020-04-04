import { useState, useEffect } from 'react';

const modifiers = ['CommandOrControl', 'CmdOrCtrl'];
const CMD = '⌘';
const CTRL = 'Ctrl';

const topologicalSort = (original, graph) => {
  // Sort items topologically using a depth-first approach
  const sorted = [];
  const visited = new Set();

  const visit = mark => {
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
  };

  original.forEach(visit);
  return sorted;
};

const validate = item => {
  if (item === null || typeof item !== 'object') {
    return false;
  }
  // eslint-disable-next-line no-prototype-builtins
  return item.hasOwnProperty('label') || item.type === 'separator';
};

const addEdge = (graph, fromEdge, toEdge) => {
  if (!graph.has(fromEdge)) {
    // create edge list from
    graph.set(fromEdge, []);
  }
  // add to edge list from -> to
  graph.get(fromEdge).push(toEdge);
};

const sortMenuItems = menu => {
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

const parseAccelerator = (accelerator, platform) => {
  if (accelerator && accelerator !== '') {
    const re = new RegExp(modifiers.join('|'), 'gi');
    return accelerator.replace(re, () => {
      return platform === 'darwin' ? CMD : CTRL;
    });
  }
};

const sortMenu = (menu, platform) => {
  // sort menu and all submenus
  return sortMenuItems(menu).map(item => {
    if (!validate(item)) {
      throw new TypeError(
        'MenuItem must have at least one of label, role or type'
      );
    }
    if (Array.isArray(item.submenu)) {
      // sort submenus
      return { ...item, submenu: sortMenu(item.submenu) };
    }
    return { ...item, accelerator: parseAccelerator(item.accelerator, platform) };
  });
};

const buildMenu = (menu, platform) => {
  if (!Array.isArray(menu)) {
    throw new TypeError('Menu must be an array');
  }

  return sortMenu(menu, platform);
};

const useMenu = (menu, platform) => {
  const [currentMenu, setMenu] = useState(buildMenu([...(menu || [])], platform));

  useEffect(() => {
    setMenu(buildMenu([...(menu || [])], platform));
  }, [menu, platform]);

  return currentMenu;
};

export default useMenu;
