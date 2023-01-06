export interface ListDoctors {
    list: Doctor[];
    total: number;
}

export interface Doctor {
    name:       string;
    usuario:    Usuario;
    img?:    string;
    hospitales?: Hospitale[];
    id:         string;
}

export interface Hospitale {
    _id:     string;
    name:    string;
    usuario: string;
}

export interface Usuario {
    _id:   string;
    name:  string;
    email: string;
    img:   string;
}