import { Table } from "antd";
import { useState, useMemo } from "react";

const College = ({ datasource, filteredInfo, setFilteredInfo, sorted, set_sorted }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
    set_sorted(sorter);
    setFilteredInfo(filters);
  };

  // Get filtered data based on current filters
  const getFilteredData = useMemo(() => {
    let filtered = [...datasource];
    
    Object.keys(filteredInfo).forEach(key => {
      const filterValues = filteredInfo[key];
      if (filterValues && filterValues.length > 0) {
        filtered = filtered.filter(record => filterValues.includes(record[key]));
      }
    });
    
    return filtered;
  }, [datasource, filteredInfo]);

  // Generate dynamic filters based on filtered data (excluding current column's filter)
  const getFiltersForColumn = (columnKey) => {
    let filtered = [...datasource];
    
    // Apply all filters except the current column
    Object.keys(filteredInfo).forEach(key => {
      if (key !== columnKey) {
        const filterValues = filteredInfo[key];
        if (filterValues && filterValues.length > 0) {
          filtered = filtered.filter(record => filterValues.includes(record[key]));
        }
      }
    });
    
    const uniqueValues = [...new Set(filtered.map(item => item[columnKey]))].filter(v => v != null);
    return uniqueValues.map(value => ({ text: String(value), value }));
  };

  const columns = [
    { 
      title: "S.No", 
      key: "sno", 
      width: 60,
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1
    },
    {
      title: "College Code",
      dataIndex: "college_code",
      key: "college_code",
      width: 110,
      filters: getFiltersForColumn('college_code'),
      onFilter: (value, record) => record.college_code === value,
      filterSearch: true,
      sorter: (a, b) => a.college_code - b.college_code,
      filteredValue: filteredInfo.college_code || null,
      sortOrder: sorted.columnKey === "college_code" ? sorted.order : null,
      render: (text) => <span style={{ color: '#1a3a5c', fontWeight: 500 }}>{text}</span>
    },
    {
      title: "College Name",
      dataIndex: "college_name",
      key: "college_name",
      filters: getFiltersForColumn('college_name'),
      onFilter: (value, record) => record.college_name === value,
      filterSearch: true,
      filteredValue: filteredInfo.college_name || null,
      sorter: (a, b) => a.college_name.localeCompare(b.college_name),
      sortOrder: sorted.columnKey === "college_name" ? sorted.order : null,
    },
    {
      title: "Branch",
      dataIndex: "branch_name",
      key: "branch_name",
      filters: getFiltersForColumn('branch_name'),
      onFilter: (value, record) => record.branch_name === value,
      filterSearch: true,
      filteredValue: filteredInfo.branch_name || null,
    },
    {
      title: "Category",
      dataIndex: "allotted_category",
      key: "allotted_category",
      width: 110,
      filters: getFiltersForColumn('allotted_category'),
      onFilter: (value, record) => record.allotted_category === value,
      filterSearch: true,
      filteredValue: filteredInfo.allotted_category || null,
    },
    { title: "Cutoff", dataIndex: "aggr_mark", key: "aggr_mark", width: 80 },
    {
      title: "Community",
      dataIndex: "community",
      key: "community",
      width: 100,
      filters: getFiltersForColumn('community'),
      onFilter: (value, record) => record.community === value,
      filterSearch: true,
      filteredValue: filteredInfo.community || null,
    },
    { title: "Gen Rank", dataIndex: "general_rank", key: "general_rank", width: 90 },
    { title: "Comm Rank", dataIndex: "community_rank", key: "community_rank", width: 100 },
    {
      title: "Round",
      dataIndex: "round",
      key: "round",
      width: 80,
      filters: getFiltersForColumn('round'),
      onFilter: (value, record) => record.round === value,
      filterSearch: true,
      filteredValue: filteredInfo.round || null,
    },
    { title: "Year", dataIndex: "year", key: "year", width: 70 },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={datasource}
      onChange={handleTableChange}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} colleges`,
      }}
      scroll={{ x: 1000 }}
      size="middle"
    />
  );
};

export default College;
