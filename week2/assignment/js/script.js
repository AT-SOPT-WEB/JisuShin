import { todos as initialTodos } from './data.js';

// 상수 정의
const TODO_STORAGE_KEY = 'todos';
const FILTER_TYPES = {
  ALL: 'all',
  COMPLETED: 'completed',
  INCOMPLETE: 'incomplete'
};

// 현재 필터 상태
let currentFilter = FILTER_TYPES.ALL;
let currentPriority = null;

// ----- 로컬 스토리지 관련 함수 -----
function getTodos() {
  return JSON.parse(localStorage.getItem(TODO_STORAGE_KEY)) || [];
}

function saveTodos(todos) {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}

// ----- 렌더링 관련 함수 -----
function renderTodoTable() {
  const todos = getFilteredTodos();
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';
  
  // 데이터가 없는 경우 메시지 표시
  if (todos.length === 0) {
    todoList.innerHTML = '<tr><td colspan="4" class="empty-message">할 일이 없습니다. 새로운 할 일을 추가해보세요!</td></tr>';
    updateSelectAllCheckbox();
    return;
  }
  
  todos.forEach(todo => {
    const row = document.createElement('tr');
    row.dataset.id = todo.id;
    row.draggable = true;
    
    row.innerHTML = `
      <td><input type="checkbox" class="todo-table__checkbox"></td>
      <td>${'⭐'.repeat(todo.priority)}</td>
      <td>${todo.completed ? '✅' : '❌'}</td>
      <td class="${todo.completed ? 'todo-table__completed' : ''}">${todo.title}</td>
    `;
    
    todoList.appendChild(row);
  });
  
  setupCheckboxListeners();
  setupDragAndDrop();
  updateSelectAllCheckbox();
}

// 필터링된 할 일 목록 반환
function getFilteredTodos() {
  const todos = getTodos();
  
  return todos.filter(todo => {
    if (currentFilter === FILTER_TYPES.COMPLETED && !todo.completed) return false;
    if (currentFilter === FILTER_TYPES.INCOMPLETE && todo.completed) return false;
    if (currentPriority !== null && todo.priority !== currentPriority) return false;
    return true;
  });
}

// ----- 이벤트 핸들러 함수 -----
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.todo-filter__btn');
  const priorityFilter = document.getElementById('priority-filter');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('todo-filter__btn--active'));
      button.classList.add('todo-filter__btn--active');
      
      currentFilter = button.dataset.filter;
      currentPriority = null;
      
      if (priorityFilter) priorityFilter.selectedIndex = 0;
      renderTodoTable();
    });
  });
  
  if (priorityFilter) {
    priorityFilter.addEventListener('change', () => {
      currentPriority = priorityFilter.value ? parseInt(priorityFilter.value) : null;
      currentFilter = FILTER_TYPES.ALL;
      
      const allFilterBtn = document.querySelector('.todo-filter__btn[data-filter="all"]');
      filterButtons.forEach(btn => btn.classList.remove('todo-filter__btn--active'));
      if (allFilterBtn) allFilterBtn.classList.add('todo-filter__btn--active');
      
      renderTodoTable();
    });
  }
}

function setupAddTodoForm() {
  const todoInput = document.getElementById('todo-input');
  const prioritySelect = document.getElementById('priority-select');
  const addButton = document.getElementById('add-btn');
  
  addButton.addEventListener('click', () => {
    const title = todoInput.value.trim();
    const priority = prioritySelect.value ? parseInt(prioritySelect.value) : null;
    
    if (!title || !priority) {
      alert('할 일과 중요도를 모두 입력해주세요 !');
      return;
    }
    
    const todos = getTodos();
    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title,
      completed: false,
      priority
    };
    
    todos.push(newTodo);
    saveTodos(todos);
    
    todoInput.value = '';
    prioritySelect.selectedIndex = 0;
    renderTodoTable();
  });
}

// 체크박스 이벤트 설정
function setupCheckboxListeners() {
  const checkboxes = document.querySelectorAll('.todo-table__checkbox');
  const selectAllCheckbox = document.getElementById('select-all');
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      updateActionButtonsState();
      updateSelectAllCheckbox();
    });
  });
  
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', () => {
      const isChecked = selectAllCheckbox.checked;
      checkboxes.forEach(checkbox => checkbox.checked = isChecked);
      updateActionButtonsState();
    });
  }
}

// 전체 체크박스 상태 업데이트
function updateSelectAllCheckbox() {
  const selectAllCheckbox = document.getElementById('select-all');
  if (!selectAllCheckbox) return;
  
  const checkboxes = document.querySelectorAll('.todo-table__checkbox');
  if (checkboxes.length === 0) {
    selectAllCheckbox.checked = false;
    return;
  }
  
  const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
  selectAllCheckbox.checked = checkedCount === checkboxes.length && checkedCount > 0;
}

// 삭제/완료 버튼 상태 업데이트
function updateActionButtonsState() {
  const selectedIds = getSelectedTodoIds();
  const deleteBtn = document.getElementById('delete-btn');
  const completeBtn = document.getElementById('complete-btn');
  
  if (!deleteBtn || !completeBtn) return;
  
  const hasSelection = selectedIds.length > 0;
  deleteBtn.disabled = !hasSelection;
  completeBtn.disabled = !hasSelection;
  
  deleteBtn.classList.toggle('todo-actions__btn--active', hasSelection);
  completeBtn.classList.toggle('todo-actions__btn--active', hasSelection);
}

