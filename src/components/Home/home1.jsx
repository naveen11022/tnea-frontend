import { useEffect, useState } from "react";
import Cutoff, { Year, Region, Category, Branch, Group, CollegeType } from "./Filters";
import College from "./table.jsx";
import { Layout, Row, Col, Button, Input, Checkbox, Spin, Space } from "antd";
import { 
  SearchOutlined, 
  DownloadOutlined, 
  FilterOutlined, 
  EnvironmentOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined 
} from "@ant-design/icons";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "./home.css";

const { Header, Content, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(true);
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
  const [group, setGroup] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [storeDistricts, setStoreDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collegeType, setCollegeType] = useState([]);

  useEffect(() => {
    if (region.length > 0) {
      setCollapsed(false); // Open sidebar when region is selected
    } else {
      setCollapsed(true); // Close sidebar when no region selected
    }
  }, [region]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        if (region.length > 0) {
          const response = await fetch("https://tnea-backend-5keh.onrender.com/districts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ District: region }),
          });
          if (!response.ok) throw new Error(`Server error: ${response.status}`);
          const data = await response.json();
          setDistricts(data);
          setStoreDistricts([]);
        } else {
          setDistricts([]);
          setStoreDistricts([]);
        }
      } catch (err) {
        console.error("Failed to fetch districts:", err);
      }
    };
    fetchDistricts();
  }, [region]);

  const handleSearch = async () => {
    if (
      year.length === 0 &&
      region.length === 0 &&
      category.length === 0 &&
      branch.length === 0 &&
      group.length === 0 &&
      collegeType.length === 0 &&
      !cutoffOption
    ) {
      alert("Please select at least one filter option before searching.");
      return;
    }

    if (cutoffOption) {
      if (cutoffOption === "between" && (first_value.length === 0 || second_value.length === 0)) {
        alert("Please enter both lower and upper cutoff values.");
        return;
      }
      if (cutoffOption !== "between" && first_value.length === 0) {
        alert("Please enter the cutoff value.");
        return;
      }
      if (first_value[0] > (second_value[0] ?? first_value[0])) {
        alert("Low limit may not be greater than high limit.");
        return;
      }
    }

    const requestBody = {
      Year: year,
      Department: branch,
      Region: region,
      District: storeDistricts,
      Community: category,
      Cutoff: cutoffOption ? [cutoffOption] : [],
      FirstValue: first_value ?? [],
      SecondValue: second_value ?? [],
      Group: group ?? [],
      CollegeType: collegeType ?? [],
    };

    try {
      setLoading(true);
      const response = await fetch("https://tnea-backend-5keh.onrender.com/fetch_data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      const updatedData = data.map((item, index) => ({ ...item, id: index + 1 }));
      setCollegeData(updatedData);
      setDisplayData(true);
      setFilteredInfo({});
      setSortedInfo({});
      setFirstValue([]);
      setSecondValue([]);
      setCutoffOption("");
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!collegeData.length) {
      alert("No data available to download");
      return;
    }

    const doc = new jsPDF();
    const columns = Object.keys(collegeData[0]);
    const rows = collegeData.map((row) => columns.map((col) => row[col]));

    autoTable(doc, {
      head: [columns],
      body: rows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [59, 130, 246], textColor: 255 },
      startY: 20,
    });

    doc.save("college_data.pdf");
  };

  return (
    <Layout className="main-layout">
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        onBreakpoint={setCollapsed}
        width={280}
        collapsedWidth={0}
        trigger={null}
        className="sidebar"
      >
        <div className="sidebar-header">
          <EnvironmentOutlined className="sidebar-icon" />
          {!collapsed && <span className="sidebar-title">Districts</span>}
        </div>
        <div className="sidebar-content">
          {districts.length > 0 ? (
            <Checkbox.Group
              className="district-group"
              value={storeDistricts}
              onChange={setStoreDistricts}
            >
              {districts.map((district) => (
                <Checkbox key={district} value={district} className="district-item">
                  {district}
                </Checkbox>
              ))}
            </Checkbox.Group>
          ) : (
            <div className="sidebar-empty">
              <p>Select a region to see districts</p>
            </div>
          )}
        </div>
      </Sider>

      <Layout className={`content-layout ${collapsed ? 'collapsed' : ''}`}>
        {/* Header */}
        <Header className="main-header">
          <div className="header-left">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="menu-toggle"
            />
            <div className="logo">
              <span className="logo-icon">🎓</span>
              <h1 className="logo-text">TNEA College Finder</h1>
            </div>
          </div>
          <p className="header-subtitle">Tamil Nadu Engineering Admissions</p>
        </Header>

        {/* Content */}
        <Content className="main-content">
          <Spin spinning={loading} tip="Searching..." size="large">
            {/* Filter Card */}
            <div className="card filter-card">
              <div className="card-header">
                <FilterOutlined className="header-icon" />
                <h2>Search Filters</h2>
              </div>
              <div className="card-body">
                <Row gutter={[16, 20]}>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <div className="filter-item">
                      <label className="label">Year</label>
                      <Year value={year} onChange={setYear} />
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <div className="filter-item">
                      <label className="label">Region</label>
                      <Region value={region} onChange={setRegion} />
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <div className="filter-item">
                      <label className="label">Community</label>
                      <Category value={category} onChange={setCategory} />
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <div className="filter-item">
                      <label className="label">Department</label>
                      <Branch value={branch} onChange={(v) => { setBranch(v); if (v.length) setGroup([]); }} disabled={group.length > 0} />
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <div className="filter-item">
                      <label className="label">Course</label>
                      <Group value={group} onChange={(v) => { setGroup(v); if (v.length) setBranch([]); }} disabled={branch.length > 0} />
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <div className="filter-item">
                      <label className="label">College Type</label>
                      <CollegeType value={collegeType} onChange={setCollegeType} />
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <div className="filter-item">
                      <label className="label">Cutoff Type</label>
                      <Cutoff value={cutoffOption} onChange={(v) => { setCutoffOption(v); setFirstValue([]); setSecondValue([]); }} />
                    </div>
                  </Col>
                  {cutoffOption && (
                    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                      <div className="filter-item">
                        <label className="label">Cutoff Value</label>
                        {cutoffOption === "between" ? (
                          <Space.Compact style={{ width: '100%' }}>
                            <Input type="number" step="0.1" value={first_value?.[0] ?? ""} onChange={(e) => setFirstValue([parseFloat(e.target.value)])} placeholder="Min" />
                            <Input type="number" step="0.1" value={second_value?.[0] ?? ""} onChange={(e) => setSecondValue([parseFloat(e.target.value)])} placeholder="Max" />
                          </Space.Compact>
                        ) : (
                          <Input type="number" step="0.1" value={first_value?.[0] ?? ""} onChange={(e) => setFirstValue([parseFloat(e.target.value)])} placeholder="Enter value" />
                        )}
                      </div>
                    </Col>
                  )}
                </Row>
                <div className="divider" />
                <div className="action-buttons">
                  <Button type="primary" size="large" icon={<SearchOutlined />} onClick={handleSearch}>
                    Search Colleges
                  </Button>
                  {displayData && (
                    <Button size="large" icon={<DownloadOutlined />} onClick={downloadPDF}>
                      Download PDF
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Results */}
            {displayData && (
              <div className="card results-card">
                <div className="card-header results-header">
                  <h2>Search Results</h2>
                  <span className="results-count">{collegeData.length} colleges found</span>
                </div>
                <College
                  datasource={collegeData}
                  filteredInfo={filteredInfo}
                  sorted={sortedInfo}
                  set_sorted={setSortedInfo}
                  setFilteredInfo={setFilteredInfo}
                />
              </div>
            )}

            {/* Empty State */}
            {!displayData && (
              <div className="card empty-state">
                <div className="empty-icon">🎓</div>
                <h3>Find Your Dream College</h3>
                <p>Search through Government, Govt Aided, and Self-Financing colleges across Tamil Nadu. Select filters above to get started.</p>
              </div>
            )}
          </Spin>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
