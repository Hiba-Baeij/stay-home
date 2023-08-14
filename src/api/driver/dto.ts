export class Driver {
    id?= '';
    // fullName = "";
    name = "";
    phoneNumber = '';
    isAvailable = false;
    email?= "";
    birthDate = '';
    orderCount = 0;
    isBlock?= false;
}
export class DriverDto {
    id?= '';
    fullName = "";
    phoneNumber = '';
    password?= ""
    email = "";
    birthDate = '';
    isBlock?= false;
    vehicle = { ...new Vehicle() }
}
export class Vehicle {
    vehicleTypeId = '';
    color = "";
    number = "";
    name = "";
    imageFile = null;
    imageUrl?= "";
    maxCapacity = 0

}