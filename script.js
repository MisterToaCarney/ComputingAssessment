const inputs = ['firstName', 'lastName', 'age']; // IDs of all form inputs

/* List of error codes:
0 = no error
1 = no content
2 = under boundary
3 = over boundary
*/

var firstNameElement = document.getElementById(inputs[0])
var lastNameElement = document.getElementById(inputs[1])
var ageElement = document.getElementById(inputs[2])

var firstNames = [];
var lastNames = [];
var ages = [];

function getValues() {
  firstName = firstNameElement.value;
  lastName = lastNameElement.value;
  age = ageElement.value;

  switch (verify(firstName, 'name')) {
    case 0:
      firstNameElement.style.borderColor = "initial"
      break;
    case 1:
      firstNameElement.style.borderColor = "red";
      break;
    case 2:
      firstNameElement.style.borderColor = "red";
    case 3:
      firstNameElement.style.borderColor = "red";
      break;

  }
  verify(lastName, 'name');
  verify(age, 'age');

  firstNames.push(firstName);
  lastNames.push(lastName);
  ages.push(age);
}

function verify(subject, type) {
  switch (type) {
    case 'name':
      if (subject.length == 0) {
        return(1); //error code 1: No content
      }
      else if(subject.length > 50) {
        return(3); //error code 3: Over boundary
      }
      else {
        return(0); //return 0 if okay
      }
      break;
    case 'age':
      if (subject < 16) {
        return(2); //error code 2: Under boundary (age too low)
      }
      else if(subject > 65) {
        return(3); //error code 3: Over boundary (age too high)
      }
      else {
        return(0); //return 0 if okay
      }
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
