import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

function TableComponent(props) {
  function checkActiveness(startDate, endDate) {
    const currentDatePlaceHolder = new Date();
    const currentDate = currentDatePlaceHolder.getTime();
    const StartDateplaceHolder = new Date(startDate);
    const startDateTemp = StartDateplaceHolder.getTime();
    const endDateplaceHolder = new Date(endDate);
    const endDateTemp = endDateplaceHolder.getTime();
    if (currentDate > startDateTemp && currentDate < endDateTemp) {
      return "active";
    } else {
      return "inactive";
    }
  }
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  function formatDate(date) {
    let dateTemp = new Date(date);
    return dateTemp.toISOString().split("T")[0];
  }

  return (
    <Table
      className="table table-striped table caption-top"
      bordered
      hover
      variant="light"
      style={{ maxWidth: "80%", margin: "auto" }}
    >
      <caption
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}
      >
        List of Campaigns
      </caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>User Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Budget</th>
          <th>Active</th>
        </tr>
      </thead>
      <tbody>
        {props.campaigns.map((campaign, idx) => {
          return (
            <tr key={idx}>
              <td>Campaign {campaign.id}</td>
              <td>{campaign?.name ? campaign.name : "Unknow User"}</td>
              <td>{formatDate(campaign.startDate)}</td>
              <td>{formatDate(campaign.endDate)}</td>
              <td>{USDollar.format(campaign.Budget)}</td>
              <td>
                <Badge
                  bg={`${
                    checkActiveness(campaign.startDate, campaign.endDate) ===
                    "active"
                      ? "success"
                      : "danger"
                  }`}
                >
                  {checkActiveness(campaign.startDate, campaign.endDate)}
                </Badge>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default TableComponent;
