import { Input, Switch, Typography, Space, Card } from "antd";
import { useState } from "react";

const { Text } = Typography;

function Ranks({ rankValue, cutoffValue, onRankChange, onCutoffChange }) {
  const [open, setOpen] = useState(true);

  return (
    <Card
      bordered
      style={{
        width: "100%",
        borderRadius: 12,
        padding: 16,
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }} size={12}>
        <Space align="center" style={{ justifyContent: "space-between", width: "100%" }}>
          <Text strong style={{ fontSize: 16 }}>
            {open ? "Rank Mode" : "Cutoff Mode"}
          </Text>

          <Switch
            checkedChildren="Rank"
            unCheckedChildren="Cutoff"
            checked={open}
            onChange={setOpen}
            style={{ backgroundColor: open ? "orange" : "#1677ff" }}
          />
        </Space>

        {open ? (
          <Input
            type="number"
            placeholder="Enter Rank"
            value={rankValue}
            onChange={(e) => onRankChange(e.target.value)}
            size="large"
          />
        ) : (
          <Input
            type="number"
            placeholder="Enter Cutoff"
            value={cutoffValue}
            onChange={(e) => onCutoffChange(e.target.value)}
            size="large"
          />
        )}
      </Space>
    </Card>
  );
}

export default Ranks;
