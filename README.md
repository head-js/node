# @head/node

# TreeNode

```
{ id: String, parent: String, label: String, level: Integer, order: Integer }
```

```javascript
const node = new TreeNode(id, parent, label, order);
const pool = [node1, node2, node3];
TreeNode node = TreeNode.fromPool(pool);
```