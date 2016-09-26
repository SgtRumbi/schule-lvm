$(document).ready(function () {
    console.log("Document Ready.");

    var array = [];
    var inputFieldMaxBallons = $("#max-ballons");
    var inputFieldMaxFields = $("#max-fields");
    var inputFieldMaxBallonsInPckg = $("#max-ballons-in-pckg");
    var wholeArrayContainer = $(".whole-array");
    var preOutputArray = $(".pre-output-array");
    var outputArray = $(".output-array");

    $(".fill-button").on("click", function () {
        console.log("Fill Button clicked.");

        var maxBallons = inputFieldMaxBallons.val();
        var maxFields = inputFieldMaxFields.val();
        if (!maxBallons) {
            alert("!maxBallons");
            return;
        }
        if (!maxFields) {
            alert("!maxFields");
            return;
        }
        
        array = createRandomArray(maxBallons, maxFields);
        echoArray(array);

        wholeArrayContainer.empty();
        // Fill .whole-array with numbers
        for (var i = 0; i < array.length; i++) {
            var newFieldElement = $('<div class="field-element" id="JSID-' + i + '">' + array[i] + '</div>')
            wholeArrayContainer.append(newFieldElement);
        }
    });

    $(".sub-button").on("click", function () {
        var maxBallonsInPckg = inputFieldMaxBallonsInPckg.val();
        if (!maxBallonsInPckg) {
            alert("!maxBallonsInPckg");
            return;
        }

        // Submit and Calculate
        if (array.length < 1) {
            alert("Zu kleines Array!");
        } else {
            var lvmResult = lvmSort(array, maxBallonsInPckg);
        }
    });
});

/* (function () {
    var array = createRandomArray(10, 10);
    echoArray(array);
    var lvmResult = lvmSort(array, 20, false);
    console.log(lvmResult.finishMessage);
})(); */

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function createRandomArray(size, maxSizeOfValues) {
    var array = [];
    for (var i = 0; i < size; i++) {
        array[i] = randomInt(maxSizeOfValues);
    }
    return array;
}

function echoArray(array) {
    var logString = "array:[" + array.toString() + "]";
    console.log(logString);
}

function lvmSort(array, packageSize, debugMessages) {
    var foundMatch = false;
    var tolerance = 0;
    var greatestMatch = 0;
    var finalSum = 0;
    var lastMatch = [];
    do {
        for (var i = 0; i < Math.pow(2, array.length); i++) {
            var sum = 0;
            lastMatch = [];
            for (var element = 0; element < array.length; element++) {
                var iAndElementPow = i & Math.pow(2, element);
                if (iAndElementPow != 0) {
                    lastMatch.push(element);

                    sum += array[element];
                    if (debugMessages)
                        console.log("T. i:" + i + ", element:" + element + ", element^2:" + (Math.pow(2, element)) + ", i&element^2:" + iAndElementPow + ", i&element^2!=0:" + (iAndElementPow != 0));
                } else {
                    if (debugMessages)
                        console.log("F. i:" + i + ", element:" + element + ", element^2:" + (Math.pow(2, element)) + ", i&element^2:" + iAndElementPow + ", i&element^2!=0:" + (iAndElementPow != 0));
                }
            }

            if (sum > greatestMatch) {
                greatestMatch = sum;
            }

            if (sum == packageSize + tolerance) {
                finalSum = sum;
                foundMatch = true;
                break;
            } else {
                if (debugMessages)
                    console.log("sum:" + sum)
            }
        }

        if (greatestMatch < packageSize) {
            if (debugMessages)
                console.log("Nothing to find greater than " + greatestMatch + ", aborting.");
            finalSum = sum;
            foundMatch = true;
        }

        tolerance++;
    } while (!foundMatch);
    var str = "sum:" + finalSum + ",match:" + (function () {
            var str = "[";
            for (var i = 0; i < lastMatch.length; i++) {
                str += "{index:" + i + ", value:" + array[lastMatch[i]] + "}";
            }
            return str + "]";
        })();
    if (debugMessages)
        console.log(str);
    return {finalSum: finalSum, tolerance: tolerance, matchIndices: lastMatch, finishMessage: str};
}

