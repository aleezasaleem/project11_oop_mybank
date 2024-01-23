import inquirer from 'inquirer';

class BankAccount {
  private balance: number = 0;

  constructor(private accountNumber: string, private accountHolder: string) {}

  deposit(amount: number) {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited $${amount}`);
    } else {
      console.log('Invalid amount.');
    }
  }

  withdraw(amount: number) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrawn $${amount}`);
    } else {
      console.log('Invalid amount or insufficient balance.');
    }
  }

  getBalance() {
    console.log(`Account balance: $${this.balance}`);
  }
}

async function manageAccount() {
  console.log('Welcome to MyBank!\n');

  const accountInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'accountNumber',
      message: 'Enter your account number:',
    },
    {
      type: 'input',
      name: 'accountHolder',
      message: 'Enter your account holder name:',
    },
  ]);

  const bankAccount = new BankAccount(
    accountInput.accountNumber,
    accountInput.accountHolder
  );

  const actions = [
    'Deposit funds',
    'Withdraw funds',
    'View account balance',
    'Exit',
  ];

  const actionChoice = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedAction',
      message: 'Select an action:',
      choices: actions,
    },
  ]);

  switch (actionChoice.selectedAction) {
    case actions[0]:
      const depositInput = await inquirer.prompt([
        {
          type: 'input',
          name: 'amount',
          message: 'Enter the amount to deposit:',
          validate: (value) => parseFloat(value) >= 0 || 'Please enter a valid amount',
        },
      ]);
      bankAccount.deposit(parseFloat(depositInput.amount));
      break;
    case actions[1]:
      const withdrawInput = await inquirer.prompt([
        {
          type: 'input',
          name: 'amount',
          message: 'Enter the amount to withdraw:',
          validate: (value) =>
            parseFloat(value) >= 0 || 'Please enter a valid amount',
        },
      ]);
      bankAccount.withdraw(parseFloat(withdrawInput.amount));
      break;
    case actions[2]:
      bankAccount.getBalance();
      break;
    case actions[3]:
      console.log('Thank you for using MyBank. Goodbye!');
      return;
  }

  manageAccount();
}

manageAccount();