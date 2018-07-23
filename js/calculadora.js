(function(win, doc ){
    'use strict';

    //Variaveis
    var $visor = doc.querySelector('[data-js="display"]');
    var $keys  = doc.querySelectorAll('[data-js="keys"]');
    var $keyCE = doc.querySelector('[data-js="keysCE"]');
    var $operators = doc.querySelectorAll('[data-js="keysOp"]');
    var $equalOp = doc.querySelector('[data-js="keysEqual"]');
    var storedNum;
    var operation;
    $visor.value = 0; //Inicia o visor com valor 0.
    
 
    //Captura dos numero e operadores
    Array.prototype.forEach.call($keys, function(button){
        button.addEventListener('click', addKeys, false);
    });

    Array.prototype.forEach.call($operators, function (button){
        button.addEventListener('click', operationKeys, false);
    });

    $keyCE.addEventListener('click', cleanVisor, false);
    $equalOp.addEventListener('click', equalOp, false);
  
    //Funções
    function addKeys(){
        if($visor.value == 0){
            $visor.value = '';
        }
            $visor.value += this.value;
    }

    function cleanVisor(){
        $visor.value = 0;
    }

    function operationKeys(){
        $visor.value = removeOperator($visor.value);
        $visor.value += this.value;
    }

    function removelastDigit(number){
        var operators = ['+', '-', 'x', '/'];
        var lastItem = number.split('').pop();
        return operators.some(function(operator){
            return operator === lastItem;
        });
    }

    function removeOperator(number) {
        if(removelastDigit(number)){
            return number.slice(0, -1);
        }
        return number;
    }

    function equalOp(){
        $visor.value = removeOperator($visor.value);
        var allDigit = $visor.value.match(/\d+[+x\/\-/]?/g);
        $visor.value = allDigit.reduce(function(acumulado, atual){
        var firstDigit = acumulado.slice(0, -1);
        var operator = acumulado.split('').pop();
        var lastDigit = removeOperator(atual);
        var lastOperator = removelastDigit(atual) ? atual.split('').pop() : '';
            switch(operator) {
                case '+':
                return (Number(firstDigit) + Number(lastDigit)) + lastOperator;
                case '-':
                return (Number(firstDigit) - Number(lastDigit)) + lastOperator;
                case 'x':
                return (Number(firstDigit) * Number(lastDigit)) + lastOperator;
                case '/':
                return (Number(firstDigit) / Number(lastDigit)) + lastOperator;
            }
        });
        
    }
    
})(window, document);