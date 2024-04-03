import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import './index.css';
import { DatePicker, Space, Dropdown, Typography, Select, Table, Tag } from 'antd';
import { DownOutlined, SmileOutline, CaretDownOutlined } from '@ant-design/icons';
import axios from "axios";
import { useMediaQuery } from 'react-responsive';

export default function RebalancingStatus() {
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
	const [navVisible, showNavbar] = useState(isMobile ? false : true);
    const [paginationInfo, setPaginationInfo] = useState({
        current: 1,
        pageSize: 10
      });
    const [data, setData] = useState([]);
    const handleChange = pagination => {
        setPaginationInfo(pagination);
      };

    const columns = [
        {
        title: '상품명',
        dataIndex: 'name',
        key: 'name',
        onCell: (value, index) => {
            const trueIndex =
              index + paginationInfo.pageSize * (paginationInfo.current - 1);
            const obj = {
              children: value.name,
              props: {}
            };
            if (index >= 1 && value.name === data[trueIndex - 1].name) {
              obj.props.rowSpan = 0;
            } else {
              for (
                let i = 0;
                trueIndex + i !== data.length &&
                value.name === data[trueIndex + i].name;
                i += 1
              ) {
                obj.props.rowSpan = i + 1;
              }
            }
            return obj.props;
          },
        },
        {
        title: '분류',
        dataIndex: 'type',
        key: 'type',
        onCell: (value, index) => {
            const trueIndex =
              index + paginationInfo.pageSize * (paginationInfo.current - 1);
            const obj = {
              children: value.type,
              props: {}
            };
            if (index >= 1 && value.type === data[trueIndex - 1].type) {
              obj.props.rowSpan = 0;
            } else {
              for (
                let i = 0;
                trueIndex + i !== data.length &&
                value.type === data[trueIndex + i].type;
                i += 1
              ) {
                obj.props.rowSpan = i + 1;
              }
            }
            if (value.type === "공격형") console.log(trueIndex);
            console.log(obj)
            return obj.props;
          },
        },
        {
        title: '종목명',
        key: 'stock_name',
        dataIndex: 'stock_name'
        },
        {
        title: '위험도',
        key: 'danger',
        dataIndex: 'danger'
        },
        {
        title: '추천날짜',
        dataIndex: 'recom_date',
        key: 'recom_date',
        },
        {
        title: '매도 예정일',
        key: 'sell_date',
        dataIndex: 'sell_date'
        }
    ];

    const search = () => {
        axios.post('https://xpercent.io/api/ratb/get_rebalancing_info/', {
          })
          .then(function (response) {
            var data = response.data;
            console.log(data)
            setData(data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    useEffect(() => {
        search()
    }, [])

    return (
        <>
            <div className="App">
                <SideBar visible={navVisible} show={showNavbar} />
                <>
                    <div className="page page-with-navbar">
                        <div
                            className="portfolio-body"
                        >
                            <div
                                style={{
                                    margin: 10,
                                    fontWeight: 'bold'
                                }}
                            >
                                포트폴리오 목록
                            </div>
                            <Table 
                                columns={columns} 
                                dataSource={data} 
                                onChange={handleChange} 
                                size={'small'}
                                bordered />
                        </div>
                    </div>
                </>    
            </div>
        </>
    )
}