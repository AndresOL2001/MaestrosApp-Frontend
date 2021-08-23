export interface Resultado {
    resultados: Maestro[];
}

export interface Maestro {
    nombre:    string;
    materia:   string;
    opiniones: Opinione[];
    uid:       string;
}

export interface Opinione {
    estado:       boolean;
    _id:          string;
    opinion:      string;
    calificacion: number;
   
}