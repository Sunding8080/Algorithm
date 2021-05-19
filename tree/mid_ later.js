/**
输入某二叉树的后序遍历和中序遍历的结果， 请重建出该二叉树。 假设输入的后序遍历和中序遍历的结果中都不含重复的数字。

* 解法:
a 根据后序遍历数组， 获取根节点
b 根据中序遍历数组和根节点， 获取左子树中序遍历数组、 右子树中序遍历数组，
c 根据左子树的中序数组， 从后序遍历数组拆分左子树的后序数组，
d 根据右子树的中序数组， 从后序遍历数组拆分右子树的后序数组，
依次递归上序步骤， 建立树状关系

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

const getTree = (later = [], mid = []) => {
  // 根节点在中序遍历数组的下标
  let index = mid.findIndex(item => item === later[later.length - 1]);

  if (index > -1) {
    // 当前根节点
    let node = new TreeNode(later[later.length - 1]);

    // 左中序遍历数组
    const leftMid = mid.slice(0, index);
    // 右中序遍历数组
    const rightMid = mid.slice(index + 1);
    // 左后序遍历数组，并且与左中序遍历数组一样长
    const leftLater = later.slice(0, leftMid.length);
    // 右后序遍历数组，并且与右中序遍历数组一样长
    const rightLater = later.slice(leftMid.length, later.length - 1);

    if (leftMid.length) {
      node.setLeftNode(getTree(leftLater, leftMid));
    }

    if (rightMid.length) {
      node.setRightNode(getTree(rightLater, rightMid));
    }

    return node;
  } else {
    return null;
  }
}

const later = [4, 8, 5, 2, 9, 6, 10, 7, 3, 1];
const mid = [4, 2, 5, 8, 1, 9, 6, 3, 7, 10];

const tree = getTree(later, mid);
console.log(tree);