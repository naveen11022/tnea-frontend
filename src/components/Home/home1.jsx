import React, { useState } from "react";
import Cutoff, { Year, Region, Category, Branch } from "./Filters";
import College from "./table.jsx";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Row, Col, Button, Input } from "antd";

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [year, setYear] = useState([]);
  const [region, setRegion] = useState([]);
  const [category, setCategory] = useState([]);
  const [branch, setBranch] = useState([]);
  const [collegeData, setCollegeData] = useState([]);
  const [displayData, setDisplayData] = useState(false);
  const [cutoffOption, setCutoffOption] = useState("");
  const [first_value, setFirstValue] = useState([]);
  const [second_value, setSecondValue] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleSearch = async () => {
    if (
      year.length === 0 &&
      region.length === 0 &&
      category.length === 0 &&
      branch.length === 0 &&
      !cutoffOption
    ) {
      alert("Please select at least one filter option before searching.");
      return;

    }
    else if (cutoffOption) {
  if (cutoffOption === "between" && (first_value.length === 0 || second_value.length === 0)) {
    alert("Please enter both lower and upper cutoff values.");
    return;
  }
  if (cutoffOption !== "between" && first_value.length === 0) {
    alert("Please enter the cutoff value.");
    return;
  }
  if(first_value[0] > second_value[0])
  {
    alert("low limit may not bigger than high limit")
    return;
  }
}

    const requestBody = {
      Year: year,
      Department: branch,
      Region: region,
      Community: category,
      Cutoff: cutoffOption ? [cutoffOption] : [],
      FirstValue: first_value ?? [],
      SecondValue: second_value ?? [],
    };

    try {
      const response = await fetch("http://localhost:8000/fetch_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
         new Error(`Server error: ${response.status}`);
      }

     const data = await response.json();

    const updatedData = data.map((item, index) => ({
      ...item,
      id: index+1
    }));

    setCollegeData(updatedData);
    setFirstValue([]);
    setSecondValue([]);
    setDisplayData(true);
    setFilteredInfo({});
    setSortedInfo({});
    setCutoffOption("");

    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to fetch data.");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
  collapsible
  collapsed={collapsed}
  onCollapse={(value) => setCollapsed(value)}
  breakpoint="lg"
  onBreakpoint={(broken) => setCollapsed(broken)}
>
  <div className="demo-logo-vertical" />
  <Menu
    theme="dark"
    defaultSelectedKeys={["1"]}
    mode="inline"
    items={items}
  />
</Sider>


      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={10} lg={8} xl={4} >
                <Year value={year} onChange={setYear} />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Region value={region} onChange={setRegion} />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={4} >
                <Category value={category} onChange={setCategory} />
              </Col>
              <Col xs={24} sm={13} md={11} lg={9} xl={7} >
                <Branch value={branch} onChange={setBranch} />
              </Col>
              <Col xs={24} sm={13} md={9} lg={7} xl={5}>
                <Cutoff
                  value={cutoffOption}
                  onChange={(value) => {
                    setCutoffOption(value);
                    setFirstValue([]);
                    setSecondValue([]);
                  }}
                />
                {cutoffOption === "between" ? (
                  <div style={{ marginTop: 8 }}>
                    <Input
                         type = "number"
                        step = "0.1"
                      value={first_value?.[0] ?? ""}
                      onChange={(e) =>
                        setFirstValue([parseFloat(e.target.value)])
                      }
                      placeholder="Enter the low limit"
                      style={{ marginBottom: 8, width: "100%" }}
                    />
                    <Input
                         type = "number"
                        step = "0.1"
                      value={second_value?.[0] ?? ""}
                      onChange={(e) =>
                        setSecondValue([parseFloat(e.target.value)])
                      }
                      placeholder="Enter the high limit"
                      style={{ width: "100%" }}
                    />
                  </div>
                ) : cutoffOption ? (
                  <div style={{ marginTop: 8 }}>
                    <Input
                        type = "number"
                        step = "0.1"
                      value={first_value?.[0] ?? ""}
                      onChange={(e) =>
                        setFirstValue([parseFloat(e.target.value)])
                      }
                      placeholder="Enter the Cutoff"
                      style={{ width: "100%" }}
                    />
                  </div>
                ) : null}
              </Col>
            </Row>

            <Row style={{ marginTop: "1rem" }}>
              <Col xs={24} sm={12} md={6} xl={4}>
                <Button type="primary" block onClick={handleSearch}>
                  Search
                </Button>
              </Col>
            </Row>

            <Row style={{ marginTop: "2rem" }}>
              <Col span={24}>
                {displayData ? <College datasource={collegeData} filteredInfo={filteredInfo} sorted={sortedInfo}
                                        set_soretd={setSortedInfo} setFilteredInfo={setFilteredInfo} /> : null}

              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
