var friends = ["rahim", "karim", "abdul", "sadsd", "heroAlom"];

let lar = friends[0];
for (let i = 0; i < friends.length; i++)
  if (friends[i].length > lar.length) lar = friends[i];

console.log(lar);
