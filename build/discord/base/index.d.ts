export interface CommandConfig {
    name: string;
    description: string;
    type: number;
    defaultMemberPermissions?: bigint | string;
    data?: {
        options?: any[];
        default_member_permissions?: string;
    };
    run: (interaction: any) => Promise<void>;
}
export declare class Command {
    config: CommandConfig;
    constructor(config: CommandConfig);
    get name(): string;
    get description(): string;
    get type(): number;
    get run(): (interaction: any) => Promise<void>;
}
export declare function registerCommands(clientId: string, guildId: string, token: string): Promise<void>;
export declare function handleInteractionCreate(client: any): void;