// DEPRECATED BELOW

/* function LVM(fields, packageSize) {
    return {
        fields: fields,
        packageSize: packageSize,
        output: 0,
        temp: 0,
        tolerate: 0,
        nullFields: 0,
        field: function (fieldNumber) {
            this.output += this.fields[fieldNumber];
            var logString = "Leere Fach " + fieldNumber +  " mit Wert " + this.fields[fieldNumber] +
                ". Aktueller Output: " + this.output + ".";
            console.log(logString);
            this.fields[fieldNumber] = 0;
        },
        pack: function () {
            var logString = "Verpacke " + this.output + "/~" + this.packageSize + " Luftballons";
            console.log(logString);
        },
        step: function () {
            for (var i = this.temp--; i >= 0; i--) {
                var field = this.fields[i];
                if (field == 0) {
                    this.nullFields++;
                }
                var num = this.output + field - this.tolerate;
                if (!(num > this.packageSize)) {
                    this.field(i);
                    break;
                }
            }
        },
        run: function () {
            this.tolerate = 0;
            this.nullFields = 0;
            console.log("Sortiere Fächer...");
            this.fields.sort();
            echoArray(fields);
            this.temp = this.fields.length - 1;
            do {
                this.step();
                if (this.temp == 0) {
                    this.temp = this.fields.length - 1;
                    this.tolerate++;
                }
            } while (this.output < this.packageSize && this.fields.length > this.nullFields);
            this.pack();
        }
    };
} */

/* (function () {
    const array = [19, 12, 3, 4, 5, 2, 2, 3, 4, 5];
    const packageSize = 20;

    var foundMatch = false;
    var tolerance = 0;
    var greatestMatch = 0;
    var finalSum = 0;
    var lastMatch = [];
    do {
        for (var i = 0; i < Math.pow(2, array.length); i++) {
            var sum = 0;
            lastMatch = [];
            for (var element = 0; element < array.length; element++) {
                var iAndElementPow = i & Math.pow(2, element);
                if (iAndElementPow != 0) {
                    lastMatch.push(element);

                    sum += array[element];
                    console.log("T. i:" + i + ", element:" + element + ", element^2:" + (Math.pow(2, element)) + ", i&element^2:" + iAndElementPow + ", i&element^2!=0:" + (iAndElementPow != 0));
                } else {
                    console.log("F. i:" + i + ", element:" + element + ", element^2:" + (Math.pow(2, element)) + ", i&element^2:" + iAndElementPow + ", i&element^2!=0:" + (iAndElementPow != 0));
                }
            }

            if (sum > greatestMatch) {
                greatestMatch = sum;
            }

            if (sum == packageSize + tolerance) {
                finalSum = sum;
                foundMatch = true;
                break;
            } else {
                console.log("sum:" + sum)
            }
        }

        if (greatestMatch < packageSize) {
            console.log("Nothing to find greater than " + greatestMatch + ", aborting.");
            finalSum = sum;
            foundMatch = true;
        }

        tolerance++;
    } while (!foundMatch);
    var str = "sum:" + finalSum + ",match:" + (function () {
            var str = "[";
            for (var i = 0; i < lastMatch.length; i++) {
                str += "{index:" + i + ", value:" + array[lastMatch[i]] + "}";
            }
            return str + "]";
        })();
    console.log(str);
})(); */

/* function recurseSum(numbers, index, sum, find) {
    if (index == numbers.length) {
        if (find == sum) {
            console.log("Sum: " + sum);
            return;
        }
    }
    recurseSum(numbers, index, sum, find);
}

recurseSum([2, 2, 2, 3, 1, 2, 3, 4, 1], 0, 0, 3); */
/* (function main() {
    var array = createRandomArray(10, 10);
    // var array = [4,8,5,4,4,7,6,7,9,6];
    echoArray(array);

    var lvm = new LVM(array, 20);
    lvm.run();
    // lvm.start();
})(); */
