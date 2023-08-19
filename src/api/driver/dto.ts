export class Driver {
    id?= '';
    fullName = "";
    // name = "";
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

// [
//     {
//         "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "name": "Nasser Nassan",
//         "phoneNumber": "0939844573",
//         "isAvailable": true,
//         "birthDate": "2023-08-14T23:17:46.931Z",
//         "orderCount": 2
//     },
//     {
//         "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "name": "Ahmad Hader",
//         "phoneNumber": "0947484346",
//         "isAvailable": true,
//         "birthDate": "2023-08-14T23:17:46.931Z",
//         "orderCount": 3
//     },
//     {
//         "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "name": "Baraa Nayyal",
//         "phoneNumber": "0947645523",
//         "isAvailable": true,
//         "birthDate": "2023-08-14T23:17:46.931Z",
//         "orderCount": 0
//     },
//     {
//         "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "name": "Taym Khalil",
//         "phoneNumber": "09884526233",
//         "isAvailable": true,
//         "birthDate": "2023-08-14T23:17:46.931Z",
//         "orderCount": 0
//     },
//     {
//         "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "name": "Najeb Hallak",
//         "phoneNumber": "0937524326",
//         "isAvailable": true,
//         "birthDate": "2023-08-14T23:17:46.931Z",
//         "orderCount": 0
//     }
// ]