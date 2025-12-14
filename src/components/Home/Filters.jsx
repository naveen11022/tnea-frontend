import { Select } from "antd";
import { useEffect, useState } from "react";

const selectProps = {
  style: { width: "100%" },
  allowClear: true,
  maxTagCount: "responsive",
  optionFilterProp: "label",
};

export function Branch({ value, onChange, disabled }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/get_branch");
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
      {...selectProps}
      value={value}
      mode="multiple"
      placeholder="Select department..."
      onChange={onChange}
      options={options}
      disabled={disabled}
    />
  );
}

export function Category({ value, onChange }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/get_category");
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
      {...selectProps}
      value={value}
      mode="multiple"
      placeholder="Select community..."
      onChange={onChange}
      options={options}
    />
  );
}

export function Region({ value, onChange }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/get_region");
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
      {...selectProps}
      value={value}
      mode="multiple"
      placeholder="Select region..."
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
        const response = await fetch("http://127.0.0.1:8000/get_year");
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
      {...selectProps}
      value={value}
      mode="multiple"
      placeholder="Select year..."
      onChange={onChange}
      options={options}
    />
  );
}

export default function Cutoff({ value, onChange, disabled }) {
  const options = [
    { label: "Greater Than (>)", value: ">" },
    { label: "Greater or Equal (≥)", value: ">=" },
    { label: "Less Than (<)", value: "<" },
    { label: "Less or Equal (≤)", value: "<=" },
    { label: "Equal To (=)", value: "=" },
    { label: "Between", value: "between" },
  ];

  return (
    <Select
      style={{ width: "100%" }}
      placeholder="Select type..."
      options={options}
      value={value || undefined}
      onChange={onChange}
      disabled={disabled}
      allowClear
    />
  );
}

export function Group({ value, onChange, disabled }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/get_branch_category");
        const data = await response.json();
        const formattedOptions = data.map(item => ({
          value: item,
          label: item,
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };
    fetchGroups();
  }, []);

  return (
    <Select
      {...selectProps}
      value={value || []}
      mode="multiple"
      placeholder="Select course..."
      onChange={onChange}
      options={options}
      disabled={disabled}
    />
  );
}

export function CollegeType({ value, onChange }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchCollegeTypes = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/college_type");
        const data = await response.json();
        const formattedOptions = data.map(item => ({
          value: item,
          label: item,
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching college type data:", error);
      }
    };
    fetchCollegeTypes();
  }, []);

  return (
    <Select
      {...selectProps}
      value={value}
      mode="multiple"
      placeholder="Select college type..."
      onChange={onChange}
      options={options}
    />
  );
}
