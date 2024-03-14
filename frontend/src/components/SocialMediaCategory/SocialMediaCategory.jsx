import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import SERVER_URL from "../../config/SERVER_URL";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function SocialMediaCategory() {
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    axios.get(`${SERVER_URL}/admin/protected`,{
      headers:{
        "x-access-token":localStorage.getItem("token")
      }
    }).then((res) => {
      if (res.status === 200) {
        axios.get(`${SERVER_URL}/admin/get-social-category`,{
          headers:{
            "x-access-token":localStorage.getItem("token")
          }
        }).then((res) => {
          if (res.status === 200) {
            setCategoryList(res.data);
          }
        });
      }
    });
  }, []);
const handleAdd = (e)=>{
  e.preventDefault()
  axios.post(`${SERVER_URL}/admin/add-social-category`,{
    category
  },{
    headers:{
      "x-access-token":localStorage.getItem("token")
    }
  }).then((res)=>{
    if(res.status===200){
      setCategoryList([...categoryList,category])
    }
  })
}
const handleDelete = (id)=>{
  axios.delete(`${SERVER_URL}/admin/delete-social-category/${id}`,{
    headers:{
      "x-access-token":localStorage.getItem("token")
    }
  }).then((res)=>{
    if(res.status===200){
      setCategoryList(categoryList.filter((cat)=>cat!==id))
    }
  })
}
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
                    <h6 className="card-title">Add category</h6>
                    <form className="forms-sample">
                      <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">
                          category Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          autoComplete="off"
                          placeholder="name"
                          name="name"
                          value={category}
                          onChange={(e)=>setCategory(e.target.value)}
                        />
                      </div>
                   

                      <button
                        type="submit"
                        className="btn btn-primary me-2 m-2"
                        onClick={handleAdd}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                      
                            <th>Category</th>

                            {/* <th>Edit</th> */}
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categoryList?.map((product) => (
                            <tr key="">
                           
                              <th>{product}</th>

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
                                  onClick={() => handleDelete(product)}
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
                          {categoryList.length !== 0 && (
                            <li
                              className="page-item"
                              onClick={() => {
                                setPage(page + 1);
                              }}
                            >
                              <a className="page-link">{page + 1}</a>
                            </li>
                          )}
                          {categoryList.length !== 0 && (
                            <li
                              className="page-item"
                              onClick={() => {
                                if (categoryList.length !== 0) {
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

export default SocialMediaCategory;
