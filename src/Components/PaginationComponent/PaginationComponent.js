import React from "react";
import { makeStyles, Box } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import CheckBoxComponent from "../CheckBoxComponent";
import "./PaginationComponent.css";

import axios from "axios";
import { BASE_API_URL } from "../../configUrl";
import DisplayProfileContainer from '../../Container/DisplayProfileContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    padding: theme.spacing(1.2),
  },
  avatar: { marginRight: theme.spacing(5) },
  paginator: {
    justifyContent: "center",
    padding: "10px",
  },
}));

const PaginationComponent = (props) => {
  const { skillsArray } = props;
  const classes = useStyles();
  const itemsPerPage = 10;
  const [page, setPage] = React.useState(1);
  let countNoOfPages =
    skillsArray.length === 0
      ? 12
      : Math.ceil(skillsArray.length / itemsPerPage);
  const [noOfPages] = React.useState(countNoOfPages);

  // const [state, setState] = React.useState([{id : null, skills: [], checked: false }]);
  const [state, setState] = React.useState([]);
  const [accessToken, getAccessToken] = React.useState(
    sessionStorage.getItem("token")
  );
  const [disableSubmitBtn, setSubmitBtn] = React.useState(true);
  const [disableCheckBox, setCheckBox] = React.useState(false);
  const [displayDetails, getDetailsPage] = React.useState(false);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleCheckChieldElement = (event, index) => {
    if (event.target.checked) {
      state.push(event.target.value);
    } else {
      var index = state.indexOf(event.target.value);
      state.splice(index, 1);
    }
    if (state.length >= 3) {
      setSubmitBtn(false);
    }
    if (state.length >= 8) {
      setCheckBox(true);
    }
  };

  const handleSkillSubmit = () => {
    axios
      .post(
        `${BASE_API_URL}/user/skills`,
        {
          skills: state,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(
        (response) => {
          getDetailsPage(true);
        },
        (error) => {
          console.log("error", error);
        }
      );
  };

  return (
    <div>
      {!displayDetails && 
      <div className="checkBoxDiv">
        <ul>
          {skillsArray
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((skillData, index) => {
              return (
                <CheckBoxComponent
                  handleCheckChieldElement={(event) =>
                    handleCheckChieldElement(event, index)
                  }
                  {...skillData}
                  disabled={disableCheckBox}
                  key={index}
                />
              );
            })}
          <button
            type="submit"
            onClick={() => handleSkillSubmit()}
            disabled={disableSubmitBtn}
          >
            SUBMIT
          </button>
        </ul>

        <Box component="span">
          <Pagination
            count={noOfPages}
            page={page}
            onChange={handleChange}
            defaultPage={1}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            classes={{ ul: classes.paginator }}
          />
        </Box>
      </div>
      }

      {displayDetails &&
        <DisplayProfileContainer />
      }
    </div>
  );
};

export default PaginationComponent;
