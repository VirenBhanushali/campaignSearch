import { useEffect } from "react";
import {
  Card,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup,
  Row,
} from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { campaignSliceActions } from "../store/capmgainStore";

function SearchForm(props) {
  const dispatch = useDispatch();
  const { values, handleChange } = useFormik({
    initialValues: {
      name: "",
      startDate: "",
      endDate: "",
    },
  });

  useEffect(() => {
    dispatch(campaignSliceActions.loadingStatus());
    props.FilterTableStartDate(values);
    // eslint-disable-next-line
  }, [values.startDate, values.endDate, values.name]);

  return (
    <>
      <ToastContainer />
      <Card
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          padding: "20px",
          border: "0px  ",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Form
            style={{
              marginRight: "14%",
              width: "800px",
              marginLeft: "10%",
            }}
          >
            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <FormLabel>Start Date</FormLabel>
                <FormControl
                  data-testid="startDate-test"
                  className="shadow-none"
                  type="date"
                  style={{ maxWidth: "300px" }}
                  name="startDate"
                  onChange={handleChange}
                ></FormControl>
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <FormLabel>End Date</FormLabel>
                <FormControl
                  data-testid="endDate-test"
                  className="shadow-none"
                  min={values.startDate}
                  type="date"
                  style={{ maxWidth: "300px" }}
                  name="endDate"
                  onChange={handleChange}
                ></FormControl>
              </Col>
            </Row>
          </Form>
          <FormGroup>
            <InputGroup
              className="mb-3"
              style={{ width: "350px", height: "35px", marginTop: "5px" }}
            >
              <InputGroup.Text
                style={{ backgroundColor: "white" }}
                id="search-addon"
              >
                <i className="fa fa-search"></i>
              </InputGroup.Text>
              <Form.Control
                data-testid="name-test"
                className="shadow-none"
                name="name"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={handleChange}
              />
            </InputGroup>
          </FormGroup>
        </div>
      </Card>
    </>
  );
}

export default SearchForm;
