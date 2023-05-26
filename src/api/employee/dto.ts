export class GetEmployee {
    id?= '';
    fullName = "";
    imageUrl = "";
    phoneNumber = '';
    email = "";
    birthDate = '';
    dateCreated?= "";
    handledOrdersCount?= 0;
    isBlock?= false;
}
export class AddEmployee {
    fullName = '';
    email = '';
    password?= '';
    phoneNumber = '';
    imageFile?: File | null = null;
    imageUrl?= "";
    birthDate = '';

}