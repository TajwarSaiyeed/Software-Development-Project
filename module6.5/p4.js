const year = 2024;

if (year % 4 === 0 && year % 100 !== 0) {
  console.log("Leap year");
} else if (year % 400 === 0) {
  console.log("Leap year");
} else {
  console.log("Not a leap year");
}
