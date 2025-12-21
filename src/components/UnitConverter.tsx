// src/components/UnitConverter.tsx

import React, { useEffect, useState } from "react";
import { unitCategories } from "../utils/unitData";
import { convertUnit } from "../utils/convertUnits";
console.log("🔵 UnitConverter.tsx LOADED — keys:", Object.keys(unitCategories));
export default function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  // Get category info from unitData
  const categoryData = unitCategories[category];

  // Determine available units
  const unitList = categoryData.special
    ? categoryData.units // array of strings
    : Object.keys(categoryData.units); // normal SI units

  // Auto-set default units when category changes
  useEffect(() => {
    setFromUnit(unitList[0]);
    setToUnit(unitList.length > 1 ? unitList[1] : unitList[0]);
  }, [category]);

  // Perform conversion
  const handleConvert = () => {
    if (value === "") return;
    const numericValue = parseFloat(value);
    const res = convertUnit(category, numericValue, fromUnit, toUnit);
    setResult(res.toString());
  };

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h2>Engineering Unit Converter</h2>

      {/* CATEGORY SELECT */}
      <label>Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      >
        {Object.keys(unitCategories).map((cat) => (
          <option key={cat} value={cat}>
            {unitCategories[cat].label}
          </option>
        ))}
      </select>

      {/* FROM UNIT SELECT */}
      <label>From Unit</label>
      <select
        value={fromUnit}
        onChange={(e) => setFromUnit(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      >
        {unitList.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </select>

      {/* TO UNIT SELECT */}
      <label>To Unit</label>
      <select
        value={toUnit}
        onChange={(e) => setToUnit(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      >
        {unitList.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </select>

      {/* VALUE INPUT */}
      <label>Value</label>
      <input
        type="number"
        placeholder="Enter value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={handleConvert} style={{ marginTop: 10 }}>
        Convert
      </button>

      {result !== "" && (
        <p style={{ marginTop: 15 }}>
          <strong>Result:</strong> {result}
        </p>
      )}
    </div>
  );
}
