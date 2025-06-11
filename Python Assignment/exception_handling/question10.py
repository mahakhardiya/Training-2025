class LowBalanceError(Exception):
    pass

class AccountNotFoundError(Exception):
    pass

def withdraw(account, balance):
    if account != "123":
        raise AccountNotFoundError("Account not found.")
    if balance < 100:
        raise LowBalanceError("Balance too low to withdraw.")

try:
    withdraw("456", 50)
except AccountNotFoundError as e:
    print("Account Error:", e)
except LowBalanceError as e:
    print("Balance Error:", e)
