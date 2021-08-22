
let TARGET_STR;
let BLOCKS;
let MAIN;
let TARGET_STR_INPUT;
let BTN;

window.onload = function() {

 MAIN = document.getElementById('main');

 // INITIALIZE
 
 TARGET_STR = 'I saw an orange';

 BLOCKS = new Array(2);
 BLOCKS[0] = new ANAGRAM_BLOCK();
 BLOCKS[1] = new ANAGRAM_BLOCK();
 
 MAIN.appendChild(BLOCKS[0].RETURN_BLOCK());
 MAIN.appendChild(BLOCKS[1].RETURN_BLOCK());
 
 BLOCKS[0].UPDATE_TARGET_STR(TARGET_STR);
 BLOCKS[1].UPDATE_TARGET_STR(TARGET_STR);
 
 // EVENT LISTENERS
 
 TARGET_STR_INPUT = document.getElementById('target_string_input');
 TARGET_STR_INPUT.addEventListener('input', function() {
  TARGET_STR = this.value;
  for (let i = 0; i < BLOCKS.length; i++) {
   BLOCKS[i].UPDATE_TARGET_STR(TARGET_STR);
   BLOCKS[i].COMPARE2TARGET();
  }
 });
 
 BTN = document.getElementById('mybtn');
 BTN.addEventListener('click', function(){
  let b = new ANAGRAM_BLOCK();
  b.UPDATE_TARGET_STR(TARGET_STR);
  let el = b.RETURN_BLOCK();
  BLOCKS.push(b)
  MAIN.appendChild(el);
 });

}

function ANAGRAM_BLOCK() {
 this.block = document.createElement('div');
 this.input = document.createElement('input');
 this.output_container = document.createElement('div');
 this.output_container.classList.add('output_container');
 this.output_target = document.createElement('div');
 this.output_excess = document.createElement('div');
}

ANAGRAM_BLOCK.prototype.UPDATE_TARGET_STR = function(TARGET_STR) {
 this.TARGET_STR = TARGET_STR.toLowerCase();
 this.TARGET_LETTER_ARR = TARGET_STR.toLowerCase().split(/\s|/);
 this.TARGET_LETTERS = {};
 
 for (let i = 0; i < this.TARGET_LETTER_ARR.length; i++) {
   if (!this.TARGET_LETTERS[this.TARGET_LETTER_ARR[i]]) {
    this.TARGET_LETTERS[this.TARGET_LETTER_ARR[i]] = {
     'count':0,
     'used':0,
     'balance':0,
     'els':[]    
    }
  }
  this.TARGET_LETTERS[this.TARGET_LETTER_ARR[i]].count++;
  this.TARGET_LETTERS[this.TARGET_LETTER_ARR[i]].balance++;
  }
  
  this.output_target.innerHTML = '';
  for (let i = 0; i < this.TARGET_STR.length; i++) {
    let el = returnLetterBlock(this.TARGET_STR[i]);
    if (this.TARGET_LETTERS[this.TARGET_STR[i]]) {
     this.TARGET_LETTERS[this.TARGET_STR[i]].els.push(el);
    }
    this.output_target.appendChild(el);
  }
 console.log(this.TARGET_LETTERS);
}


ANAGRAM_BLOCK.prototype.RETURN_BLOCK = function() {
 this.block.classList.add('anagram_block');
 
 // INPUT
 this.block.appendChild(this.input);
 this.input.classList.add('myinputs');
 this.input.addEventListener('input', function(e) {
  this.SETSTR(e);
  this.COMPARE2TARGET();
 }.bind(this))
 
 // OUTPUT
 this.output_container.appendChild(this.output_target);
 this.output_container.appendChild(this.output_excess);
 this.block.appendChild(this.output_container);
 
 return this.block;
}
ANAGRAM_BLOCK.prototype.SETSTR = function(e) {
 this.STR = e.target.value.toLowerCase().split(/\s|/).filter(x => x);
 console.log(this.STR);
}

ANAGRAM_BLOCK.prototype.COMPARE2TARGET = function() {
 
 // RESET TARGET LETTERS OBJECT
 Object.keys(this.TARGET_LETTERS).forEach(function(a,b,c) {
  this.TARGET_LETTERS[a].balance = this.TARGET_LETTERS[a].count;
  this.TARGET_LETTERS[a].used = 0;
  
  for (let i = 0; i < this.TARGET_LETTERS[a].els.length; i++) {
   this.TARGET_LETTERS[a].els[i].classList.add('not_applied');
   this.TARGET_LETTERS[a].els[i].classList.remove('applied');
  }
  
 }.bind(this));
 
 this.output_excess.innerHTML = '';
 
 if (this.STR) {
 
  for (let i = 0; i < this.STR.length; i++) {
  
   // IF LETTER DOESNT EVEN BELONG
   if (!this.TARGET_LETTERS[this.STR[i]]) {
    let el = returnLetterBlock(this.STR[i]);
    el.classList.add('not_original');
    this.output_excess.appendChild(el);
   }
   
   // IF LETTER DOES BELONG
   if (this.TARGET_LETTERS[this.STR[i]]) {
   
    if (this.TARGET_LETTERS[this.STR[i]].balance > 0) {
     this.TARGET_LETTERS[this.STR[i]].balance--;
     this.TARGET_LETTERS[this.STR[i]].used++;
    } else {
     let el = returnLetterBlock(this.STR[i]);
     el.classList.add('not_original');
     this.output_excess.appendChild(el);
    }
   }
  }
 }
 
 // NOW TO COLOR IN THE REST
 Object.keys(this.TARGET_LETTERS).forEach(function(a,b,c) {
  for (let i = 0; i < this.TARGET_LETTERS[a].used; i++) {
   this.TARGET_LETTERS[a].els[i].classList.add('applied');
   this.TARGET_LETTERS[a].els[i].classList.remove('not_applied');
  }

 }.bind(this));
 
 
}




// OTHER FUNCTIONS

function returnLetterBlock(letter) {
 let el = document.createElement('div');
 el.classList.add('noselect');
 
 if (letter === ' ') {
  el.classList.add('letter_block_b'); 
  el.innerHTML = '&middot;';
 } else {
  el.classList.add('letter_block_a');
  el.innerHTML = letter;
  el.classList.add('not_applied');
 }
 return el;
}