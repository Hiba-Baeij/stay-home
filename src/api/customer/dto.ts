
export class Customer {
    name?= "";
    phoneNumber = "";
    cityId = "";
    birthDate = "";
    orderCount = 0;
    id?= '';
    email = "";
    fullName = "";
    password = "";
    imageFile?: File | null = null;
    imageUrl?= "";
    isBlock?= false;

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
