import { todos as initialTodos } from './data.js';

const STORAGE_KEY = 'todos';

let currentFilter = 'all';
let currentPriority = null;

// DOM 요소 선택 헬퍼 함수
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// 기본 데이터 관련 함수
const getTodos = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const saveTodos = todos => localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
const getSelectedIds = () => [...$$('.todo-table__checkbox:checked')].map(cb => +cb.closest('tr').dataset.id);

// 필터링된 할 일 목록 반환
function getFilteredTodos() {
  return getTodos().filter(todo => {
    if (currentFilter === 'completed' && !todo.completed) return false;
    if (currentFilter === 'incomplete' && todo.completed) return false;
    if (currentPriority !== null && todo.priority !== currentPriority) return false;
    return true;
  });
}

function renderTodos() {
  const todos = getFilteredTodos();
  const todoList = $('#todo-list');
  
  // 빈 목록 처리
  todoList.innerHTML = todos.length ? '' : 
    '<tr><td colspan="4" class="empty-message">할 일이 없습니다. 새로운 할 일을 추가해보세요!!</td></tr>';
  
  todos.forEach(todo => {
    const row = document.createElement('tr');
    row.dataset.id = todo.id;
    row.draggable = true;
    if (todo.completed) row.classList.add('completed-row');
    
    row.innerHTML = `
      <td><input type="checkbox" class="todo-table__checkbox"></td>
      <td>${'🖤'.repeat(todo.priority)}</td>
      <td>${todo.completed ? 'O' : 'X'}</td>
      <td class="${todo.completed ? 'todo-table__completed' : ''}">${todo.title}</td>
    `;
    
    todoList.appendChild(row);
  });
  
  setupCheckboxes();
  setupDragAndDrop();
  updateUI();
}

// UI 상태 업데이트 함수들
function updateUI() {
  updateSelectAllCheckbox();
  updateButtonStates();
}

function setupCheckboxes() {
  $$('.todo-table__checkbox').forEach(cb => cb.addEventListener('change', updateUI));
  
  const selectAll = $('#select-all');
  if (selectAll) {
    selectAll.addEventListener('change', () => {
      $$('.todo-table__checkbox').forEach(cb => cb.checked = selectAll.checked);
      updateButtonStates();
    });
  }
}

function updateSelectAllCheckbox() {
  const selectAll = $('#select-all');
  if (!selectAll) return;
  
  const checkboxes = $$('.todo-table__checkbox');
  // 모든 체크박스가 선택되었는지 확인
  selectAll.checked = checkboxes.length > 0 && Array.from(checkboxes).every(cb => cb.checked);
}

function updateButtonStates() {
  const deleteBtn = $('#delete-btn'), completeBtn = $('#complete-btn');
  if (!deleteBtn || !completeBtn) return;
  
  const hasSelection = getSelectedIds().length > 0;
  deleteBtn.disabled = completeBtn.disabled = !hasSelection;
  deleteBtn.classList.toggle('todo-actions__btn--active', hasSelection);
  completeBtn.classList.toggle('todo-actions__btn--active', hasSelection);
}

function addTodo() {
  const title = $('#todo-input').value.trim();
  const priority = $('#priority-select').value ? +$('#priority-select').value : null;
  
  if (!title || !priority) {
    alert('할 일과 중요도를 모두 입력해주세요!');
    return;
  }
  
  const todos = getTodos();
  todos.push({id: Date.now(), title, completed: false, priority});
  
  saveTodos(todos);
  $('#todo-input').value = '';
  $('#priority-select').selectedIndex = 0;
  renderTodos();
}

// 필터 초기화 함수들
function resetPriorityFilter() {
  currentPriority = null;
  const btn = $('#priority-dropdown-btn');
  if (btn) {
    btn.classList.remove('todo-filter__btn--active');
    btn.innerHTML = '중요도 <i class="fa-solid fa-caret-down"></i>';
  }
}

function resetCompletionFilter() {
  currentFilter = 'all';
  $$('.todo-filter__btn[data-filter]').forEach(btn => btn.classList.remove('todo-filter__btn--active'));
}

// 드래그 앤 드롭 설정
function setupDragAndDrop() {
  let draggedItem = null;
  
  $$('#todo-list tr').forEach(row => {
    if (row.querySelector('td[colspan]')) return;
    
    // 드래그 시작
    row.addEventListener('dragstart', () => {
      draggedItem = row;
      setTimeout(() => row.classList.add('dragging'), 0);
    });
    
    row.addEventListener('dragend', () => {
      row.classList.remove('dragging');
      saveNewOrder();
    });
    
    row.addEventListener('dragover', e => {
      e.preventDefault();
      row.classList.add('drag-over');
    });
    
    row.addEventListener('dragleave', () => row.classList.remove('drag-over'));
    
    // 드롭 -> 항목 순서 변경
    row.addEventListener('drop', e => {
      e.preventDefault();
      row.classList.remove('drag-over');
      
      if (!draggedItem || draggedItem === row) return;
      
      const allRows = [...$('#todo-list').querySelectorAll('tr')];
      const fromIdx = allRows.indexOf(draggedItem);
      const toIdx = allRows.indexOf(row);
      
      // 순서에 따라 적절한 위치에 삽입
      row.parentNode.insertBefore(draggedItem, fromIdx < toIdx ? row.nextSibling : row);
    });
  });
}

