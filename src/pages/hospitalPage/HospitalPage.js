// Design + images
import "./HospitalPageStyles.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Import utils
import { getCookie } from "../../common/index";
import { findUser } from "../../utils/users/index";
// Components
import SidePanel from "../../components/sidePanel/SidePanel";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import HospitalBody from "../../components/allHospital/HospitalBody/HospitalBody";

function HospitalPage(props) {
  // Navigation for redirect
  const navigate = useNavigate();

  // State to store the hospitals
  const [
    allHospitalsByRegion,
    setAllHospitalsByRegion,
  ] = useState([]);

  // Check to see if a user is logged in
  useEffect(() => {
    if (props.isLoggedIn) {
      const cookie = getCookie("jwt_token");
      // Set the user details if a cookie is found ELSE reroute to homepage
      if (cookie !== false) {
        findUserWithToken(
          cookie,
          props.setUserDetails
        );
      } else {
        navigate("/");
      }
    }
  }, []);

  // Find the user with the token OR reroute to the homepage
  const findUserWithToken = async (cookie) => {
    const userDetails = await findUser(
      cookie,
      props.setUserDetails
    );
    if (userDetails) {
      getHospitals(userDetails);
    }
  };

  // Function to find all the hospitals
  const getHospitals = async (userDetails) => {
    const response = await nearHospitals(
      userDetails.region[0].region_id
    );
    setAllHospitalsByRegion(response);
  };

  console.log(allHospitalsByRegion);
  return (
    <div className="section-hospital">
      <div id="subsection-mainpage-navbar">
        <NavigationBar
          setIsLoggedIn={props.setIsLoggedIn}
          userDetails={props.userDetails}
        />
      </div>
      <div className="hospitalpage-body">
        <HospitalBody
          userDetails={props.userDetails}
        />
      </div>
      <div id="subsection-mainpage-sidepanel">
        <SidePanel
          userDetails={props.userDetails}
        />
      </div>
    </div>
  );
}

export default HospitalPage;
