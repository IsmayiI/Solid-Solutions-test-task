document.addEventListener('DOMContentLoaded', function () {

   // переменные

   const createRootBtn = document.getElementById('createRoot')
   const tree = document.getElementById('tree')

   // функция по созданию кнопки

   function createBtn(classes, elem, node) {
      const btn = document.createElement('button');
      btn.className = classes;
      btn.innerHTML = elem;
      node.append(btn);
   }

   // функция по созданию узла

   function createNode(parent) {

      // создание узла
      const node = document.createElement('div');
      node.className = 'node active';

      // Создание кнопок
      createBtn('btn btn-secondary toggle-btn d-none', '&#8600;', node)
      createBtn('btn btn-success mr-2 add-node', '+', node)
      createBtn('btn btn-danger mr-2 remove-node', '-', node)

      // Создание текстового элемента
      const text = document.createElement('span');
      text.className = 'node-text';
      text.textContent = generateRandomString();
      node.append(text);

      // Создание линии вложенности
      const line = document.createElement('div');
      line.className = 'line';
      parent.append(line);

      // Добавление узла к родительскому элементу
      parent.append(node);

   }

   // работа с кнопкой "Create Root"

   createRootBtn.addEventListener('click', function () {
      createNode(tree);
      updateLocalStorage();
   });

   // работа с деревом узлов

   tree.addEventListener('click', function (e) {
      const target = e.target;
      const parentNode = target.parentNode

      // работа при клике на "добавить"
      if (parentNode.classList.contains('active') && target.classList.contains('add-node')) {
         const toggleBtn = parentNode.querySelector('.toggle-btn');
         toggleBtn.classList.remove('d-none');

         createNode(parentNode);
         updateLocalStorage();
      }

      // работа при клике на "удалить"
      if (target.classList.contains('remove-node')) {
         const childNodes = parentNode.parentNode.querySelectorAll('.node')
         const toggleBtn = parentNode.parentNode.querySelector('.toggle-btn');
         if (childNodes.length <= 1) {
            toggleBtn.classList.add('d-none');
         }
         parentNode.remove();
         updateLocalStorage();
      }

      // работа при клике на "свернуть"
      if (target.classList.contains('toggle-btn')) {
         parentNode.classList.toggle('active');

         const childNodes = parentNode.querySelectorAll('.node');
         childNodes.forEach(node => {
            node.classList.toggle('d-none');
         });
         target.innerHTML = parentNode.classList.contains('active') ? '&#8600;' : '&#8594;';
      }
   });

   // работа с локальным хранилищем

   function updateLocalStorage() {
      const treeData = tree.innerHTML;
      localStorage.setItem('treeData', treeData);
   }

   const savedTreeData = localStorage.getItem('treeData');
   if (savedTreeData) {
      tree.innerHTML = savedTreeData;
   }


   // функция по созданию случайной строки из трёх букв

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