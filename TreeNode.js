'use strict';

/**
 * @param { }
 * @param { id: String, parent: String, label: String }
 * @param { id: String, parent: String, label: String, level: Integer >= 1, order: Integer >= 1 }
 * @param { id: String, parent: String, label: String, order: Integer >= 1 }
 */
function TreeNode(id, parent, label, level, order) {
  /* eslint-disable no-param-reassign */
  if (!order) {
    if (!level) {
      level = 1;
      order = 1;
    } else {
      order = level;
      level = 1;
    }
  }

  if (!label) {
    if (!parent) {
      if (!id) {
        id = null;
        parent = null;
        label = null;
        order = null;
      } else {
        throw new TypeError('`parent` required');
      }
    } else {
      throw new TypeError('`label` required');
    }
  }
  /* eslint-enable no-param-reassign */


  this.id = id;
  this.parent = parent;
  this.label = label;
  this.level = level;
  this.order = order;
  this.children = [];
  return this;
}

var uuid4 = function uuid() {
  // http://stackoverflow.com/a/2117523/707580
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

var pools = {};

function fromPoolId(poolId, parent, level) {
  var pool = pools[poolId];
  var nodes = [];
  var remains = [];

  for (var i = 0; i < pool.length; i += 1) {
    var n = pool[i];

    if (n.parent === parent) {
      n.level = level;
      nodes.push(n);
    } else {
      remains.push(n);
    }
  }

  nodes.sort(function (a, b) {
    if (a.order === b.order) {
      return a.label.localeCompare(b.label);
    } else {
      return a.order < b.order ? -1 : 1;
    }
  });
  pools[poolId] = remains;

  for (var _i = 0; _i < nodes.length; _i += 1) {
    var _n = nodes[_i];
    _n.children = fromPoolId(poolId, _n.id, level + 1);
  }

  return nodes;
}
/**
 * @param { pool: List<TreeNode>, from: String, level: Integer }
 * @param { pool: List<TreeNode>, from='root', level=0 } ** sugar
 */


function fromPool(pool, from, level) {
  /* eslint-disable no-param-reassign */
  if (level !== 0 && !level) {
    level = 0;
  }

  if (!from) {
    from = 'root';
  }
  /* eslint-enable no-param-reassign */


  var poolId = uuid4();
  pools[poolId] = pool;
  var root = null;

  if ('root' === from) {
    // NOTE: 约定使用 root 这个命名
    root = new TreeNode('', '', '', 1); // NOTE: 这里留空是为了 flat 的时候整洁
  } else {
    for (var i = 0; i < pool.length; i += 1) {
      var p = pool[i];

      if (from === p.id) {
        root = p;
      }
    }
  }

  if (root === null) {
    throw new TypeError('from 不在 pool 中');
  }

  root.level = level;
  root.children = fromPoolId(poolId, from, level + 1);
  delete pools[poolId];
  return root;
}

TreeNode.fromPool = fromPool;

module.exports = TreeNode;
