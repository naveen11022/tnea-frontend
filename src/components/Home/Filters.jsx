import { Select, Input } from "antd";
import { useEffect, useState } from "react";

export function Branch({ value, onChange }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch("http://localhost:8000/get_branch");
        const data = await response.json();
        const formattedOptions = data.map(item => ({
          value: item[0],
          label: item[1]
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    };
    fetchBranches();
  }, []);

  return (
    <Select
      style={{ width: "100%" }}
      value={value}
      allowClear
      mode="multiple"
      placeholder="Select Department"
      onChange={onChange}
      options={options}
      optionFilterProp="label"
    />
  );
}

export function Category({ value, onChange, }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/get_category");
        const data = await response.json();
        const formattedOptions = data.map(item => ({
          value: item,
          label: item,
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Select
      style={{ width: "100%" }}
      value={value}
      allowClear
      mode="multiple"
      placeholder="Select Community"
      onChange={onChange}
      options={options}
      optionFilterProp="label"
    />
  );
}

export function Region({ value, onChange }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const response = await fetch("http://localhost:8000/get_region");
        const data = await response.json();
        const formattedOptions = data.map(item => ({
          value: item,
          label: item,
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching region data:", error);
      }
    };
    fetchRegion();
  }, []);

  return (
    <Select
      style={{ width: "100%" }}
      value={value}
      allowClear
      mode="multiple"
      placeholder="Select Region"
      onChange={onChange}
      options={options}
    />
  );
}

export function Year({ value, onChange }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchYear = async () => {
      try {
        const response = await fetch("http://localhost:8000/get_year");
        const data = await response.json();
        const formattedOptions = data.map(item => ({
          value: item,
          label: item,
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching year data:", error);
      }
    };
    fetchYear();
  }, []);

  return (
    <Select
      style={{ width: "100%" }}
      value={value}
      allowClear
      mode="multiple"
      placeholder="Select Year"
      onChange={onChange}
      options={options}
    />
  );
}

export default function Cutoff({ value, onChange,disabled }) {

  const options = [
    { label: "Greater Than", value: ">" },
    { label: "Greater Than or Equal", value: ">=" },
    { label: "Less Than", value: "<" },
    { label: "Less Than or Equal", value: "<=" },
    { label: "Equal To", value: "=" },
    { label: "Between", value: "between" },
  ];

  return (
      <Select
        style={{ width: "100%"}}
        placeholder="Select Cutoff"
        options={options}
        value={value || undefined}
        onChange={onChange}
        disabled={disabled}
      />

)};