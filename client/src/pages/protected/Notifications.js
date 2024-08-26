import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Transactions from "../../features/transactions";
const Notifications = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Notifications" }));
  }, []);

  return <Transactions />;
};

export default Notifications;
