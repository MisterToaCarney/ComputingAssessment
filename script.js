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
const radios = ['radioNo', 'radioYes']
const errors = ['firstNameError', 'lastNameError', 'ageError'];

const maxPeople = 20; //Define a maximum of 20 people.


var firstNameElement = document.getElementById(inputs[0]) //Get all the form elements and store them in variables
var lastNameElement = document.getElementById(inputs[1])
var ageElement = document.getElementById(inputs[2])
var radioNoElement = document.getElementById(radios[0])
var radioYesElement = document.getElementById(radios[1]);

var firstNameError = document.getElementById(errors[0]); //Get all the elements for displaying errors and store them in variables
var lastNameError = document.getElementById(errors[1]);
var ageError = document.getElementById(errors[2]);

var firstNames = []; //Create empty arrays storing submitted data.
var lastNames = [];
var ages = [];
var hasHealthIssues = [];
var costs = [];

function getValues() { //Function for getting the values from the form (and also checking and storing them)
  if (firstNames.length >= maxPeople) { //Is there over 20 people in the array?
    alert("You can't exceed " + maxPeople + " people per booking.") //Alert the end user that there are too many people.
    return(1); //Exit the function with status 1
  }
  firstName = firstNameElement.value; // Get the values from the form and store them
  lastName = lastNameElement.value;
  age = ageElement.value;

  /*
  Since the radio buttons are two seperate elements, you can't simply read a value from one.
  You must instead find which of the two buttons is checked.
  I do this using the if statements below.
  */
  if (radioYesElement.checked == true && radioNoElement.checked == false) { // Is the yes button checked AND the no button unchecked?
    healthIssue = true; // They therefore have health issues.
  }
  else if (radioYesElement.checked == false && radioNoElement.checked == true) { // Is the yes button is unchecked AND the no button checked?
    healthIssue = false; // They therefore do not have health issues.
  }
  else { // If neither of the above are true, then there is something seriously wrong.
    console.error("Health issue radio buttons are not set") // Print the error to the console
    alert("An error occured. Check the console for details.") // Alert the user that an error occured.
    return(1); // Stop the function with status 1.
  }

  var isValid = true; // Use this variable to keep track of wether the users input is valid. Set to false in invalid.


  /*
  These switch statements below call the function verify() and processes whatever it returns.
  The verify() function returns an error code depending on the type of error that is present.
  The error codes are defined at the top of this document.
  */
  switch (verify(firstName, 'name')) { // Verify that firstName is a valid name
    case 0: // Is valid
      firstNameElement.style.borderColor = null; //Set border color to default color
      firstNameError.innerHTML = null; // Clear the error field
      break;
    case 1: // Is invalid (name is empty)
      firstNameElement.style.borderColor = "red"; //Set border color to red
      firstNameError.innerHTML = "Please enter a name."; //Show the error in it's respective error field.
      isValid = false; // There was a problem with the user input so set isValid to false
      break;
    case 3: // Is invalid (name is too long)
      firstNameElement.style.borderColor = "red"; //Set border color to red
      firstNameError.innerHTML = "That name is too long!" //Show the error in it's respective error field.
      isValid = false; // There was a problem with the user input so set isValid to false
      break;
    default:
      console.error("Fatal: Invalid error code") // There verify() function returned an unexpected error code (this should never happen)
      alert("An error has occured. Check the conosle for details.") // Alert the user of this fatal error
      isValid = false; // There was a problem with the user input so set isValid to false
  }

  switch (verify(lastName, 'name')) { // Verify that lastName is a valid name
    case 0: // Is valid
      lastNameElement.style.borderColor = null;
      lastNameError.innerHTML = null
      break;
    case 1: // Is empty
      lastNameElement.style.borderColor = "red"; //Set border color to red
      lastNameError.innerHTML = "Please enter a name." //Show the error in it's respective error field.
      isValid = false; // There was a problem with the user input so set isValid to false
      break;
    case 3: // Is too long
      lastNameElement.style.borderColor = "red"; //Set border color to red
      lastNameError.innerHTML = "That name is too long!" //Show the error in it's respective error field.
      isValid = false; // There was a problem with the user input so set isValid to false
      break;
    default:
      console.error("Fatal: Invalid error code"); // There verify() function returned an unexpected error code (this should never happen)
      alert("An error has occured. Check the conosle for details.") // Alert the user of this fatal error
      isValid = false; // There was a problem with the user input so set isValid to false
  }

  switch (verify(age, 'age')) { // Verify that the age variable is a valid age
    case 0: // Is valid
      ageElement.style.borderColor = null;
      ageError.innerHTML = null;
      break;
    case 1:
      ageElement.style.borderColor = "red"; //Set border color to red
      ageError.innerHTML = "Please enter an age."; //Show the error in it's respective error field.
      isValid = false; // There was a problem with the user input so set isValid to false
      break;
    case 2:
      ageElement.style.borderColor = "red"; //Set border color to red
      ageError.innerHTML = "Age is too low. (Ages 16-65 only)"; //Show the error in it's respective error field.
      isValid = false; // There was a problem with the user input so set isValid to false
      break;
    case 3:
      ageElement.style.borderColor = "red"; //Set border color to red
      ageError.innerHTML = "Age is too high. (Ages 16-65 only)"; //Show the error in it's respective error field.
      isValid = false; // There was a problem with the user input so set isValid to false
      break;
    default:
      console.error("Fatal: Invalid error code"); // There verify() function returned an unexpected error code (this should never happen)
      alert("An error has occured. Check the conosle for details.") // Alert the user of this fatal error
      isValid = false; // There was a problem with the user input so set isValid to false
  }
  //no need to check if health issues are valid because all the possible value (true or false) are valid.
  if (isValid == true) { // Were there not any errors in the switch statements above?
    firstNames.push(firstName); // Push the values to the array
    lastNames.push(lastName);
    ages.push(age);
    hasHealthIssues.push(healthIssue);
    showCost(); //show the cost on the page
    drawTable(); //re-draws the table displaying price etc.
    clearAllInputs(); //clears the input fields
  }
}

