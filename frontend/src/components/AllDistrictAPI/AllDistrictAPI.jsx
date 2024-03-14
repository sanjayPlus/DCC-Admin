import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function AllDistrictAPI() {
  const [api, setApi] = useState("");
  const navigate = useNavigate();
  const handleApiChange = (e) => {
    setApi(e.target.value);
    localStorage.setItem("api", e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(api === ""){
       return toast.error("Please select District")
    }
    navigate("/login");
  }
  const list = [
    {
      id: 1,
      name: "Kozhikode",
      link: "https://dcc-kozhikode.onrender.com/api",
    },
    {
      id: 2,
      name: "Thrissur",
      link: "https://dccbackend.plusitpark.com/api",
    },
  ];
  return (
    <>
      <div className="main-wrapper">
        <div className="page-wrapper full-page">
          <div className="page-content d-flex align-items-center justify-content-center">
            <div className="row w-100 mx-0 auth-page">
              <div className="col-md-8 col-xl-6 mx-auto">
                <div className="card">
                  <div className="row login-ma">
                    <div className="col-md-8 ps-md-0">
                      <div className="auth-form-wrapper px-4 py-5">
                        <h5 className="text-muted fw-normal mb-4">
                          Welcome back! Log in to your account.
                        </h5>
                        <div className="forms-sample">
                          <div className="mb-3">
                            <select name="" id="" onChange={handleApiChange} className="form-select">
                              <option value="">Select District</option>
                              {list.map((item) => {
                                return (
                                  <option value={item.link}>{item.name}</option>
                                );
                              })}
                            </select>
                          </div>

                          <div>
                            <button
                              onClick={(e) => handleSubmit(e)}
                              className="btn btn-primary me-2 mb-2 mb-md-0 text-white"
                            >
                              Login
                            </button>
                          </div>
                          {/* <a
                        href="register.html"
                        className="d-block mt-3 text-muted"
                      >
                        Not a user? Sign up
                      </a> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllDistrictAPI;
