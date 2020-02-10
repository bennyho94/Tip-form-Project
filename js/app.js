//Things I learned: How to dynamically include options into an HTML form
//Things I changed: I created two functions to handle input. One for errors. One for calculating the tip.
//I broke out the feedback into three different feeds. Before, all three would show for just one error.
//Added a validator to only calculate if feedback wasn't received.
//Added a toFixed method to the output
// Made input disappear after submitting
//Bug. I had setInterval in my code instead of setTimeout. 



(function() {

  // global variables

  let inputBill = document.querySelector('#input-bill');
  let inputUsers = document.querySelector('#input-users');
  let inputService = document.querySelector('#input-service');

  let inputForms = document.querySelectorAll('.form-control');
  let button = document.querySelector('.submitBtn');

  let tipAmount = document.querySelector('#tip-amount');
  // input bill / 20% || 10% || 2%
  let totalAmount = document.querySelector('#total-amount');
  // inputbill + tipamount
  let personAmount = document.querySelector('#person-amount');
  // totalamount / inputusers
  let result = document.querySelector('.results');

  const services = [{
    value: 1,
    title: 'great -20%'
  },{
    value: 2,
    title: 'good -10%'
  },{
    value: 3,
    title: 'bad -2%'
  }]

// get value from the inputs

// value inputbill

 inputBill.addEventListener('keyup', function totalBill(e) {
  
  
  let billValue = e.target.value;
  console.log('check billvalue:' + billValue);
  
 // return inputBill;
})

// value inputusers

 inputUsers.addEventListener('keyup', function totalUsers(e) {

  let usersValue = e.target.value;
  console.log('check usersvalue:' + usersValue)

 
 // return usersValue;
})

// value inputservice

inputService.addEventListener('change', function(e) {

  let serviceValue = e.target.value;
  console.log('check serviceValue: ' + serviceValue);
  console.log(typeof serviceValue);
  let valueNumber = ''
  
  if(serviceValue === '1') {
    valueNumber = 20;
    console.log('valuenumber 1: ' + valueNumber);
  } else if (serviceValue === '2') {
    valueNumber = 10;
    console.log('valuenumber 2: ' + valueNumber);
  } else if(serviceValue === '3') {
    valueNumber = 2;
    console.log('valuenumber 3: ' + valueNumber);
  }

  return valueNumber

  console.log('return valuenumber' + valueNumber)
  
})

// click event button
button.addEventListener('click', function(e) {

  e.preventDefault();

// display results for 5 sec
  result.style.display = 'block';
//display the values in text

// console.log(totalBill());

/*
tipAmount.textContent = totalBill();
totalAmount.textContent = totalUsers();
*/

  
})

// create options element with the selected options

const option1 = document.createElement('option');
const option2 = document.createElement('option');
const option3 = document.createElement('option');

// add title in textcontent option
option1.textContent = services[0].title;
option2.textContent = services[1].title;
option3.textContent = services[2].title;

// add attribute with value in option
option1.setAttribute('value', 1);
option2.setAttribute('value', 2);
option3.setAttribute('value', 3);

// append option to select
inputService.append(option1);
inputService.append(option2);
inputService.append(option3);



})();





























































/*
(function(){
  
//Set up a service array
const services = [{
  value: 1,
  title: "great - 20%"
},{
  value: 2,
  title: "good - 10%"
},{
  value: 3,
  title: "bad - 2%"
}]


  
  const validateInput = function(billAmount, numUsers, selectedService){
    
   let isFeedback = false;
   const feedback = document.querySelector('.feedback');
    feedback.innerHTML = '';

     if  (billAmount === "" || billAmount <="0"){
        feedback.classList.add('showItem', 'alert-danger');
        feedback.innerHTML += `<p>Bill amount cannot be blank</p>`
        isFeedback = true;
    }
    
    if (numUsers <= "0"){
      feedback.classList.add('showItem', 'alert-danger');
      feedback.innerHTML += `<p>Number of users must be greater than zero</p>`;
       isFeedback = true;
    } 
    
   if (selectedService === "0"){
     feedback.classList.add('showItem', 'alert-danger');
     feedback.innerHTML += `<p>You must select a Service</p>`
      isFeedback = true;
   }
    
    setTimeout(function(){
      feedback.classList.remove('showItem', 'alert-danger');
    }, 10000);
    
    return isFeedback;
      
  }; // end validateInput
  
  const calculateTip = function(billAmount, numUsers, selectedService) {
   
    let percentTip = '';
    if (selectedService === "1"){
      percentTip = 0.2;
    } else if (selectedService === "2"){
      percentTip = 0.1;
    } else {
      percentTip = 0.02;
    }
    
    const tipAmount = Number(billAmount)*percentTip;
    const totalAmount = Number(billAmount) + Number(tipAmount);
    const eachPerson = Number(totalAmount) / Number(numUsers);
    
    return [tipAmount, totalAmount, eachPerson];
   
    
  };
  
 //FORM SETUP - ADD SERVICES
services.forEach(function(service){
  //create the option element
  const option = document.createElement('option');
  option.textContent = service.title;
  option.value = service.value;
  //select the select element from the DOM
  const select = document.querySelector('#input-service');
  select.appendChild(option);
})
  
 //FORM SETUP - ADD EVENT LISTENER AND FUNCTION CALLS
  const inputForm = document.querySelector('form');
  inputForm.addEventListener('submit', function(e){
    
  e.preventDefault();
   
  //grab elements from the DOM
  const inputBill = document.querySelector('#input-bill');
  const inputUsers = document.querySelector('#input-users');
  const serviceValue = document.querySelector('#input-service');
 
   //get values from DOM elements
  let billAmount = inputBill.value;
  let  numUsers = inputUsers.value;
  let selectedService = serviceValue.value;
    
  //get feedback if info is not validated  
  const isFeedback = validateInput(billAmount, numUsers, selectedService);
    
    
    
   //calculated tip if info was validated
    if (!isFeedback){
        const loader = document.querySelector('.loader');
        const resultsDOM = document.querySelector('.results');
        const tipResultsDOM = document.querySelector('#tip-amount');
        const totalAmountDOM = document.querySelector('#total-amount');
        const eachPersonDOM = document.querySelector('#person-amount');
      
       //calculate results
        const results = calculateTip(billAmount, numUsers, selectedService);
       //show loader  
       loader.classList.add('showItem');
       // show results after 2 seconds
       setTimeout(function(){
        loader.classList.remove('showItem');
        tipResultsDOM.textContent= `${results[0].toFixed(2)}`
        totalAmountDOM.textContent= `${results[1].toFixed(2)}`
        eachPersonDOM.textContent= `${results[2].toFixed(2)}`
        resultsDOM.classList.add('showItem');
      },2000)
      
      //clear values from DOM elements after 5 seconds
      setTimeout(function(){
        inputBill.value = '';
        inputUsers.value = '';
        serviceValue.value = 0;
        resultsDOM.classList.remove('showItem');
      }, 10000)


    } //end isFeedback statement
  
  }); //end eventListener for form
  
  
})();

*/