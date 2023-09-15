// import { useEffect, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHours } from "../store/hoursReducer";

const ViewHours = () => {
  // const dispatch = useDispatch();
  // const userHours = useSelector((state) => state.entries);

  // useEffect(() => {
  //   dispatch(fetchHours());
  // }, [dispatch]);

  return (
    <div>
      {/* {console.log(userHours)} */}
      <h1>View Hours Page</h1>
      <ol></ol>
    </div>
  );
};

export default ViewHours;
