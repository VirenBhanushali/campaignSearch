import { fireEvent, render, screen, act } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store, { getCampaigns } from "./store/campgainStore";

test("Application Render", async () => {
  store.dispatch(getCampaigns());
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = await screen.findByText(/List of Campaigns/i);
  expect(linkElement).toBeInTheDocument();
});

test("Spinner Render for Loading status", async () => {
  store.dispatch(getCampaigns());
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const spinner = screen.getByTestId("spinner");
  expect(spinner).toBeVisible();
});

test("Filtering based on start Date", async () => {
  store.dispatch(getCampaigns());
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const startDate = await screen.findByTestId("startDate-test");
  act(() => fireEvent.change(startDate, { target: { value: "2020-05-12" } }));
  const tableRows = container.getElementsByTagName("tr");
  expect(tableRows.length).toBe(8);
});

test("Filtering based on end Date", async () => {
  store.dispatch(getCampaigns());
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const endDate = await screen.findByTestId("endDate-test");
  act(() => fireEvent.change(endDate, { target: { value: "2022-05-12" } }));
  const tableRows = container.getElementsByTagName("tr");
  expect(tableRows.length).toBe(4);
});

test("Filtering based on Start Date and end Date", async () => {
  store.dispatch(getCampaigns());
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const startDate = await screen.findByTestId("startDate-test");
  const endDate = await screen.findByTestId("endDate-test");
  act(() => {
    fireEvent.change(endDate, { target: { value: "2022-05-12" } });
    fireEvent.change(startDate, { target: { value: "2020-01-18" } });
  });
  const tableRows = container.getElementsByTagName("tr");
  expect(tableRows.length).toBe(2);
});

test("Filtering based on End Date is Less Than Start Date", async () => {
  store.dispatch(getCampaigns());
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const startDate = await screen.findByTestId("startDate-test");
  const endDate = await screen.findByTestId("endDate-test");
  act(() => {
    fireEvent.change(endDate, { target: { value: "2020-01-18" } });
    fireEvent.change(startDate, { target: { value: "2022-05-12" } });
  });
  const tableRows = container.getElementsByTagName("tr");
  expect(tableRows.length).toBe(0);
});

test("Filtering based on Name", async () => {
  store.dispatch(getCampaigns());
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const nameInput = await screen.findByTestId("name-test");
  act(() => {
    fireEvent.change(nameInput, { target: { value: "Miboo" } });
  });
  const tableRows = container.getElementsByTagName("tr");
  expect(tableRows.length).toBe(2);
});

test("Filtering based on Name along with Date", async () => {
  store.dispatch(getCampaigns());
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const nameInput = await screen.findByTestId("name-test");
  const startDate = await screen.findByTestId("startDate-test");
  const endDate = await screen.findByTestId("endDate-test");
  act(() => {
    fireEvent.change(endDate, { target: { value: "2022-02-12" } });
    fireEvent.change(startDate, { target: { value: "2019-01-18" } });
    fireEvent.change(nameInput, { target: { value: "m" } });
  });
  const tableRows = container.getElementsByTagName("tr");
  expect(tableRows.length).toBe(2);
});

test("No Campaign Fooound Screen on Date Outside Range and Go back Functionality", async () => {
  store.dispatch(getCampaigns());
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const startDate = await screen.findByTestId("startDate-test");
  act(() => {
    fireEvent.change(startDate, { target: { value: "2027-02-12" } });
  });
  const tableRows = container.getElementsByTagName("tr");
  expect(tableRows.length).toBe(0);
  const goBackButton = await screen.findByTestId("backButton");
  act(() => {
    fireEvent.click(goBackButton);
  });
  expect(tableRows.length).toBe(11);
});

test("covering addCampaign Global Method", () => {
  addCampaign([]);
});
