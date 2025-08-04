import {Spin, Table} from "antd";

const College = ({ datasource, filteredInfo, setFilteredInfo, sorted, set_soretd }) => {
  const handle_Filter_Change = (pagination, filters,sorted) => {
    set_soretd(sorted);
    setFilteredInfo(filters);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },

    {
      title: "College Code",
      dataIndex: "college_code",
      key: "college_code",
      filters: [...new Set(datasource.map(item => item.college_code))].map(value => ({
        text: value,
        value,
      })),
      onFilter: (value, record) => record.college_code === value,
      filterSearch: true,
      sorter: (a, b) => a.college_code - b.college_code,
      filteredValue: filteredInfo.college_code || null,
      sortOrder: sorted.columnKey === 'college_code' ? sorted.order : null,
    },

    {
      title: "College Name",
      dataIndex: "college_name",
      key: "college_name",
      filters: [...new Set(datasource.map(item => item.college_name))].map(value => ({
        text: value,
        value,
      })),
      onFilter: (value, record) => record.college_name === value,
      filterSearch: true,
      filteredValue: filteredInfo.college_name || null,
    },

    {
      title: "Branch Name",
      dataIndex: "branch_name",
      key: "branch_name",
      filters: [...new Set(datasource.map(item => item.branch_name))].map(value => ({
        text: value,
        value,
      })),
      onFilter: (value, record) => record.branch_name === value,
      filterSearch: true,
      filteredValue: filteredInfo.branch_name || null,
    },

    {
      title: "Allotted Category",
      dataIndex: "allotted_category",
      key: "allotted_category",
      filters: [...new Set(datasource.map(item => item.allotted_category))].map(value => ({
        text: value,
        value,
      })),
      onFilter: (value, record) => record.allotted_category === value,
      filterSearch: true,
      filteredValue: filteredInfo.allotted_category || null,
    },


    { title: "Aggregate Mark", dataIndex: "aggr_mark", key: "aggr_mark" },
    { title: "Community", dataIndex: "community", key: "community" },
    { title: "General Rank", dataIndex: "general_rank", key: "general_rank" },
    { title: "Community Rank", dataIndex: "community_rank", key: "community_rank" },
       {
      title: "Round",
      dataIndex: "round",
      key: "round",
      filters: [...new Set(datasource.map(item => item.round))].map(value => ({
        text: value,
        value,
      })),
      onFilter: (value, record) => record.round === value,
      filterSearch: true,
      filteredValue: filteredInfo.round || null,
    },
    { title: "Year", dataIndex: "year", key: "year" },
  ];

  return (
      <div>
         <Table
      columns={columns}
      dataSource={datasource}
      onChange={handle_Filter_Change}
    />

      </div>

  );
};

export default College;
