import { Usuario } from "../models/user.models"
import { Hospital } from '../models/hospital.models';
import { Doctor } from "../models/doctor.models";

export interface SearchUser {
    ok: boolean,
    usuarios: Usuario[],
};
export interface SearchHospital {
    ok: boolean,
    hospitales: Hospital[],
};
export interface ListUsers {
    
    list: Usuario[],
    total: number
}

export interface ListHospital {
    
    list: Hospital[],
    total: number
}
