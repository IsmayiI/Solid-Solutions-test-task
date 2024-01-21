document.addEventListener('DOMContentLoaded', function () {


   const createRootBtn = document.getElementById('createRoot')
   const tree = document.getElementById('tree')

   function createBtn(classes, elem, node) {
      const btn = document.createElement('button');
      btn.className = classes;
      btn.innerHTML = elem;
      node.append(btn);
   }

   function createNode(parent) {
      const node = document.createElement('div');
      node.className = 'node active';

      createBtn('btn btn-secondary toggle-btn d-none', '&#8600;', node)
      createBtn('btn btn-success mr-2 add-node', '+', node)
      createBtn('btn btn-danger mr-2 remove-node', '-', node)

      const text = document.createElement('span');
      text.className = 'node-text';
      text.textContent = generateRandomString();
      node.append(text);

      const line = document.createElement('div');
      line.className = 'line';
      parent.append(line);

      parent.append(node);

   }


   createRootBtn.addEventListener('click', function () {
      createNode(tree);
      updateLocalStorage();
   });

   tree.addEventListener('click', function (e) {
      const target = e.target;
      const parentNode = target.parentNode

      if (parentNode.classList.contains('active') && target.classList.contains('add-node')) {
         const childNode = parentNode.querySelector('.toggle-btn');
         childNode.classList.remove('d-none');

         createNode(parentNode);
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


   function generateRandomString() {
      const alphabet = 'abcdefghijklmnopqrstuvwxyz';
      let randomString = '';

      for (let i = 0; i < 3; i++) {
         const randomIndex = Math.floor(Math.random() * alphabet.length);
         randomString += alphabet.charAt(randomIndex);
      }

      return randomString;
   }
});