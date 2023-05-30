export class Customer {
    id = "";
    name = "";
    phoneNumber = "";
    cityId = "";
    birthDate = "";
    orderCount = 0
}
export class CustomerDto {
    id?= '';
    email = "";
    fullName = "";
    phoneNumber = "";
    password = "";
    cityId = "";
    imageFile?: File | null = null;
    imageUrl?= "";
    birthDate = "";
    isBlock?= false;
    address = new Address()
}
export class Address {
    id?= '';
    name = "";
    areaId = "";
    cityId?= "";
    houseNumber = "";
    street = "";
    floor = "";
    additional = "";

}
