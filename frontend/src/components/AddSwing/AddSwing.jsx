import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import SERVER_URL from "../../config/SERVER_URL";

function AddSwing() {
  const [swing, setSwing] = useState({
    swing:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSwing((prevSwing) => ({
      ...prevSwing,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`${SERVER_URL}/admin/swing`, swing,{headers:{
        "x-access-token":localStorage.getItem("token")
    }}).then((res) => {
        if(res.status === 200 || res.status === 201){
            
            setSwing({
              swing: "",
            });
            toast.success("Swing added successfully");
            console.log("Swing created successfully");
        }
    }).catch((err)=>{
        console.log(err.response.data);
    })
    // Reset the form after submission
  };

  return (
    <>
      <div className="main-wrapper">
        <SideBar />
        <div className="page-wrapper">
          <NavBar />
          <div className="page-content">
            <div className="row">
              <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">Add Swing</h6>
                    <form className="forms-sample" onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="swing" className="form-label">
                          Swing Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="swing"
                          autoComplete="off"
                          placeholder="Swing Name"
                          name="swing"
                          value={swing.swing}
                          onChange={handleChange}
                        />
                      </div>
                        
                      <button type="submit" className="btn btn-primary me-2 m-2">
                        Submit
                      </button>
                      <button type="reset" className="btn btn-secondary">
                        Cancel
                      </button>
                    </form>
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

export default AddSwing;
