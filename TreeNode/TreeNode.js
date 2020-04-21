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


export default TreeNode;
