// 1. ways to print javascript
//console.log("hello world");
//alert("This is an alert message");
//document.write("This i an example");

// 2. javascript console API
//console.log("hello world", 4 + 6, "Another log");
//console.warn("This is a warning");
//console.error("This is an ERROR");

// 3. Javascript Variables
//Variables :- Containers to store data values

/*
 multi
line 
comment
*/

var num1 = 50;
var num2 = 40;
// console.log(num1+num2);

// 4. Data types in Javascript
// Number
var num1 = 50;
var num2 = 40.50;

//String
var str1 = "This is a string";
var str1 = "This is also a string";

//Objects
var marks = {
    ravi: 34,
    shubham: 80,
    jashan: 99.999
}
// console.log(marks);

// Booleans
var a = true
var b = false
// console.log(a,b);

//var und = undefined;
var und;
// console.log(und)

var n = null;
// console.log(n);

/*
At a very high level, there are two types of data types in javascript
1. Primitive data types: undefined, null, number, srting, boolean, symbol
2. Reference data types: arrays and objects

*/
var arr = [1.20, 2, "Hello World", 3, 4, 5]

// Operators in javascript
// Arithmetic operators
var a = 100;
var b = 10;
// console.log("The value of a+b=", a + b);
// console.log("The value of a-b=", a - b);
// console.log("The value of a*b=", a * b);
// console.log("The value of a/b=", a / b);

//Assignment operators
// var c = b;
// c-=2; //c=c-2
// c+=2;
// c*=2;
// c/=2;
// console.log(c);

// Comparison Operatorts
var x = 34;
var y = 56;
// console.log(x ==y);
// console.log(x >=y);
// console.log(x <=y);
// console.log(x >y);
// console.log(x <y);

//Logical operators

// Logical and

// console.log(true && true);
// console.log(true && false);
// console.log(false && true);
// console.log(false && false);

// logical or

// console.log(true || true);
// console.log(true || false);
// console.log(false || true);
// console.log(false || false);

//logical not

// console.log(!false);
// console.log(!true);

// Functions in javascript
function avg(a, b) {
    c = (a + b) / 2;
    return c;
}
function _email(){
//  event.preventDefault();

  a=console.log("hello");
  return  a
}

// DRY= do not repeat yourself
c = avg(4, 6);
c2 = avg(14, 16);
// console.log(c,c2);
/*
// Conditional in javascript
var age=11;
// single if statement
if(age>18){
    console.log("You can drink rasna water");
} 

// if-else statement
// if(age>18){
//     console.log("You can drink rasna water");
// }
// else{
//     console.log("You cannot drink rasna water");
// }
age=25
//if-else Ladder
if (age>2){
    console.log("You are not a kid");
}
else if (age>26){
    console.log("bache nhi rahe tum");
}
else if (age>22){
    console.log("yes bache nhi rahe tum");
}
else if (age>18){
    console.log(" 18 You are not a kid");
}
else{
    console.log("the end")
}
console.log("End of ladder");
*/

var arr = [1, 2, 3, 4, 1.30, 5, 6, 7, 58, 90, 100]
// console.log(arr)
//for loop

// for (var i = 0; i < arr.length; i++) {
//     if (i==2){
//         // break;
//         continue;
//     }
//     console.log(arr[i])
// }

// arr.forEach(function(e){
//     console.log(e);
// })


// const ac=0;
// ac++;
// ac =ac+1
// let j = 0;
//while loop
// while (j<arr.length){
//     console.log(arr[j]);
//     j++;
// }

// do while loop
// do {
//     console.log(arr[j]);
//     j++;
// } while (j < arr.length)

let myarr = ["Fan", "Camera", 34, null, true];
//array methods
// console.log(myarr.length);
// myarr.pop();
// myarr.push("Jashan");
// myarr.shift();
// myarr.unshift("jashan");
// console.log(myarr.unshift("jashan"))
const newlen = myarr.unshift("jashan");
// console.log(newlen);
// console.log(myarr);

// String Methods in javascript
let my_str = "He is a good boy good good boy";
// console.log(my_str.length);
// console.log(my_str.indexOf("good"));
// console.log(my_str.lastIndexOf("good"));
// console.log(my_str.slice(10,20))
re = my_str.replace("He", "Rohan");
// re = my_str.replace("good","bad");
// console.log(re);

let mydate = new Date();
// console.log(mydate.getTime())
// console.log(mydate.getFullYear())
// console.log(mydate.getDay())
// console.log(mydate.getMinutes())

// DOM Manipulation
let ele = document.getElementById('click');
// console.log(ele);
let eleclass = document.getElementsByClassName('container');
// console.log(eleclass);

// eleclass[0].style.background='yellow';
eleclass[0].classList.add('bg-primary');
eleclass[0].classList.add('text-success');
// eleclass[0].classList.remove('text-success');
// console.log(ele.innerHTML);
// console.log(ele.innerText);
// console.log(eleclass[0].innerHTML);
// console.log(eleclass[0].innerText);
// tn = document.getElementsByName('button');
// tn = document.getElementsByTagName('div');
// console.log(tn)
// created_ele = document.createElement('p');
// created_ele.innerText = 'This is a created para.'
// tn[0].appendChild(created_ele);
// created_ele2 = document.createElement('b');
// created_ele2.innerText = 'This is a created para.'
// tn[0].replaceChild(created_ele2, created_ele);
// removeChild(element); -----> removes an element

// selecting using Query
// sel = document.querySelector('.container')
// console.log(sel)
// sel = document.querySelectorAll('.container')
// console.log(sel)  // return nodelist

// function click(){
//     console.log('The button was clicked');
// }
// window.onload= function(){
//     console.log('The document was loaded');
// }

// Events in Javascript

// firstcontainer.addEventListener('click', function(){
//     document.querySelectorAll('.container')[1].innerHTML="<b> We have clicked</b>"
//     console.log('Clicked on container');
// })

/*
firstcontainer.addEventListener('mouseover', function(){
    console.log('mouse on container');
})

firstcontainer.addEventListener('mouseout', function(){
    console.log('mouse out of container');
})
*/

// let= prevhtml=document.querySelectorAll('.container')[1].innerHTML;
// firstcontainer.addEventListener('mouseup', function(){
//     document.querySelectorAll('.container')[1].innerHTML=prevhtml;
//     console.log('Mouse up when clicked  on container');
// })

// firstcontainer.addEventListener('mousedown', function(){
//     document.querySelectorAll('.container')[1].innerHTML="<b> We have clicked</b>";
//     console.log('Mouse down when clicked  on container');
// })

//Arrow Functions
// function sum(a,b){
//     return a+b;
// }

sum = (a, b) => {
    return a + b;
}

logkro = () => {
    console.log("I am your log");
}
// SetTimeout and  setInterval
// setTimeout(logkro,2000)
// clr = setInterval(logkro, 2000)
// use clearInterval(clr)/clearTimeout(clr) to cancel setInterval/setTimeout

//Javascript localStorage
// localStorage.setItem("name","Jashan")
// localStorage
// localStorage.getItem("name")
// localStorage.removeItem('name')
// localStorage.clear()


// JSON
// obj = { nmae: "JASHAN", length: 1, a:{ this: "that" } }
// js = JSON.stringify(obj);
// console.log(typeof js);
// console.log(js);
// parsed= JSON.parse('{"nmae":"JASHAN","length":1,"a":{"this":"that"}}')
// console.log(typeof parsed)
// console.log(parsed)

// Template literals - Backticks
a=334
console.log(`This is a number ${a}`)