// 선택된 할 일 ID 가져오기
function getSelectedTodoIds() {
  const selectedCheckboxes = document.querySelectorAll('.todo-table__checkbox:checked');
  return Array.from(selectedCheckboxes).map(checkbox => 
    parseInt(checkbox.closest('tr').dataset.id)
  );
}

// 삭제/완료 버튼 설정
function setupActionButtons() {
  const deleteBtn = document.getElementById('delete-btn');
  const completeBtn = document.getElementById('complete-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      const selectedIds = getSelectedTodoIds();
      if (selectedIds.length === 0) return;
      
      const todos = getTodos().filter(todo => !selectedIds.includes(todo.id));
      saveTodos(todos);
      renderTodoTable();
      updateActionButtonsState();
    });
  }
  
  if (completeBtn) {
    completeBtn.addEventListener('click', () => {
      const selectedIds = getSelectedTodoIds();
      if (selectedIds.length === 0) return;
      
      const todos = getTodos();
      const hasCompleted = todos.some(todo => 
        selectedIds.includes(todo.id) && todo.completed
      );
      
      if (hasCompleted) {
        showModal();
        return;
      }
      
      const updatedTodos = todos.map(todo => 
        selectedIds.includes(todo.id) ? { ...todo, completed: true } : todo
      );
      
      saveTodos(updatedTodos);
      renderTodoTable();
      updateActionButtonsState();
    });
  }
  
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', hideModal);
  }
  
  // 초기 상태 설정
  if (deleteBtn) deleteBtn.disabled = true;
  if (completeBtn) completeBtn.disabled = true;
}

// 모달 관련 함수
function showModal() {
  const modal = document.getElementById('already-completed-modal');
  if (modal) modal.style.display = 'flex';
}

function hideModal() {
  const modal = document.getElementById('already-completed-modal');
  if (modal) {
    modal.style.display = 'none';
    uncheckAllTodos();
  }
}

function uncheckAllTodos() {
  document.querySelectorAll('.todo-table__checkbox').forEach(cb => cb.checked = false);
  const selectAllCheckbox = document.getElementById('select-all');
  if (selectAllCheckbox) selectAllCheckbox.checked = false;
  updateActionButtonsState();
}

// ----- 드래그 앤 드롭 관련 함수 -----
function setupDragAndDrop() {
  const rows = document.querySelectorAll('#todo-list tr');
  let draggedItem = null;
  
  rows.forEach(row => {
    if (row.querySelector('td[colspan]')) return; // 빈 메시지 행은 제외
    
    row.addEventListener('dragstart', () => {
      draggedItem = row;
      setTimeout(() => row.classList.add('dragging'), 0);
    });
    
    row.addEventListener('dragend', () => {
      row.classList.remove('dragging');
      saveReorderedTodos();
    });
    
    row.addEventListener('dragover', e => {
      e.preventDefault();
      row.classList.add('drag-over');
    });
    
    row.addEventListener('dragleave', () => {
      row.classList.remove('drag-over');
    });
    
    row.addEventListener('drop', e => {
      e.preventDefault();
      row.classList.remove('drag-over');
      
      if (!draggedItem || draggedItem === row) return;
      
      const todoList = document.getElementById('todo-list');
      const allRows = Array.from(todoList.querySelectorAll('tr'));
      const draggedIndex = allRows.indexOf(draggedItem);
      const targetIndex = allRows.indexOf(row);
      
      if (draggedIndex < targetIndex) {
        row.parentNode.insertBefore(draggedItem, row.nextSibling);
      } else {
        row.parentNode.insertBefore(draggedItem, row);
      }
    });
  });
}

// 드래그 앤 드롭 후 새 순서 저장
function saveReorderedTodos() {
  const todos = getTodos();
  const rows = document.querySelectorAll('#todo-list tr');
  
  if (rows.length === 1 && rows[0].querySelector('td[colspan]')) return;
  
  const orderedIds = Array.from(rows)
    .filter(row => !row.querySelector('td[colspan]'))
    .map(row => parseInt(row.dataset.id));
  
  // 새 순서로 정렬된 할 일 배열 생성
  const orderedTodos = [];
  
  orderedIds.forEach((id, index) => {
    const todo = todos.find(t => t.id === id);
    if (todo) orderedTodos.push({ ...todo, order: index });
  });
  
  // 화면에 표시되지 않은 할 일은 순서 유지
  todos.forEach(todo => {
    if (!orderedIds.includes(todo.id)) orderedTodos.push(todo);
  });
  
  saveTodos(orderedTodos);
}

// ----- 초기화 함수 -----
document.addEventListener('DOMContentLoaded', () => {
  // localStorage에 데이터가 없을 때만 초기화
  if (!localStorage.getItem(TODO_STORAGE_KEY)) {
    saveTodos(initialTodos.map((todo, index) => ({ ...todo, order: index })));
  }
  
  setupFilterButtons();
  setupAddTodoForm();
  setupActionButtons();
  renderTodoTable();
});