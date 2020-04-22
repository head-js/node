import rnd from 'vanilla.js/random/uuid4';
import TreeNode from './TreeNode';


const pools = {};


function fromPoolId(poolId, parent, level) {
  const pool = pools[poolId];

  const nodes = [];
  const remains = [];
  for (let i = 0; i < pool.length; i += 1) {
    const n = pool[i];
    if (n.parent === parent) {
      n.level = level;
      nodes.push(n);
    } else {
      remains.push(n);
    }
  }

  nodes.sort((a, b) => {
    if (a.order === b.order) {
      return a.label.localeCompare(b.label);
    } else {
      return a.order < b.order ? -1 : 1;
    }
  });

  pools[poolId] = remains;

  for (let i = 0; i < nodes.length; i += 1) {
    const n = nodes[i];
    n.children = fromPoolId(poolId, n.id, level + 1);
  }

  return nodes;
}

/**
 * @param { pool: List<TreeNode>, from: String, level: Integer }
 * @param { pool: List<TreeNode>, from='$', level=0 } ** sugar
 */
export default function fromPool(pool, from, level) {
  /* eslint-disable no-param-reassign */
  if (level !== 0 && !level) {
    level = 0;
  }
  if (!from) {
    from = '$';
  }
  /* eslint-enable no-param-reassign */

  const poolId = rnd();
  pools[poolId] = pool;

  let root = null;
  if ('$' === from) {
    // NOTE: 约定使用 $ 这个命名
    root = new TreeNode('', '', '', 1); // NOTE: 这里留空是为了 flat 的时候整洁
  } else {
    for (let i = 0; i < pool.length; i += 1) {
      const p = pool[i];
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
