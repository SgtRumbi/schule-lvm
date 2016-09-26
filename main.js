function LVM(fields, packageSize) {
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
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function createRandomArray(size, maxSize) {
    var array = [];
    for (var i = 0; i < size; i++) {
        array[i] = randomInt(maxSize);
    }
    return array;
}

function echoArray(array) {
    var logString = "Fächer: [" + array.toString() + "].";
    console.log(logString);
}

$(document).ready(function () {
    var array = [];
    var inputFieldMaxBallons = $("#max-ballons");
    var inputFieldMaxFields = $("#max-fields");

    $(".fill-button").on("click", function () {
        // Fill

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
    });

    $(".sub-button").on("click", function () {
        // Submit and Calculate
        if (array.length < 1) {
            alert("Zu kleines Array!");
        } else {

        }
    });
});


/* (function main() {
    var array = createRandomArray(10, 10);
    // var array = [4,8,5,4,4,7,6,7,9,6];
    echoArray(array);

    var lvm = new LVM(array, 20);
    lvm.run();
})(); */
