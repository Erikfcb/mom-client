import React, { useCallback } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import { Table, Button } from "reactstrap";

// console.log("data :", data);

// TODO: if it's vacation then mark this line with yellow background
// TODO: merge first+last name into one <th> tag
// TODO: automatically sort by date created
// TODO: add filters
// TODO: add checkbox to show only vacations
// TODO: add checkbox to show only work
// TODO: add search bar by name or description

const formatDates = dates => {
  const formattedFrom = format(new Date(dates.from), "d/MM/yyyy");
  const formattedTo = format(new Date(dates.to), "d/MM/yyyy");
  return (
    <div>
      {formattedFrom} -<br /> {formattedTo}
    </div>
  );
};

const DataTable = ({ data, handleDelete }) => {
  const createBody = useCallback(
    () =>
      data.map((item, index) => (
        <Row
          key={index}
          stripe={index % 2}
          dayOff={item.dayOff}
          sick={item.sick}
        >
          <Head scope="row">{index + 1}</Head>
          <Cell>{item.firstName + " " + item.lastName}</Cell>
          <Cell>{item.id}</Cell>
          <Cell>{item.phone}</Cell>
          <Cell ltr>{formatDates(item.dates)}</Cell>
          <Cell>{item.description}</Cell>
          <Cell> {item.sick ? "כן" : "לא"}</Cell>
          <Cell>{item.dayOff ? "כן" : "לא"}</Cell>
          <Cell>
            <Actions>
              <CustomButton
                color="danger"
                onClick={() => handleDelete(item._id)}
              >
                מחק
              </CustomButton>
            </Actions>
          </Cell>
        </Row>
      )),
    [data, handleDelete]
  );

  return (
    <CustomTable responsive>
      <thead>
        <Row>
          <Head>#</Head>
          <Head>שם מלא</Head>
          <Head>ת.ז.</Head>
          <Head>טלפון</Head>
          <Head>תאריכים</Head>
          <Head>תיאור</Head>
          <Head>מחלה</Head>
          <Head>חופש</Head>
          <Head></Head>
        </Row>
      </thead>

      <tbody>{data.length ? createBody() : []}</tbody>
    </CustomTable>
  );
};

export default DataTable;

const Cell = styled.td`
  max-width: ${100 / 9}%;
  flex-grow: 1;
  direction: ${({ ltr }) => (ltr ? "ltr" : "rtl")};
  display: flex;
  border-right: 1px solid #dee2e6;
`;

const Row = styled.tr`
  direction: rtl;
  display: flex;
  width: 100%;
  background-color: ${props => {
    if (props.dayOff) {
      return "#ffffaa";
    }

    if (props.sick) {
      return "#ffaacd";
    }

    return props.stripe ? "#f4f6f7" : "";
  }};
`;

const Head = styled.th`
  max-width: ${100 / 9}%;
  direction: rtl;
  display: flex;
  flex-grow: 1;
  border-right: 1px solid #dee2e6;
`;

const CustomButton = styled(Button)`
  height: 50px;
  margin-right: 50px;
`;

const Actions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const CustomTable = styled(Table)`
  margin-top: 20px;
`;