/*
This function takes an input "subject" and a data type defined as either 'name' or 'age'
It will return error codes depending on what issues are present within the data.
*/
function verify(subject, type) {
  switch (type) { // Switch the variable 'type'
    case 'name': //Is the input type a name?
      if (subject.length == 0) { //Does the input have 0 characters
        return(1); //error code 1: No content
      }
      else if(subject.length > 1000) { //Does the input have over 1000 characters?
        return(3); //error code 3: Over boundary
      }
      else {
        return(0); //return 0 if okay
      }
      break;

    case 'age': //Is the input type an age?
      if (subject.length == 0) { //Does the input have 0 characters
        return(1); // error code 1: No content
      }
      if (subject < 16) { //Is the input (age) under 16?
        return(2); //error code 2: Under boundary (age too low)
      }
      else if(subject > 65) { //Is the input (age) over 65
        return(3); //error code 3: Over boundary (age too high)
      }
      else {
        return(0); //return 0 if okay
      }
      break;

    default: //Is the input type none of the above? (This should never happpen)
      console.error("Fatal: Data type '" + type + "' does not exist."); //Print the error
      alert("An error occured, check the console for details.") //Alert the user of the error
      return(1); //Stop the function
  }
}

function calculateCosts(ages, healths) { // Takes list of ages + health issues, calulates cost and returns
  if (ages.length != healths.length) { //Are they not the same length? (This should'nt happen)
    console.error("Fatal: Arrays do not match"); //Print error
    alert("An error occured, check the console for details.") //Alert user of error
    return("ERROR");//Stop the function
  }
  var length = ages.length; //Store the length of array 'ages'

  var cost = 0; //Set cost to 0
  switch (length) { //Switch the length of the ages array
    case 0: //Is there 0 people
      cost = 0;
    case 1: //If one person
      cost = 500 * length; //Set cost to 500 times the amount of people (1)
      for (var i = 0; i < length; i++) { //Repeat the amount of people there are
        costs[i] = 500; //Set each element in the costs array to 500. This process continues below only with different cost values.
      }
      break;
    case 2:// If two people
      cost = 450 * length;
      for (var i = 0; i < length; i++) {
        costs[i] = 450;
      }
      break;
    case 3:// If 3 or 4 people
    case 4:
      cost = 430 * length;
      for (var i = 0; i < length; i++) {
        costs[i] = 430;
      }
      break;
    case 5://if 5,6,7 or 8 people
    case 6:
    case 7:
    case 8:
      cost = 400 * length;
      for (var i = 0; i < length; i++) {
        costs[i] = 400;
      }
      break;
    default: // Higher than 8
      cost = 390 * length;
      for (var i = 0; i < length; i++) {
        costs[i] = 390;
      }
  }
  //The code below calculates the extra costs.
  for (var i = 0; i < healths.length; i++) { //Iterate over the people in the healths array
    if (healths[i] == true) { //Does this person have health issues?
      cost += 50; //Add 50 to the cost
      costs[i] += 50; //Add 50 to the cost of the respective person
    }
  }
  for (var i = 0; i < ages.length; i++) { //Iterate over the people in the ages array
    if (ages[i] <= 18) { //Is this person 18 and under?
      cost += 30; //Add 30 to the total cost
      costs[i] += 30; //Add 30 to the cost of the respective person.
    }
  }

  for (var i = 0; i < costs.length; i++) { //iterate over the cost of each person
    costs[i] = costs[i] * 1.15 //Calculate tax on it and store
    costs[i] = costs[i].toFixed(2); //Round it to 2dp and store
  }
  cost = cost*1.15; //Calculate tax on the total cost and store
  return(cost.toFixed(2)); //Return a rounded total cost.
}

