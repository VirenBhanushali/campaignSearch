import Table from "react-bootstrap/Table";

function TableComponent(props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>User Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Active</th>
          <th>Budget</th>
        </tr>
      </thead>
      <tbody>
        {props.campaigns.map((campaign) => {
          return (
            <tr>
              <td>Campaign {campaign.id}</td>
              <td>{campaign.name}</td>
              <td>{campaign.startDate}</td>
              <td>{campaign.endDate}</td>
              <td>{campaign.Budget}</td>
              <td>active</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default TableComponent;
