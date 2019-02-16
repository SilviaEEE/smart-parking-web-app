// create a class
class Vehicule {
    constructor(nbWheels, color) {
        if (nbWheels === 2) {
            this.type = 'moto';
        } else {
            this.type = 'car';
        }
        this.color=color;
    }

    getColor() {
        return this.color;
    }
}


var myCar = new Vehicule (2, 'black');
var yourCar = new Vehicule (4, 'red');

console.log('my car is', myCar.getColor());
console.log('your car is', yourCar.getColor());