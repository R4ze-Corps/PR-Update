import { readFileSync, existsSync } from "fs";
import { join } from "path";

const configPath = join(__dirname, "../../ConfigCentral.json");

export const configCentral: Record<string, any> = existsSync(configPath)
  ? JSON.parse(readFileSync(configPath, "utf-8"))
  : {};

export const GERAIS_ROLE_ID = "1500609715263115408";
export const FILTER_ROLE_ID = "1501190054377295984";
export const CANAL_DESTINO_ID = "1501058170662162482";

export const sessoesUpar = new Map<string, { tipo: string; roleId?: string; memberId?: string }>();

export const cargosPromocao = [
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

export const cargosRebaixamento = [
  { id: "1501039815129432165", nome: "Gerente de Ação" },
  { id: "1500609722355552328", nome: "Gerente de Elite" },
  { id: "1500609720233365534", nome: "Gerente de Vendas" },
  { id: "1500609737732133055", nome: "Gerente de Farm" },
  { id: "1500609718782132325", nome: "Gerente de Recrutamento" },
  { id: "1500609717612052640", nome: "Gerente Geral" },
  { id: "1500609725572845578", nome: "Membro" },
];

export const gerenciaRoleIds = new Set([
  "1501039815129432165",
  "1500609722355552328",
  "1500609720233365534",
  "1500609737732133055",
  "1500609718782132325",
  "1500609717612052640",
]);

export function getAllRoleIds(): string[] {
  const ids = new Set<string>();
  for (const c of cargosPromocao) ids.add(c.id);
  for (const c of cargosRebaixamento) ids.add(c.id);
  ids.add(GERAIS_ROLE_ID);
  return [...ids];
}
