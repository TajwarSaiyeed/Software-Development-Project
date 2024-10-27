const monthlySavings = (AllPayments, livingCost) => {
  if (!Array.isArray(AllPayments) || typeof livingCost !== "number") {
    return "Invalid input";
  }

  let total = AllPayments.reduce((a, b) => a + b, 0);
  let tax = 0;
  AllPayments.forEach((tk) => {
    if (tk > 3000) tax += tk * 0.2;
  });

  let savings = total - tax - livingCost;

  if (savings < 0) return "earn more";
  else return savings;
};

const AllPayments = [1000, 2000, 3000, 4000, 5000];
const livingCost = 5000;

console.log(monthlySavings(AllPayments, livingCost));
