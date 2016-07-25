/*
The sequence of triangle numbers is generated by adding the natural numbers. So the 7th triangle number would be 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28. The first ten terms would be:

1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...

Let us list the factors of the first seven triangle numbers:

     1: 1
     3: 1,3
     6: 1,2,3,6
    10: 1,2,5,10
    15: 1,3,5,15
    21: 1,3,7,21
    28: 1,2,4,7,14,28

We can see that 28 is the first triangle number to have over five divisors.

What is the value of the first triangle number to have over five hundred divisors?

 */

var highlyDivisible = (numberOfDivisors) => {
  var number = 0;
  var i = 1;
  var primes = findPrimeN(500);
  while(true){
    number += i;
    var divisors = getDivisors(number, primes);
    var powers = findPowersOfDivisors(number, divisors);
    var numOfDivisors = totalNumberOfDivisors(powers);
    if(numOfDivisors > numberOfDivisors){
      return number;
    }
    i++;
  }
  return 0;
}

var primeNumbers = [2];
var findPrimeNumbersLessThan = (number) => {
  var primes = [];
  if(primeNumbers[primeNumbers.length-1] > number){
    for(var i = 0; i < primeNumbers.length; i++){
      if(primeNumbers[i] < number){
        primes.push(primeNumbers[i]);
      }
    }
  }else{
    for(var i = primeNumbers[primeNumbers.length -1]; i < number ; i++){
      primeNumbers.push(i);
    }

    for(var i = 0; i < primeNumbers.length; i++){
      for(var j = i + 1; j < primeNumbers.length; j++){
        if(primeNumbers[j] % primeNumbers[i] === 0){
          primeNumbers.splice(j, 1);
        }
      }
    }
    for(var i = 0; i < primeNumbers.length; i++){
      primes.push(primeNumbers[i]);
    }
  }
  
 
  return primes;
}

var findPrimeN = function(number){
  var primes = [2]
  var numbers = [];
  while(primes.length < number){
    // Grow the numbers array
    var start = primes[primes.length-1] + 1;
    var growth = primes[primes.length-1];
    for(var i = start; i < start + growth; i++){
      numbers.push(i);
    }

    // Remove composite numbers
    for(var i = 0; i < primes.length; i++){
      for(var j = 0; j < numbers.length; j++){
        if(numbers[j] % primes[i] === 0){
          numbers.splice(j,1);
        }
      }
    }


    for(var i = 0; i < numbers.length; i++){
      for(var j = 1; j < numbers.length; j++){
        if(numbers[j] % number[i] === 0){
          number.splice(j,1);
        }
      }
    }

    // move prime numbers to primes
    for(var i = 0; i < numbers.length; i++){
      primes.push(numbers[i]);
    }
    numbers = [];
  }
  return primes;
}

var getDivisors = (number, maybeDivisor) =>{
  var divisors = [];
  for(var i = 0; i < maybeDivisor.length && maybeDivisor[i] < number; i++){
    if(number % maybeDivisor[i] === 0){
      divisors.push(maybeDivisor[i]);
    }
  } 
  return divisors;
}

var findPowersOfDivisors = (number, divisors) =>{
  var powers = [];
  var total = number;
  for(var i = 0 ; i < divisors.length; i++){
    var count = 0;
    while(total % divisors[i] === 0){
      total = total / divisors[i];
      count++;
    }
    powers.push(count+1);
  }
  return powers;
}

var totalNumberOfDivisors = (divisorPowers) => {
  var total = 1;
  for(var i = 0; i < divisorPowers.length; i++){
    total*=divisorPowers[i];
  }
  return total;
}

module.exports = {highlyDivisible, 
                  findPrimeNumbersLessThan,
                  getDivisors,
                  findPowersOfDivisors,
                  totalNumberOfDivisors};
