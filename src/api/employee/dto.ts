export interface GetEmployee {
    fullName: string;
    id: string;
    phoneNumber: string;
    email: string;
    dateCreated: string;
    orderHandledCount: number;
    isBlocked: boolean;
}
export class AddEmployee {
    firstName = '';
    lastName = '';
    email = '';
    roleName = '';
    password = '';
    countryId = '';
    phoneNumbers: Number[] = [];
    imageFile: File | null = null;
    address = '';
    birthDate = '';

}