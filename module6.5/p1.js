var result = 80;
if (result < 0) {
  console.log("Failed");
} else if (result >= 0 && result < 40) {
  console.log("C");
} else if (result >= 40 && result < 60) {
  console.log("B");
} else if (result >= 60 && result < 70) {
  console.log("A-");
} else if (result >= 70 && result < 79) {
  console.log("A");
} else if (result >= 80 && result <= 100) {
  console.log("A+");
} else {
  console.log("Invalid number");
}