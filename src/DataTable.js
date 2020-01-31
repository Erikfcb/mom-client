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
  const formattedFrom = format(new Date(dates.from), "d MMMM, yyyy h:mm aa");
  const formattedTo = format(new Date(dates.to), "d MMMM, yyyy h:mm aa");
  return `${formattedFrom} - ${formattedTo}`;
};

const DataTable = ({ data, handleDelete }) => {
  const createBody = useCallback(
    () =>
      data.map((item, index) => (
        <Row key={index} stripe={index % 2} dayOff={item.dayOff}>
          <Head scope="row">{index + 1}</Head>
          <Cell>{item.firstName + " " + item.lastName}</Cell>
          <Cell>{item.id}</Cell>
          <Cell>{item.phone}</Cell>
          <Cell>{formatDates(item.dates)}</Cell>
          <Cell>{item.description}</Cell>
          <Cell>
            <Actions>
              {item.dayOff ? "כן" : "לא"}
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
    <Table responsive>
      <thead>
        <Row>
          <Head>#</Head>
          <Head>שם מלא</Head>
          <Head>ת.ז.</Head>
          <Head>טלפון</Head>
          <Head>תאריכים</Head>
          <Head>תיאור</Head>
          <Head>חופש</Head>
        </Row>
      </thead>

      <tbody>{data.length ? createBody() : []}</tbody>
    </Table>
  );
};

export default DataTable;

const Cell = styled.td`
  max-width: ${100 / 7}%;
  flex-grow: 1;
  direction: rtl;
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

    return props.stripe ? "#f4f6f7" : "";
  }};
`;

const Head = styled.th`
  max-width: ${100 / 7}%;
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
