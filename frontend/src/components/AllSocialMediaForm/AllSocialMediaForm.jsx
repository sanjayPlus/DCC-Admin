import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SERVER_URL from "../../config/SERVER_URL";

function AllSocialMediaForm() {
    const navigate = useNavigate();
    const [social, setSocial] = useState([]);
    const [name, setName] = useState("");
    // const [page, setPage] = useState(1);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
        axios
            .get(`${SERVER_URL}/admin/protected`, {
                headers: { "x-access-token": token },
            })
            .then((res) => {
                if (res.status === 200) {
                    axios
                        .get(`${SERVER_URL}/admin/social-media-form`, {
                            headers: { "x-access-token": token },
                        })
                        .then((userResponse) => {
                            if (userResponse.status === 200) {

                                setSocial(userResponse?.data);
                            }
                        })
                        .catch((err) => {
                            console.log(err.response.data);
                        });
                }
            })
            .catch(() => {
                localStorage.removeItem("token");
                navigate("/login");
            });
    }, [navigate]);

    // useEffect(() => {
    //   axios
    //     .get(`${SERVER_URL}/product/Mandalam-with-pagination?page=${page}&limit=10`, {
    //       headers: { "x-access-token": localStorage.getItem("token") },
    //     })
    //     .then((userResponse) => {
    //       if (userResponse.status === 200) {
    //           setMandalam(userResponse?.data.Mandalam);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err.response.data);
    //     });
    // }, [page]);
    function handleDelete(id) {
        axios
            .delete(
                `${SERVER_URL}/admin/social-media-form/${id}`,
                { headers: { "x-access-token": localStorage.getItem("token") } }
            )
            .then((res) => {
                if (res.status === 200) {
                    setSocial(social?.filter((product) => product._id !== id));
                }
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }
    return (
        <>
            <div className="main-wrapper">
                <SideBar />
                <div className="page-wrapper">
                    <NavBar name={name} setName={setName} link="all-social-media-form" />
                    <div className="page-content">
                        <div className="row">
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h6 className="card-title">Data Table</h6>

                                        <div className="table-responsive">

                                            <table id="dataTableExample" className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Instagram</th>
                                                         <th>Facebook</th> 
                                                        <th>Youtube</th>
                                                        <th>Whatsapp</th>
                                                        <th>Contact</th>
                                                        <th>Delete</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {social.map((item) => (
                                                        <tr key="">
                                                            <th>{item.instagram}</th>
                                                            <th>{item.facebook}</th>
                                                            <th>{item.youtube}</th>
                                                            <th>{item.whatsapp}</th>
                                                            <th>{item.contact}</th>
                                                           
                                                            {/* <th><p className="btn btn-primary" onClick={()=>navigate("/edit-user/"+user._id)}>Edit</p></th> */}
                                                            <th><p className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</p></th>
                                                            {/* <th><p className="btn btn-primary" onClick={()=>navigate("/user-order/"+user._id)}>Orders</p></th> */}
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}

export default AllSocialMediaForm;
