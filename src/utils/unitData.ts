export const unitCategories = {
  length: {
    label: "Length",
    units: {
      m: 1,
      cm: 0.01,
      mm: 0.001,
      km: 1000,
      inch: 0.0254,
      ft: 0.3048,
      yard: 0.9144,
      mile: 1609.34
    }
  },

  mass: {
    label: "Mass",
    units: {
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      lb: 0.453592,
      ton: 1000
    }
  },

  force: {
    label: "Force",
    units: {
      N: 1,
      kN: 1000,
      MN: 1_000_000,
      lbf: 4.44822,
      kgf: 9.80665
    }
  },

  pressure: {
    label: "Pressure",
    units: {
      Pa: 1,
      kPa: 1000,
      MPa: 1_000_000,
      bar: 100000,
      psi: 6894.76
    }
  },

  temperature: {
    label: "Temperature",
    special: true,
    units: ["C", "F", "K"]
  },

  volume: {
    label: "Volume",
    units: {
      m3: 1,
      L: 0.001,
      mL: 0.000001,
      ft3: 0.0283168,
      gal: 0.00378541
    }
  },

  density: {
    label: "Density",
    units: {
      "kg/m3": 1,
      "g/cm3": 1000,
      "lb/ft3": 16.0185
    }
  },

  viscosity_dynamic: {
    label: "Dynamic Viscosity",
    special: true,
    units: ["cP", "Pa·s"]
  },

  surface_finish: {
    label: "Surface Roughness",
    special: true,
    units: ["Ra", "Rz", "RMS"]
  },

  specific_gravity: {
    label: "Specific Gravity",
    special: true,
    units: ["SG", "API"]
  },

  concentration: {
    label: "Chemical Concentration",
    special: true,
    units: ["mol/L", "mmol/L", "g/L", "mg/L", "ppm"]
  },

  hardness: {
    label: "Metal Hardness",
    special: true,
    units: ["HB", "HRC", "HRB", "HV"]
  }
};