//This function displays the table containing information
function drawTable() {
  /* Table layout
  Cell 0: number and remove
  Cell 1: name
  Cell 2: Ages
  Cell 3: Has health issues
  Cell 4: Cost
  */

  var root = document.getElementById("outputTable"); //Get the table element.

  recursions = root.rows.length; // Clear the table
  for (var i = 0; i < recursions; i++) { //Iterate over the existing rows in the table
    if (i != 0) { //Skip the first row that contains the table headings
      root.deleteRow(1) //Delete the respective row
    }
  }

  for (var i = 0; i < firstNames.length; i++) { //Iterate over the amount of people in the booking (length of firstnames)
    var row = root.insertRow(); //Insert a row

    var personCell = row.insertCell(0); //Insert a cell at position 0
    personCell.innerHTML = i+1 + ' <button onclick="clearEntry(' + i + ');">Remove</button>'; //Add the person number and a remove button to the cell

    var nameCell = row.insertCell(1); //Insert cell at position 1
    nameCell.innerHTML = firstNames[i] + " " + lastNames[i]; //Append the first and last name of the person

    var ageCell = row.insertCell(2); //Insert cell at position 2
    ageCell.innerHTML = ages[i]; //Append the persons age to the cell

    var hasHealthIssuesCell = row.insertCell(3); //Insert cell at position 3
    if (hasHealthIssues[i] == true) { //Does this person have health issues?
      hasHealthIssuesCell.innerHTML = "Yes"; //Append "Yes" to the cell
    }
    else { //If not
      hasHealthIssuesCell.innerHTML = "No"; //Append "No" to the cell
    }

    var costCell = row.insertCell(4); //Insert cell at position 4
    costCell.innerHTML = "$" + costs[i]; //Append the persons cost to the cell.

  }
}

function clearEntry(entry) { //Clears a particular array entry and redisplays the result
  firstNames.splice(entry,1); //Remove 'entry' from the firstnames array
  lastNames.splice(entry,1); //Remove 'entry from the lastNames array
  ages.splice(entry,1); //Remove 'entry from the ages array
  hasHealthIssues.splice(entry,1); //Remove 'entry from the healthIssues array
  costs.splice(entry,1); //Remove 'entry from the costs array
  showCost(); //Display the new cost
  drawTable(); //Re-draw the new table
}

function showCost() { // Displays the cost including GST
  var costElement = document.getElementById("totalCost") //Get the element containing the total cost
  costElement.innerHTML = calculateCosts(ages, hasHealthIssues); //Calculate costs and display it in the costs element
}

function clearAllInputs() { // Clears the inputs
  for (var i = 0; i < inputs.length; i++) { //Iterate over the inputs
    document.getElementById(inputs[i]).value = ""; //Clear the input
  }
  document.getElementById(radios[0]).checked = true; //Set radio button 0 to true
  document.getElementById(radios[1]).checked = false; //Set radio button 1 to false
}
