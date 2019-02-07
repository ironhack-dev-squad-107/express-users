const bcrypt = require("bcrypt");

// bcrypt.hash() or bcrypt.hashSync()
// -----------------------------------------------------------------------------
// ENCRYPT or HASH a string
// (returns the encrypted password)
// 1. Encrypt password for sign-up feature
// 2. Encrypt password for seed file that inserts users
// 3. Encrypt password for update password feature
const encryptedCoucou = bcrypt.hashSync("coucou", 10);
console.log(encryptedCoucou);

const encryptedEmpty = bcrypt.hashSync("", 10);
console.log(encryptedEmpty);

const encryptedLong = bcrypt.hashSync(
  "RV^zBsg4}wUHtq*azMM$dM362DDJFuBA?73#H7B^no",
  10
);
console.log(encryptedLong);

// bcrypt.compare() or bcrypt.compareSync()
// -----------------------------------------------------------------------------
// COMPARE a string to an ENCRYPTED string to see if they match
// (returns true or false)
// 1. Compare strings for log-in feature
// 2. Compare strings for password confirmation
console.log(bcrypt.compareSync("coucou", encryptedCoucou)); // true
console.log(bcrypt.compareSync("CouCou", encryptedCoucou)); // false
console.log(bcrypt.compareSync("password", encryptedCoucou)); // false
