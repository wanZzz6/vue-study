abstract class Vehicel {
  var wheels;
  getWheelsNum();
}

class Car implements Vehicel {
  var wheels = 6;
  @override
  getWheelsNum() {
    print(this.wheels);
  }
}

main(List<String> args) {
  Car car = new Car();
  car.getWheelsNum();
}
