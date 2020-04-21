const TreeNode = require('./index');


describe('constructor', () => {
  test('@param {}', () => {
    const node = new TreeNode();
    expect(node.id).toBeNull();
  });

  test('@param { id }', () => {
    expect(() => {
      const node = new TreeNode('id');
    }).toThrow(TypeError);
  });

  test('@param { id, parent }', () => {
    expect(() => {
      const node = new TreeNode('id', 'parent');
    }).toThrow(TypeError);
  });

  test('@param { id, parent, label }', () => {
    const node = new TreeNode('id', 'parent', 'label');
    expect(node.label).toEqual('label');
    expect(node.order).toEqual(1);
  });

  test('@param { id, parent, label, order }', () => {
    const node = new TreeNode('id', 'parent', 'label', 4);
    expect(node.order).toEqual(4);
  });
});
