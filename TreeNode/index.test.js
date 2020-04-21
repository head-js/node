import TreeNode from './index';


describe('constructor', () => {
  test('@param { }', () => {
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
    expect(node.level).toEqual(1);
    expect(node.order).toEqual(1);
  });

  test('@param { id, parent, label, order }', () => {
    const node = new TreeNode('id', 'parent', 'label', 2);
    expect(node.label).toEqual('label');
    expect(node.level).toEqual(1);
    expect(node.order).toEqual(2);
  });

  test('@param { id, parent, label, level, order }', () => {
    const node = new TreeNode('id', 'parent', 'label', 2, 4);
    expect(node.level).toEqual(2);
    expect(node.order).toEqual(4);
  });
});


describe('TreeNode.fromPool', () => {
  let pool = [];

  beforeEach(() => {
    // root
    //   -- A
    //      -- D
    //          -- F
    //          -- E
    //      -- B
    //          -- C
    const a = new TreeNode('a', 'root', 'A', 1);
    const b = new TreeNode('b', 'a', 'B', 4);
    const c = new TreeNode('c', 'b', 'C', 3);
    const d = new TreeNode('d', 'a', 'D', 2);
    const e = new TreeNode('e', 'd', '戊', 5);
    const f = new TreeNode('f', 'd', '己', 5);

    pool = [a, b, c, d, e, f];
  });

  afterEach(() => {
    pool = [];
  });

  test('fromPool(pool, root, level)', () => {
    const tree = TreeNode.fromPool(pool, 'root', 0);
    expect(tree.children.length).toEqual(1);
    expect(tree.children[0].children[1].id).toEqual('b'); // sort by order
    expect(tree.children[0].children[0].children[0].id).toEqual('f'); // sort by label Chinese
  });

  test('fromPool(pool)', () => {
    const tree = TreeNode.fromPool(pool);
    expect(tree.children.length).toEqual(1);
    expect(tree.children[0].children[0].id).toEqual('d');
  });

  test('fromPool(pool, ns)', () => {
    const tree = TreeNode.fromPool(pool, 'a');
    expect(tree.children.length).toEqual(2);
    expect(tree.children[0].id).toEqual('d');
  });
});
