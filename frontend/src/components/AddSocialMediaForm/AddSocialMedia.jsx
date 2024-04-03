import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import SERVER_URL from "../../config/SERVER_URL";
import toast from "react-hot-toast";

function AddSocialMediaForm() {
  const [socialMediaForm, setSocialMediaForm] = useState({
    instagram:"",
    whatsapp:"",
    facebook:"",
    youtube:"",
    contact:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialMediaForm((prevSocialMediaForm) => ({
      ...prevSocialMediaForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`${SERVER_URL}/admin/social-media-form`, socialMediaForm,{headers:{
        "x-access-token":localStorage.getItem("token")
    }}).then((res) => {
        if(res.status === 200 || res.status === 201){
            
            setSocialMediaForm({
              instagram: "",
              whatsapp: "",
              facebook: "",
              youtube: "",
              contact: "",
            });
            toast.success("Social Media added successfully");
            console.log("Social Media created successfully");
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
                    <h6 className="card-title">Add Social Media</h6>
                    <form className="forms-sample" onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="instagram" className="form-label">
                          Instagram
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="instagram"
                          autoComplete="off"
                          placeholder="Instagram"
                          name="instagram"
                          value={socialMediaForm.instagram}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="whatsapp" className="form-label">
                          Whatsapp
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="whatsapp"
                          autoComplete="off"
                          placeholder="Whatsapp"
                          name="whatsapp"
                          value={socialMediaForm.whatsapp}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="facebook" className="form-label">
                          Facebook
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="facebook"
                          autoComplete="off"
                          placeholder="Facebook"
                          name="facebook"
                          value={socialMediaForm.facebook}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="youtube" className="form-label">
                          Youtube
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="youtube"
                          autoComplete="off"
                          placeholder="Youtube"
                          name="youtube"
                          value={socialMediaForm.youtube}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="contact" className="form-label">
                          Contact
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="contact"
                          autoComplete="off"
                          placeholder="Contact"
                          name="contact"
                          value={socialMediaForm.contact}
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

export default AddSocialMediaForm;
