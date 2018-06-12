const inputs = ['firstName', 'lastName', 'age']; // IDs of all form inputs

var firstNames = [];
var lastNames = [];
var ages = [];

function getValues() {
  firstName = document.getElementById(inputs[0]).value;
  lastName = document.getElementById(inputs[1]).value;
  age = document.getElementById(inputs[2]).value;

  verify(firstName, 'name');
  verify(lastName, 'name');
  verify(age, 'age');

  firstNames.push(firstName);
  lastNames.push(lastName);
  ages.push(age);
}

function verify(subject, type) {
  switch (type) {
    case 'name':
      if (subject) {

      }
      break;
    case 'age':
      break;
    default:
      console.error("Fatal: Data type '" + type + "' does not exist.");
      return(1);
  }
}

function clearAllInputs() {
  for (var i = 0; i < inputs.length; i++) {
    document.getElementById(inputs[i]).value = "";
  }
}
