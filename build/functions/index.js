"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerenciaRoleIds = exports.cargosRebaixamento = exports.cargosPromocao = exports.sessoesUpar = exports.CANAL_DESTINO_ID = exports.FILTER_ROLE_ID = exports.GERAIS_ROLE_ID = exports.configCentral = void 0;
exports.getAllRoleIds = getAllRoleIds;
const fs_1 = require("fs");
const path_1 = require("path");
const configPath = (0, path_1.join)(__dirname, "../../ConfigCentral.json");
exports.configCentral = (0, fs_1.existsSync)(configPath)
    ? JSON.parse((0, fs_1.readFileSync)(configPath, "utf-8"))
    : {};
exports.GERAIS_ROLE_ID = "1500609715263115408";
exports.FILTER_ROLE_ID = "1501190054377295984";
exports.CANAL_DESTINO_ID = "1501058170662162482";
exports.sessoesUpar = new Map();
exports.cargosPromocao = [
    { id: "1500609723983073411", nome: "Elite" },
    { id: "1501039815129432165", nome: "Gerente de Ação" },
    { id: "1500609722355552328", nome: "Gerente de Elite" },
    { id: "1500609720233365534", nome: "Gerente de Vendas" },
    { id: "1500609737732133055", nome: "Gerente de Farm" },
    { id: "1500609718782132325", nome: "Gerente de Recrutamento" },
    { id: "1500609717612052640", nome: "Gerente Geral" },
    { id: "1500615066649628792", nome: "03" },
    { id: "1500615042595295304", nome: "02" },
    { id: "1500614985200439416", nome: "01" },
];
exports.cargosRebaixamento = [
    { id: "1501039815129432165", nome: "Gerente de Ação" },
    { id: "1500609722355552328", nome: "Gerente de Elite" },
    { id: "1500609720233365534", nome: "Gerente de Vendas" },
    { id: "1500609737732133055", nome: "Gerente de Farm" },
    { id: "1500609718782132325", nome: "Gerente de Recrutamento" },
    { id: "1500609717612052640", nome: "Gerente Geral" },
    { id: "1500609725572845578", nome: "Membro" },
];
exports.gerenciaRoleIds = new Set([
    "1501039815129432165",
    "1500609722355552328",
    "1500609720233365534",
    "1500609737732133055",
    "1500609718782132325",
    "1500609717612052640",
]);
function getAllRoleIds() {
    const ids = new Set();
    for (const c of exports.cargosPromocao)
        ids.add(c.id);
    for (const c of exports.cargosRebaixamento)
        ids.add(c.id);
    ids.add(exports.GERAIS_ROLE_ID);
    return [...ids];
}
//# sourceMappingURL=index.js.map