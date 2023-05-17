export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    accessToken: string,
    refreshToken: string,
    id: string,
    email: string
}
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
    imageFile = '';
    address = '';
    birthDate = '';

}
