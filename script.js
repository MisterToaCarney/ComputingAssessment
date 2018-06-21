//script.js written by Toa Carney

/* List of error codes:
0 = no error
1 = no content
2 = under boundary
3 = over boundary
*/

/*
List of costs:
1 person: $500 / Person
2 people: $450 / Person
3-4 people: $430 / Person
4-8 people: $400 / Person
9+ people: $390 / Person
*/

const inputs = ['firstName', 'lastName', 'age']; // IDs of all form inputs
const errors = ['firstNameError', 'lastNameError', 'ageError'];

const maxPeople = 20; //Define a maximum of 20 people.


var firstNameElement = document.getElementById(inputs[0]) //Get all the form elements and store them in variables
var lastNameElement = document.getElementById(inputs[1])
var ageElement = document.getElementById(inputs[2])

var firstNameError = document.getElementById(errors[0]);
var lastNameError = document.getElementById(errors[1]);
var ageError = document.getElementById(errors[2]);

var firstNames = []; //Create empty arrays
var lastNames = [];
var ages = [];
var hasHealthIssues = [];

function getValues() { //Function for getting the values from the form (and also checking and storing them)
  firstName = firstNameElement.value; // Get the values and store them
  lastName = lastNameElement.value;
  age = ageElement.value;

  var isValid = true;

  switch (verify(firstName, 'name')) { // Verify that firstName is a valid name
    case 0: // Is valid
      firstNameElement.style.borderColor = null;
      firstNameError.innerHTML = null;
      break;
    case 1: // Is invalid (name is empty)
      firstNameElement.style.borderColor = "red";
      firstNameError.innerHTML = "Please enter a name.";
      isValid = false;
      break;
    case 3: // Is invalid (name is too long)
      firstNameElement.style.borderColor = "red";
      firstNameError.innerHTML = "That name is too long!"
      isValid = false;
      break;
    default:
      console.error("Fatal: Invalid error code")
  }

  switch (verify(lastName, 'name')) { // Verify that lastName is a valid name
    case 0: // Is valid
      lastNameElement.style.borderColor = null;
      lastNameError.innerHTML = null
      break;
    case 1: // Is empty
      lastNameElement.style.borderColor = "red";
      lastNameError.innerHTML = "Please enter a name."
      isValid = false;
      break;
    case 3: // Is too long
      lastNameElement.style.borderColor = "red";
      lastNameError.innerHTML = "That name is too long!"
      isValid = false;
      break;
    default:
      console.error("Fatal: Invalid error code");
  }

  switch (verify(age, 'age')) { // Verify that age is a valid age
    case 0: // Is valid
      ageElement.style.borderColor = null;
      ageError.innerHTML = null;
      break;
    case 1:
      ageElement.style.borderColor = "red";
      ageError.innerHTML = "Please enter an age.";
      isValid = false;
      break;
    case 2:
      ageElement.style.borderColor = "red";
      ageError.innerHTML = "Age is too low. (Ages 16-65 only)";
      isValid = false;
      break;
    case 3:
      ageElement.style.borderColor = "red";
      ageError.innerHTML = "Age is too high. (Ages 16-65 only)";
      isValid = false;
      break;
    default:
      console.error("Fatal: Invalid error code");
  }
  if (isValid == true) {
    firstNames.push(firstName); // Push the values to the array
    lastNames.push(lastName);
    ages.push(age);
  }
}

function verify(subject, type) {
  switch (type) {
    case 'name':
      if (subject.length == 0) {
        return(1); //error code 1: No content
      }
      else if(subject.length > 1000) {
        return(3); //error code 3: Over boundary
      }
      else {
        return(0); //return 0 if okay
      }
      break;

    case 'age':
      if (subject.length == 0) {
        return(1); // error code 1: No content
      }
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

function calculateCosts(ages, healths) { // Takes list of ages and health issues and calulates cost
  if (ages.length != healths.length) {
    console.error("Fatal: Arrays do not match");
    return("ERROR");
  }
  var length = ages.length;

  var cost = 0;
  switch (length) {
    case 0:
      cost = 0;
    case 1: //If one person
      cost = 500 * length;
      break;
    case 2:
      cost = 450 * length;
      break;
    case 3:
    case 4:
      cost = 430 * length;
      break;
    case 5:
    case 6:
    case 7:
    case 8:
      cost = 400 * length;
      break;
    default:
      cost = 390 * length;
  }
}

function drawTable() {
  /* Table layout
  Cell 0: number
  Cell 1: name
  Cell 2: Ages
  Cell 3: Has health issues
  */
  var root = document.getElementById("outputTable");
  var
  for (var i = 0; i < root.rows.length; i++) {
    root.rows[i]
  }
}

function clearAllInputs() {
  for (var i = 0; i < inputs.length; i++) {
    document.getElementById(inputs[i]).value = "";
  }
}