// 재정렬된 할 일 저장
function saveNewOrder() {
  const todos = getTodos();
  const orderedIds = [...$$('#todo-list tr')]
    .filter(row => !row.querySelector('td[colspan]'))
    .map(row => +row.dataset.id);
  
  if (!orderedIds.length) return;
  
  const orderedTodos = [];
  
  // 화면에 표시된 할 일
  orderedIds.forEach(id => {
    const todo = todos.find(t => t.id === id);
    if (todo) orderedTodos.push(todo);
  });
  
  // 화면에 표시되지 않은 할 일도 추가
  todos.forEach(todo => {
    if (!orderedIds.includes(todo.id)) orderedTodos.push(todo);
  });
  
  saveTodos(orderedTodos);
}

// 중요도 드롭다운 설정
function setupPriorityDropdown() {
  const btn = $('#priority-dropdown-btn');
  const menu = $('#priority-dropdown-menu');
  
  if (!btn || !menu) return;
  
  btn.addEventListener('click', () => menu.classList.toggle('show'));
  
  $$('.todo-filter__dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      const priority = +item.dataset.priority;
      
      resetCompletionFilter();
      
      // 같은 중요도를 다시 선택하면 필터 해제
      if (currentPriority === priority) {
        currentPriority = null;
        btn.classList.remove('todo-filter__btn--active');
        btn.innerHTML = '중요도 <i class="fa-solid fa-caret-down"></i>';
      } else {
        currentPriority = priority;
        btn.classList.add('todo-filter__btn--active');
        btn.innerHTML = `중요도 ${priority} <i class="fa-solid fa-caret-down"></i>`;
      }
      
      menu.classList.remove('show');
      renderTodos();
    });
  });
  
  // 외부 클릭 시 드롭다운 닫기
  document.addEventListener('click', e => {
    if (!e.target.closest('.todo-filter__dropdown-container') && menu.classList.contains('show')) {
      menu.classList.remove('show');
    }
  });
}

// 초기화 및 이벤트 설정
function init() {
  // 초기 데이터 설정
  if (!localStorage.getItem(STORAGE_KEY)) saveTodos(initialTodos);
  
  // 필터 버튼 이벤트
  $$('.todo-filter__btn[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      resetPriorityFilter();
      $$('.todo-filter__btn[data-filter]').forEach(b => b.classList.remove('todo-filter__btn--active'));
      
      // 같은 필터를 다시 클릭하면 필터 해제
      if (currentFilter === btn.dataset.filter) {
        currentFilter = 'all';
      } else {
        btn.classList.add('todo-filter__btn--active');
        currentFilter = btn.dataset.filter;
      }
      
      renderTodos();
    });
  });
  
  // 기본 이벤트 설정
  setupPriorityDropdown();
  $('#add-btn').addEventListener('click', addTodo);
  $('#todo-input').addEventListener('keypress', e => e.key === 'Enter' && addTodo());
  
  // 삭제 버튼 이벤트
  $('#delete-btn').addEventListener('click', () => {
    const ids = getSelectedIds();
    if (ids.length) {
      saveTodos(getTodos().filter(todo => !ids.includes(todo.id)));
      renderTodos();
    }
  });
  
  // 완료 버튼 이벤트
  $('#complete-btn').addEventListener('click', () => {
    const ids = getSelectedIds();
    if (!ids.length) return;
    
    const todos = getTodos();
    // 이미 완료된 항목이 있는지 확인
    if (todos.some(todo => ids.includes(todo.id) && todo.completed)) {
      $('#already-completed-modal').style.display = 'flex';
      return;
    }
    
    saveTodos(todos.map(todo => ids.includes(todo.id) ? {...todo, completed: true} : todo));
    renderTodos();
  });
  
  // 모달 닫기 이벤트
  $('#close-modal-btn')?.addEventListener('click', () => {
    $('#already-completed-modal').style.display = 'none';
    $$('.todo-table__checkbox').forEach(cb => cb.checked = false);
    $('#select-all').checked = false;
    updateButtonStates();
  });
  
  // 초기 버튼 상태 및 렌더링
  $('#delete-btn').disabled = $('#complete-btn').disabled = true;
  renderTodos();
}

document.addEventListener('DOMContentLoaded', init);