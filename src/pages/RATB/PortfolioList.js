import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import './index.css'
import { DatePicker, Space, Dropdown, Typography, Select, Table, Tag } from 'antd';
import { DownOutlined, SmileOutline, CaretDownOutlined } from '@ant-design/icons';
import axios from "axios";
import dayjs from 'dayjs';
import { useMediaQuery } from 'react-responsive';

const { RangePicker } = DatePicker;

export default function PortfolioList() {

    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
	const [navVisible, showNavbar] = useState(isMobile ? false : true);
    const [product, setProduct] = useState("전체");
    const [type, setType] = useState("전체");
    const [buyDate, setBuyDate] = useState(dayjs().subtract(12, 'months'));
    const [sellDate, setSellDate] = useState(dayjs().add(1, 'months'));
    const [data, setData] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState({
        current: 1,
        pageSize: 10
      });

    const handleChange = (value) => {
        setProduct(value)
    };
    const handleTypeChange = (value) => {
        setType(value)
    };
    const handlePaginationChange = pagination => {
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
          title: '매수 날짜',
          key: 'buy_date',
          dataIndex: 'buy_date'
        },
        {
          title: '매도 날짜',
          key: 'sell_date',
          dataIndex: 'sell_date'
        },
        {
          title: '비중',
          key: 'weight',
          dataIndex: 'weight'
        },
      ];

    const search = () => {
        axios.post('https://xpercent.io/api/ratb/get_portfolio_list/', {
            buy_date: buyDate.format('YYYY-MM-DD'),
            sell_date: sellDate.format('YYYY-MM-DD'),
            name: product,
            type: type
          })
          .then(function (response) {
            var data = response.data;
            setData(data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    useEffect(() => {
        search();
    }, [])

    return (
        <>
            <div className="App">
                <SideBar visible={navVisible} show={showNavbar} />
                <>
                    <div className="page page-with-navbar">
                        <div
                            className="portfolio-header"
                        >
                            <div
                                className="portfolio-header-head"
                            >
                                목록 검색
                            </div>
                            <div
                                className="portfolio-header-select"
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                    className="inner-select"
                                >
                                    <div
                                        style={{
                                            marginRight: 10,
                                            fontSize: 12,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        기간
                                    </div>
                                    <RangePicker 
                                        size={'small'} 
                                        defaultValue={[buyDate, sellDate]}
                                        onChange={(dates, dateStrings) => {
                                            console.log(dateStrings)
                                            setBuyDate(dayjs(dateStrings[0]));
                                            setSellDate(dayjs(dateStrings[1]));
                                        }}    
                                    />
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                    className="inner-select"
                                >
                                    <div
                                        style={{
                                            marginRight: 10,
                                            fontSize: 12,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        상품
                                    </div>
                                    <Select
                                        defaultValue={product}
                                        style={{
                                            width: 120
                                        }}
                                        onChange={handleChange}
                                        size={"small"}
                                        options={[
                                            {
                                                value: '전체',
                                                label: '전체',
                                            },
                                            {
                                                value: '주식형1호',
                                                label: '주식형1호',
                                            },
                                            {
                                                value: '주식형2호',
                                                label: '주식형2호',
                                            },
                                            {
                                                value: '주식형3호',
                                                label: '주식형3호',
                                            },
                                            {
                                                value: '주식형4호',
                                                label: '주식형4호',
                                            },
                                        ]}
                                        />
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                    className="inner-select"
                                >
                                    <div
                                        style={{
                                            marginRight: 10,
                                            fontSize: 12,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        분류
                                    </div>
                                    <Select
                                        defaultValue={type}
                                        style={{
                                            width: 120
                                        }}
                                        size={'small'}
                                        onChange={handleTypeChange}
                                        options={[
                                            {
                                            value: '전체',
                                            label: '전체',
                                            },
                                            {
                                            value: '공격형',
                                            label: '공격형',
                                            },
                                            {
                                            value: '혼합형',
                                            label: '혼합형',
                                            },
                                            {
                                            value: '안전형',
                                            label: '안전형',
                                            },
                                        ]}
                                        />
                                </div>
                            </div>
                            <div
                                className="portfolio-header-button"
                                onClick={() => {
                                    console.log('working')
                                    search();
                                }}
                            >
                                조회 하기
                            </div>
                        </div>
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
                            <Table columns={columns} dataSource={data} size={'small'} onChange={handlePaginationChange} />
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}