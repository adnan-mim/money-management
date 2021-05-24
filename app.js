// Selectors
let currentBalance = document.querySelector('.current-balance');
let income = document.querySelector('.income');
let expense = document.querySelector('.expense');
let historyUl = document.querySelector('.history ul');
let addTransaction = document.querySelector('.add-transaction-button');
let itemNameInput = document.querySelector('.item-name-input');
let itemAmountInput = document.querySelector('.item-amount-input');

// Dummy Transictions
let dummyTrans = [
  {
    id: 1,
    text: 'Sallery',
    amount: 1000,
  },
  {
    id: 2,
    text: 'Shirt',
    amount: -100,
  },
  {
    id: 3,
    text: 'T-Shirt',
    amount: -100,
  },
  {
    id: 4,
    text: 'Freelancing',
    amount: 500,
  },
];

// All Transictions
let transactions = dummyTrans;

// Get Value From User
function addTransactionFunc(e) {
  e.preventDefault();
  if (itemNameInput.value.trim() == '' || itemAmountInput.value.trim() == '') {
    alert('Please Fill Text and Amount Field');
  } else {
    let transaction = {
      id: randomId(),
      text: itemNameInput.value,
      amount: Number(itemAmountInput.value),
    };
    transactions.push(transaction);
    addToDom(transaction);
    updateBalance(transaction);
    itemNameInput.value = '';
    itemAmountInput.value = '';
  }
}

// Random id
function randomId() {
  return Math.floor(Math.random() * 1000000000000);
}

// Remove Transaction
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  console.log(transactions);
  init();
}

// Add History List to DOM
function addToDom(transaction) {
  let sign = transaction.amount < 0 ? '-' : '+';
  // Create History Item
  let historyItem = document.createElement('li');
  historyItem.classList.add(
    'history-item',
    'd-flex',
    'flex-wrap',
    'justify-content-between',
    'bg-white',
    'shadow-sm',
    'p-2',
    'my-3',
    'rounded'
  );
  historyItem.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  historyItem.innerHTML = `
        <span class="item-name p-2 text-dark">${transaction.text}</span>
        <span class="item-amount ms-auto p-2 text-dark">${
          sign + Number(Math.abs(transaction.amount)).toFixed(2)
        }</span>
        <span onclick="removeTransaction(
          ${transaction.id})" class="delete-history-item bg-danger p-2 rounded"
        ><img
          src="trash.svg"
          alt="trash"
          class="img-fluid text-white"
      /></span>`;
  historyUl.appendChild(historyItem);
}

// Update Balance
function updateBalance() {
  let amounts = transactions.map((transaction) => transaction.amount);
  let currentBalanceVal = amounts.reduce((acc, item) => acc + item, 0);
  let incomeBalance = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, item) => acc + item, 0);
  let expenseBalance = amounts
    .filter((amount) => amount < 0)
    .reduce((acc, item) => acc + item, 0);
  //  Udating Balance in DOM
  if (Math.abs(incomeBalance) < Math.abs(expenseBalance)) {
    currentBalance.innerHTML = '-$' + Math.abs(currentBalanceVal).toFixed(2);
  } else {
    currentBalance.innerHTML = '$' + Math.abs(currentBalanceVal).toFixed(2);
  }
  income.innerHTML = `$${Math.abs(incomeBalance).toFixed(2)}`;
  expense.innerHTML = `$${Math.abs(expenseBalance).toFixed(2)}`;
}

// Initialize
function init() {
  historyUl.innerHTML = '';
  transactions.forEach(addToDom);
  updateBalance();
}
init();

// Form Submit
addTransaction.addEventListener('click', addTransactionFunc);
