import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SERVER_URL from "../../config/SERVER_URL";

function AllArticle() {
  const navigate = useNavigate();
  const [article, setArticle] = useState([]);
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
            .get(`${SERVER_URL}/admin/article`, {
              headers: { "x-access-token": token },
            })
            .then((userResponse) => {
              if (userResponse.status === 200) {
            
                setArticle(userResponse?.data);
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
  //     .get(`${SERVER_URL}/product/gallery-with-pagination?page=${page}&limit=10`, {
  //       headers: { "x-access-token": localStorage.getItem("token") },
  //     })
  //     .then((userResponse) => {
  //       if (userResponse.status === 200) {
  //           setgallery(userResponse?.data.gallery);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data);
  //     });
  // }, [page]);
  function handleDelete(id) {
    axios
      .delete(
        `${SERVER_URL}/admin/article/${id}`,
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.status === 200) {
          setArticle(article?.filter((product) => product._id !== id));
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
          <NavBar name={name} setName={setName} link="all-article" />
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
                            <th>Name</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Href</th>
                           
                            {/* <th>Edit</th> */}
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {article?.map((product) => (
                            <tr key="">
                              <th>{product?.name}</th>
                              <th><img src={product?.image} style={{width:"10%"}} alt="" /></th>
                              <th>{product?.description}</th>
                              <th>{product?.href}</th>
                              

                             
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
                              onClick={()=>handleDelete(product._id)}
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
                          {gallery.length !== 0 && (
                            <li
                              className="page-item"
                              onClick={() => {
                                setPage(page + 1);
                              }}
                            >
                              <a className="page-link">{page + 1}</a>
                            </li>
                          )}
                          {gallery.length !== 0 && (
                            <li
                              className="page-item"
                              onClick={() => {
                                if (gallery.length !== 0) {
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
      </div>
    </>
  );
}

export default AllArticle;
