import { Input, Switch } from "antd";
import { useState } from "react";

function Ranks({ rankValue, cutoffValue, onRankChange, onCutoffChange }) {
  const [open, setOpen] = useState(true);



  const handleToggle = (checked) => {
    setOpen(checked);
  };

  return (
      <div>
        <Switch
          checkedChildren="Rank"
          unCheckedChildren="Cutoff"
          checked={open}
          onChange={handleToggle}
          style={{ backgroundColor: open ? "orange" : "blue" }}
        />
        <div style={{ width: "100%" }}>
          {open ? (
            <Input
              type="number"
              placeholder="Enter the rank"
              value={rankValue}
              onChange={(e) => onRankChange(e.target.value)}
            />
          ) : (
            <Input
              type="number"
              placeholder="Enter the cutoff"
              value={cutoffValue}
              onChange={(e) => onCutoffChange(e.target.value)}
            />
          )}
        </div>
      </div>
  );
}

export default Ranks;
