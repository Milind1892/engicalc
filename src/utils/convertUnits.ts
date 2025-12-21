// src/utils/convertUnits.ts

import { unitCategories } from "./unitData";
console.log("convertUnits.ts LOADED");
/* ------------------------------------------
   HARDNESS LOOKUP TABLE (engineering metals)
-------------------------------------------*/
type HardnessRow = {
  HB: number | null;
  HRC: number | null;
  HRB: number | null;
  HV: number | null;
};

const hardnessTable: HardnessRow[] = [
  { HB: 80,  HRC: 5,  HRB: 50, HV: 80 },
  { HB: 100, HRC: 10, HRB: 65, HV: 105 },
  { HB: 150, HRC: 20, HRB: 80, HV: 160 },
  { HB: 200, HRC: 30, HRB: 95, HV: 210 },
  { HB: 250, HRC: 35, HRB: null, HV: 260 },
  { HB: 300, HRC: 40, HRB: null, HV: 310 },
  { HB: 350, HRC: 45, HRB: null, HV: 360 },
  { HB: 400, HRC: 49, HRB: null, HV: 410 },
  { HB: 450, HRC: 52, HRB: null, HV: 460 },
  { HB: 500, HRC: 54, HRB: null, HV: 510 }
];

// interpolation helper
function interpolate(x: number, x1: number, y1: number, x2: number, y2: number): number {
  const t = (x - x1) / (x2 - x1);
  return y1 + t * (y2 - y1);
}

// hardness converter
function convertHardness(value: number, from: keyof HardnessRow, to: keyof HardnessRow) {
  if (from === to) return value;

  const fromVals: number[] = [];
  const toVals: number[] = [];

  hardnessTable.forEach((row) => {
    if (row[from] != null && row[to] != null) {
      fromVals.push(row[from]!);
      toVals.push(row[to]!);
    }
  });

  if (value <= fromVals[0]) return toVals[0];
  if (value >= fromVals[fromVals.length - 1]) return toVals[toVals.length - 1];

  for (let i = 0; i < fromVals.length - 1; i++) {
    if (value >= fromVals[i] && value <= fromVals[i + 1])
      return interpolate(value, fromVals[i], toVals[i], fromVals[i + 1], toVals[i + 1]);
  }

  return value;
}

/* ----------------------------
   SURFACE FINISH CONVERSION
-----------------------------*/
function convertSurfaceFinish(value: number, from: string, to: string): number {
  if (from === to) return value;

  let Ra = value;

  if (from === "Rz") Ra = value / 4;
  if (from === "RMS") Ra = value / 1.1;

  if (to === "Rz") return Ra * 4;
  if (to === "RMS") return Ra * 1.1;

  return Ra;
}

/* ----------------------------
   CHEMICAL CONCENTRATION
-----------------------------*/
function convertConcentration(value: number, from: string, to: string): number {
  if (from === to) return value;

  if (from === "mol/L" && to === "mmol/L") return value * 1000;
  if (from === "mmol/L" && to === "mol/L") return value / 1000;

  if (from === "g/L" && to === "mg/L") return value * 1000;
  if (from === "mg/L" && to === "g/L") return value / 1000;

  if (from === "ppm" && to === "mg/L") return value;
  if (from === "mg/L" && to === "ppm") return value;

  return value;
}

/* ----------------------------
   DYNAMIC VISCOSITY
-----------------------------*/
function convertViscosity(value: number, from: string, to: string): number {
  if (from === to) return value;
  if (from === "cP" && to === "Pa·s") return value / 1000;
  if (from === "Pa·s" && to === "cP") return value * 1000;
  return value;
}

/* ----------------------------
   SPECIFIC GRAVITY ↔ API
-----------------------------*/
function convertSG(value: number, from: string, to: string): number {
  if (from === "SG" && to === "API") return 141.5 / value - 131.5;
  if (from === "API" && to === "SG") return 141.5 / (value + 131.5);
  return value;
}

/* ----------------------------
   TEMPERATURE
-----------------------------*/
function convertTemp(value: number, from: string, to: string): number {
  if (from === to) return value;

  let C =
    from === "C" ? value :
    from === "F" ? (value - 32) * 5/9 :
    value - 273.15;

  if (to === "C") return C;
  if (to === "F") return C * 9/5 + 32;
  return C + 273.15;
}

/* ----------------------------
   MAIN CONVERTER
-----------------------------*/
export function convertUnit(category: string, value: number, from: string, to: string) {
  const cat = unitCategories[category];

  if (cat.special) {
    if (category === "temperature") return convertTemp(value, from, to);
    if (category === "specific_gravity") return convertSG(value, from, to);
    if (category === "viscosity_dynamic") return convertViscosity(value, from, to);
    if (category === "surface_finish") return convertSurfaceFinish(value, from, to);
    if (category === "concentration") return convertConcentration(value, from, to);
    if (category === "hardness") return convertHardness(value, from as any, to as any);
  }

  const units = cat.units;
  const base = value * units[from];
  return base / units[to];
}
