class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

  // submit budget method
  submitBudgetForm = () => {
    const value = this.budgetInput.value;
    if (value === "" || value < 0) {
      this.budgetFeedback.classList.add("showItem");
      this.budgetFeedback.innerHTML = `<p>Please do not Enter Negative Value or Keep it Empty <p/>`;
      setTimeout(() => {
        this.budgetFeedback.classList.remove("showItem");
      }, 2000);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = "";
      this.showBalance();
    }
  };

  // Show Balance
  showBalance = () => {
    var expense = this.totalExpense();
    const total = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = total;
    if (total < 0) {
      this.balance.classList.remove("showGreen", "showBlack");
      this.balance.classList.add("showRed");
    } else if (total > 0) {
      this.balance.classList.remove("showRed", "showBlack");
      this.balance.classList.add("showGreen");
    } else if (total === 0) {
      this.balance.classList.remove("showRed", "showGreen");
      this.balance.classList.add("showBlack");
    }
  };
  // Submit Expense Form
  submitExpenseForm = () => {
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;

    if (expenseValue === "" || amountValue === "" || amountValue < 0) {
      this.expenseFeedback.classList.add("showItem");
      this.expenseFeedback.innerHTML = `Values cannot be empty or Negative`;

      setTimeout(() => {
        this.expenseFeedback.classList.remove("showItem");
      }, 2000);
    } else {
      let amount = parseInt(amountValue);

      this.expenseInput.value = "";
      this.amountInput.value = "";

      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount
      };

      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();
    }
  };

  // Add Expense
  addExpense = expense => {
    const div = document.createElement("div");
    div.classList.add("expense");
    div.innerHTML = `
    <div class="expense-item d-flex justify-content-between align-items-baseline">

    <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
    <h5 class="expense-amount mb-0 list-item">$ ${expense.amount}</h5>

    <div class="expense-icons list-item">

     <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
      <i class="fas fa-edit"></i>
     </a>
     <a href="#" class="delete-icon" data-id="${expense.id}">
      <i class="fas fa-trash"></i>
     </a>
    </div>
   </div>
    `;
    this.expenseList.appendChild(div);
  };

  // Total Expense
  totalExpense = () => {
    let total = 0;
    if (this.itemList.length > 0) {
      this.itemList.forEach(item => {
        total += item.amount;
      });
    }
    this.expenseAmount.innerText = total;
    return total;
  };

  // Edit Expense
  editExpense = element => {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;

    // Removing from the DOM
    this.expenseList.removeChild(parent);

    // Remove From The Expense List
    let expense = this.itemList.filter(item => {
      return item.id === id;
    });

    let tempList = this.itemList.filter(item => {
      return item.id !== id;
    });

    this.itemList = tempList;
    this.showBalance();

    // Show value
    this.expenseInput.value = expense[0].title; // expense[0] because expense is an Array with only one filtered object.
    this.amountInput.value = expense[0].amount;
  };

  // Delete Expense
  deleteExpense = element => {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;

    // Removing from the DOM
    this.expenseList.removeChild(parent);

    let tempList = this.itemList.filter(item => {
      return item.id !== id;
    });

    this.itemList = tempList;
    this.showBalance();
  };
}

function eventListeners() {
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");

  // New Instance of UI
  const ui = new UI();

  // BubgetForm submit
  budgetForm.addEventListener("submit", event => {
    event.preventDefault();
    ui.submitBudgetForm();
  });
  // ExpenseForm submit
  expenseForm.addEventListener("submit", event => {
    event.preventDefault();
    ui.submitExpenseForm();
  });
  // BubgetForm click
  expenseList.addEventListener("click", event => {
    if (event.target.parentElement.classList.contains("edit-icon")) {
      ui.editExpense(event.target.parentElement);
    } else if (event.target.parentElement.classList.contains("delete-icon")) {
      ui.deleteExpense(event.target.parentElement);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  eventListeners();
});
