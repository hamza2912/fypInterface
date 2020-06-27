export interface motorSpec {
    power: number;
    voltage: number;
    frequency: number;
    pf: number;
}

export interface vfdSpec {
    power: number;
    voltage: number;
    frequency: number;
    // phase?: string;
}

export interface sizeTable {
    AWS: number;
    Area: number;
    Diameter: number;
    maxCurrent: number;
}
