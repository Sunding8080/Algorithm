/**
输入某二叉树的前序遍历和中序遍历的结果。
假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
1 构建二叉树
2 返回后序遍历数组

*解法:
a 根据先序遍历数组，获取根节点
b 根据中序遍历数组和根节点，获取左子树中序遍历数组、右子树中序遍历数组，
c 根据左子树的中序数组，从先序遍历数组拆分左子树的先序数组，
d 根据右子树的中序数组，从先序遍历数组拆分右子树的先序数组，
依次递归上序步骤，建立树状关系

**/

class TreeNode {
  constructor(value) {
    this.value = value
    this.leftNode = null
    this.rightNode = null
  }

  setLeftNode(node) {
    this.leftNode = node
  }

  setRightNode(node) {
    this.rightNode = node
  }
}

const getTree = (pre = [], mid = []) => {

  // 根节点在中序遍历数组的下标
  let index = mid.findIndex(item => item === pre[0])

  if (index > -1) {
    // 当前根节点
    let node = new TreeNode(pre[0]);

    // 左中序遍历数组
    const leftMid = mid.slice(0, index);
    // 右中序遍历数组
    const rightMid = mid.slice(index + 1);
    // 左先序遍历数组，并且与左中序遍历数组一样长
    const leftPre = pre.slice(1, leftMid.length + 1);
    // 右先序遍历数组，并且与右中序遍历数组一样长
    const rightPre = pre.slice(leftMid.length + 1);

    if (leftMid.length) {
      node.setLeftNode(getTree(leftPre, leftMid));
    }

    if (rightMid.length) {
      node.setRightNode(getTree(rightPre, rightMid));
    }

    return node
  } else {
    return null
  }
}

const getTraversalTree = (nodes = [], type = '', result = []) => {

  const node = nodes[nodes.length - 1];
  switch (type) {
    case 'pre': {
      result.push(node.value);
      if (node.leftNode) {
        nodes.push(node.leftNode);
        getTraversalTree(nodes, type, result);
      }
      if (node.rightNode) {
        nodes.push(node.rightNode);
        getTraversalTree(nodes, type, result);
      }
      break;
    }
    case 'mid': {
      if (node.leftNode) {
        nodes.push(node.leftNode);
        getTraversalTree(nodes, type, result);
      }
      result.push(node.value);
      if (node.rightNode) {
        nodes.push(node.rightNode);
        getTraversalTree(nodes, type, result);
      }
      break;
    }
    case 'later': {
      if (node.leftNode) {
        nodes.push(node.leftNode);
        getTraversalTree(nodes, type, result);
      }
      if (node.rightNode) {
        nodes.push(node.rightNode);
        getTraversalTree(nodes, type, result);
      }
      result.push(node.value);
      break;
    }
  }

  nodes.pop();

  if (!nodes.length) {
    return result;
  }
}

const pre = [1, 2, 4, 5, 8, 3, 6, 9, 7, 10];
const mid = [4, 2, 5, 8, 1, 9, 6, 3, 7, 10];

const tree = getTree(pre, mid);
console.log(tree);

console.log(getTraversalTree([tree], 'later', []))