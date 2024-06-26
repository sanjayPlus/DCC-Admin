import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SERVER_URL from "../../config/SERVER_URL";

function AllRepresentative() {
    const navigate = useNavigate();
    const [representative, setRepresentative] = useState([]);
    const [rep, setRep] = useState([]);
    const [name, setName] = useState("");
    const[category,setCategory]=useState("");
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
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
                        .get(`${SERVER_URL}/admin/representatives`, {
                            headers: { "x-access-token": token },
                        })
                        .then((userResponse) => {
                            if (userResponse.status === 200) {

                                setRep(userResponse?.data);
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

    const handleSubmit = (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault();
        axios.get(`${SERVER_URL}/admin/representatives?category=${category}`,  {
          headers: {
            'x-access-token': token
          }
        }).then((res) => {
            setRepresentative(res.data);
            setIsFormSubmitted(true);
          }).catch((err) => {
          console.log(err)
        })
      }
    

    // useEffect(() => {
    //   axios
    //     .get(`${SERVER_URL}/product/carousel-with-pagination?page=${page}&limit=10`, {
    //       headers: { "x-access-token": localStorage.getItem("token") },
    //     })
    //     .then((userResponse) => {
    //       if (userResponse.status === 200) {
    //           setCarousel(userResponse?.data.carousel);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err.response.data);
    //     });
    // }, [page]);
    function handleDelete(id) {
        axios
            .delete(
                `${SERVER_URL}/admin/representatives/${id}`,
                { headers: { "x-access-token": localStorage.getItem("token") } }
            )
            .then((res) => {
                if (res.status === 200) {
                    setRepresentative(representative?.filter((product) => product._id !== id));
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
                    <NavBar name={name} setName={setName} link="all-representative" />
                    <div className="page-content">
                        <div className="row">
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h6 className="card-title">Data Table</h6>
                                        <div className="max-w-sm mx-auto mt-14 ">

                                            {/* category field */}
                                            <div className="max-w-sm mx-auto">
                                                <label
                                                    htmlFor="category"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Select Category
                                                </label><br/>
                                                <select
                                                    id="category"
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    class="form-select mb-2"

                                                >
                                                    <option>Select an option</option>
                                                    {rep.map((category) => (
                                                        <option key={category.id} value={category.category}>
                                                            {category.category}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>


                                        <div className="max-w-sm mx-auto my-5">
                                            <button
                                                className="btn btn-primary me-2 m-2"
                                                onClick={handleSubmit}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table id="dataTableExample" className="table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Image</th>
                                                    <th>Link</th>
                                                    <th>Position</th>
                                                    <th>Address</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Category</th>


                                                    {/* <th>Edit</th> */}
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {representative?.map((product) => (
                                                    <tr key="">
                                                        <th>{product?.name}</th>
                                                        <th><img src={product?.image} style={{ width: "10%" }} alt="" /></th>
                                                        <th>{product?.link}</th>
                                                        <th>{product?.position}</th>
                                                        <th>{product?.address}</th>
                                                        <th>{product?.email}</th>
                                                        <th>{product?.phone}</th>
                                                        <th>{product?.category}</th>



                                                        {/* <th>
                                <p
                                  className="btn btn-primary"
                                  onClick={() =>
                                    navigate("/edit-product/" + product._id)
                                  }
                                >
                                  Edit
                                </p>
                              </th> */}
                                                        <th>
                                                            <p
                                                                className="btn btn-danger"
                                                                onClick={() => handleDelete(product._id)}
                                                            >
                                                                Delete
                                                            </p>
                                                        </th>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* <div className="card-footer py-4">
                      <nav aria-label="...">
                        <ul className="pagination justify-content-end mb-0">
                          <li
                            className={`page-item {page===1&& disable}`}
                            onClick={() => {
                              if (page > 1) {
                                setPage(page - 1);
                              }
                            }}
                          >
                            <a className="page-link">
                              <i className="fas fa-angle-left" />
                              <span className="sr-only">Previous</span>
                            </a>
                          </li>
                          <li className="page-item active">
                            <a className="page-link">{page}</a>
                          </li>
                          {carousel.length !== 0 && (
                            <li
                              className="page-item"
                              onClick={() => {
                                setPage(page + 1);
                              }}
                            >
                              <a className="page-link">{page + 1}</a>
                            </li>
                          )}
                          {carousel.length !== 0 && (
                            <li
                              className="page-item"
                              onClick={() => {
                                if (carousel.length !== 0) {
                                  setPage(page + 1);
                                }
                              }}
                            >
                              <a className="page-link">
                                <i className="fas fa-angle-right" />
                                <span className="sr-only">Next</span>
                              </a>
                            </li>
                          )}
                        </ul>
                      </nav>
                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
    </>
  );
}

export default AllRepresentative;
