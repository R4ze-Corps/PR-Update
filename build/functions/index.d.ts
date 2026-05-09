export declare const configCentral: Record<string, any>;
export declare const GERAIS_ROLE_ID = "1500609715263115408";
export declare const FILTER_ROLE_ID = "1501190054377295984";
export declare const CANAL_DESTINO_ID = "1501058170662162482";
export declare const sessoesUpar: Map<string, {
    tipo: string;
    roleId?: string;
    memberId?: string;
}>;
export declare const cargosPromocao: {
    id: string;
    nome: string;
}[];
export declare const cargosRebaixamento: {
    id: string;
    nome: string;
}[];
export declare const gerenciaRoleIds: Set<string>;
export declare function getAllRoleIds(): string[];
