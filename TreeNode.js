'use strict';

/**
 * @param { }
 * @param { id: String, parent: String, label: String }
 * @param { id: String, parent: String, label: String, order: Integer >= 1 }
 */
function TreeNode(id, parent, label, order) {
  /* eslint-disable no-param-reassign */
  if (!order) {
    order = 1;
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
  this.order = order;
  return this;
}

var TreeNode_1 = TreeNode;

module.exports = TreeNode_1;
