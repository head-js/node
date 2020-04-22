import TreeNode from './TreeNode';
import fromPool from './fromPool';


/**
 * @param { pool: List<Org>, ns: String } ** 暂时不支持指定 level
 */
export default function fromNs(orgs, ns) {
  if (!ns) {
    throw new TypeError('`ns` required');
  }

  const pool = orgs.map(({ n: id, parent, label, order }) => ({ id, parent, label, order }));

  const root = new TreeNode(ns, '$', '$');
  pool.unshift(root);

  return fromPool(pool).children[0];
}
