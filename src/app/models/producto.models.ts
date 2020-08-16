export interface Producto {
    id: string,
    nombre?: string,
    descripcion?: string,
    unidadPrincipal?:string,
    unidadSecundaria?:string,
    ratioUnidades?:number,
    cantidadUnidadPrincipal?: number,
    cantidadUnidadSecundaria?: number,
    detalles?: string,
    categoria?:string,
    ubicacion?: string,
    serial?: string,
    precio?: number
}




