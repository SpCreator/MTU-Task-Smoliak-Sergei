// Скрипт умеет отлавливать ошибки на несоответствие требованиям, например, присутствие отрицательного числа в массиве или нет одного числа массива 1 в массиве 2.
// Обработка ошибок выглядит хоть и не лучшим решением, но работает. Почему такая обработка - получаем объект - присваиваем переменной - обращаемся к свойству и выводим значение через alert()?
// Просто вызывая напрямую функцию errors(), которая изначально по задумке, должна была принимать название свойства объекта и сразу вызывать alert() с текстом ошибки,
// в консоль, в определенный момент, вылетала ошибка о том, что errors() не есть функция. Отловив место ошибки, я посмотрел содержимое errors(), и как оказалось мне вернулся объект со всеми свойствами,
// хотя изначально я не возвращал из функции ничего. Магия одним словом. Если есть идея почему такая ошибка может появляться, буду очень рад услышать пояснение на уроке. Спасибо!

(function() {
    // General function.
    function combine() {
        let arr1 = [2, 3, 1, 3, 2, 4, 6, 20, 7, 9, 2, 19];
        let arr2 = [2, 1, 4, 3, 9, 6];

        if (checkingArrayLength(arr1, arr2) === false) return;

        let diffArr = arr1.filter(i => !arr2.includes(i));

        if (!checking(arr1, arr2, diffArr)) return;

        let newArr = [];
        
        for (let elemArr2 of arr2) {
            let partArray = addToGroup(newArr, elemArr2, arr1);

            if (!Array.isArray(partArray)) return;

            newArr.concat(partArray);
        }
    
        diffArr = diffSort(diffArr);
        newArr = concatArrs(newArr, diffArr);
        
        alert(`[${newArr}]`);
    }

    // Grouping the same numbers.
    function addToGroup(newArr, elemArr2, arr1) {
        let countNum = counElementSearch(elemArr2, arr1);

        if (countNum) {
            for (let i = 0; i < countNum; i++) {
                newArr.push(elemArr2);
            }
        }
        
        return newArr;
    }

    // Helper to the addToGroup(). Calculating the number of repetitions.
    function counElementSearch(elemArr2, arr1) {
        let count = 0;

        for (let elemArr1 of arr1) {
            if (elemArr1 >= 0 && elemArr1 <= 1000) {
                if (elemArr2 === elemArr1) {
                    count++;
                }
            } else {
                return false;
            }

        }
        
        return count;
    }

    // Sorting different numbers.
    function diffSort(arr) {
        arr.sort(function sortNumber(elem1, elem2) {
            return elem1 - elem2;
        });

        return arr;
    }

    // Arrays concating/
    function concatArrs(newArr, diffArr) {
        if (newArr.length > 1) {
            return newArr.concat(diffArr);
        } else {
            let error = errors();
            alert(error.empty);
            return;
        }
    }

    // Verification of compliance with conditions.
    function checking(arr1, arr2, diffArr) {
        if (!checkingArrayLength(arr1, arr2) 
        || !numberRangeCheckArr2(arr1, arr2)  
        || !numberRangeCheckArr1(arr1, arr2)  
        || !checkingElements(arr1, arr2) 
        || !checkingDuplicateValues(arr2) 
        || !checkingDifferenceArray(diffArr)) return false;
        return true;
    }

    // Number range check arr1.
    function numberRangeCheckArr1(arr1) {
        for (let elemArr1 of arr1) {
            if (elemArr1 < 0) {
                let error = errors(1);
                alert(error.lessThan);
                return false;
            } else if (elemArr1 > 1000) {
                let error = errors(1);
                alert(error.moreThan);
                return false;
            }
        }
        
        return true;
    }

    // Number range check arr2.
    function numberRangeCheckArr2(arr2) {
        for (let elemArr2 of arr2) {
            if (elemArr2 < 0) {
                let error = errors(2);
                alert(error.lessThan);
                return false;
            } else if (elemArr2 > 1000) {
                let error = errors(2);
                alert(error.moreThan);
                return false;
            }
        }
        
        return true;
    }

    // Checking the convergence of arrays.
    function checkingDuplicateValues(arr2) {
        let count = 0;
        for (let elem of arr2) {
            count += arr2.filter((item) => item === elem).length;
        }
        
        if (count != arr2.length) {
            let error = errors(2);
            alert(error.duplicate);
            return false;
        }

        return true;
    }

    // Checking array differences.
    function checkingDifferenceArray(diffArr) {
        if (diffArr.length === 0) {
            let error = errors();
            alert(error.difference);
            return false;
        }

        return true;
    }

    // Checking for the presence of elements of one array in the second.
    function checkingElements(arr1, arr2) {
        for (let num of arr2) {
            if (!arr1.includes(num)) {
                let error = errors();
                alert(error.persistence);
                return false;
            }
        }

        return true;
    }

    // Checking the length of an array.
    function checkingArrayLength(arr1, arr2) { // 
        if (arr1.length < 1 || arr1.length > 1000) {
            let error = errors(1);
            alert(error.length);
            return false;
        } else if (arr2.length < 1 || arr2.length > 1000) {
            let error = errors(2);
            alert(error.length);
            return false;
        }
        
        return true;
    }

    // Errors resulting from compliance checks.
    function errors(add = '') {
        return {
            persistence: 'arr2 не содержит некоторых чисел arr1!',
            difference: 'Между массивами нет разницы!',
            length: `Неподходящая длина массива arr${add}!`,
            empty: 'Слияние массивов невозможно!',
            duplicate: `Найдены повторяющиеся числа в arr${add}!`,
            moreThan: `В массиве arr${add} найдено число больше 1000!`,
            lessThan: `В массиве arr${add} найдено число меньше 0!`
        };
    }

    combine();
})();