export interface Producto {
    state:      boolean;
    precio:     number;
    disponible: boolean;
    _id:        string;
    name:       string;
    user:       Categoria;
    categoria:  Categoria;
    img?:       string;
}

export interface Categoria {
    _id:  string;
    name: string;
}

export interface ProductoResponse {
    total:     number;
    productos: Producto[];
}

