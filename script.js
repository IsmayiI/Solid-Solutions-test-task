document.addEventListener('DOMContentLoaded', function () {


   const createRootBtn = document.getElementById('createRoot')
   const tree = document.getElementById('tree')

   function createBtn(classes, elem, node) {
      const btn = document.createElement('button');
      btn.className = classes;
      btn.innerHTML = elem;
      node.append(btn);
   }

   function createNode(parent, id) {
      const node = document.createElement('div');
      node.className = 'node active';
      node.id = id;

      createBtn('btn btn-secondary toggle-btn d-none', '&#8600;', node)
      createBtn('btn btn-success mr-2 add-node', '+', node)
      createBtn('btn btn-danger mr-2 remove-node', '-', node)

      const text = document.createElement('span');
      text.className = 'node-text';
      text.textContent = 'Node ' + id;
      node.append(text);

      const line = document.createElement('div');
      line.className = 'line';
      parent.append(line);

      parent.append(node);

   }


   createRootBtn.addEventListener('click', function () {
      createNode(tree, 1);
      updateLocalStorage();
   });

   tree.addEventListener('click', function (e) {
      const target = e.target;
      const parentNode = target.parentNode

      if (parentNode.classList.contains('active') && target.classList.contains('add-node')) {
         const parentId = parentNode.id;

         const newId = parentId + (parentNode.querySelectorAll('.node').length + 1);
         const childNode = parentNode.querySelector('.toggle-btn');
         childNode.classList.remove('d-none');

         createNode(parentNode, newId);
         updateLocalStorage();
      }

      if (target.classList.contains('remove-node')) {
         parentNode.remove();
         updateLocalStorage();
      }

      if (target.classList.contains('toggle-btn')) {
         parentNode.classList.toggle('active');

         const childNodes = parentNode.querySelectorAll('.node');
         childNodes.forEach(node => {
            node.classList.toggle('d-none');
         });
         target.innerHTML = parentNode.classList.contains('active') ? '&#8600;' : '&#8594;';
      }
   });

   function updateLocalStorage() {
      const treeData = tree.innerHTML;
      localStorage.setItem('treeData', treeData);
   }

   const savedTreeData = localStorage.getItem('treeData');
   if (savedTreeData) {
      tree.innerHTML = savedTreeData;
   }
});