// import { getExpense } from "@/server/utils/expenses/getExpense";
// import { Expense } from "@/components/sections/expenses";

import ExpensesPage from './_components/expenses';
import ExpenseNotFound from './_components/not-found';

export default async function Expenses({
  searchParams: { expenseId },
}: {
  searchParams: {
    expenseId: string | undefined;
  };
}) {
  if (expenseId === undefined) return <ExpensesPage />;

  const id = Number(expenseId);

  if (Number.isNaN(id) || id <= 0) return <ExpenseNotFound />;

  //   const expense = await getExpense(id);

  //   if (!expense) return <ExpenseNotFound />;

  //   return <Expense expense={expense} />;
}
