import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import SERVER_URL from "../../config/SERVER_URL";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function AddRepresentative() {
    const [representative, setRepresentative] = useState({
        name: "",
        position: "",
        address: "",
        email: "",
        phone: "",
        category: "",
        link: "",
        image: null,
    });

    const navigate = useNavigate();

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
                if (res.status !== 200) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            })
            .catch(() => {
                localStorage.removeItem("token");
                navigate("/login");
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRepresentative((prevRepresentative) => ({
            ...prevRepresentative,
            [name]: value,
        }));
    };

    //   const handleImageChange = (e) => {
    //     const files = Array.from(e.target.files);
    //     const imageArray = gallery.images ? [...gallery.images] : []; // Check if gallery.images is defined

    //     files.forEach((file) => {
    //       const reader = new FileReader();
    //       reader.onloadend = () => {
    //         if (reader.readyState === FileReader.DONE) {
    //           // Check if the image already exists in the image array
    //           if (!imageArray.includes(reader.result)) {
    //             imageArray.push(reader.result);
    //             setGallery((prevgallery) => ({
    //               ...prevgallery,
    //               images: imageArray,
    //             }));
    //           }
    //         }
    //       };
    //       reader.readAsDataURL(file);
    //     });
    //   };
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the first file from the selected files
        setRepresentative(
            (prevRepresentative) => ({
                ...prevRepresentative,
                image: file,
            }),
            () => {
                console.log(representative); // This will log the updated state
            }
        );
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", representative.name);
        formData.append("position", representative.position);
        formData.append("address", representative.address);
        formData.append("email", representative.email);
        formData.append("phone", representative.phone);
        formData.append("category", representative.category);
        formData.append("link", representative.link);
        formData.append("image", representative.image);
        const token = localStorage.getItem("token");
        axios
            .post(`${SERVER_URL}/admin/add-representatives`, formData, {
                headers: { "x-access-token": token },
            })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    toast.success("Representative added successfully");
                    setRepresentative({
                        name: "",
                        position: "",
                        address: "",
                        email: "",
                        phone: "",
                        category: "",
                        link: "",
                        image: null,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
                                        <h6 className="card-title">Add Representative</h6>
                                        <form className="forms-sample" onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="name" className="form-label">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    autoComplete="off"
                                                    placeholder="name"
                                                    name="name"
                                                    value={representative.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="position" className="form-label">
                                                    Position
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="position"
                                                    autoComplete="off"
                                                    placeholder="position"
                                                    name="position"
                                                    value={representative.position}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="address" className="form-label">
                                                    Address
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="address"
                                                    autoComplete="off"
                                                    placeholder="address"
                                                    name="address"
                                                    value={representative.address}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    autoComplete="off"
                                                    placeholder="email"
                                                    name="email"
                                                    value={representative.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="link" className="form-label">
                                                    Link
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="link"
                                                    autoComplete="off"
                                                    placeholder="link"
                                                    name="link"
                                                    value={representative.link}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="phone" className="form-label">
                                                    Phone
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="phone"
                                                    autoComplete="off"
                                                    placeholder="phone"
                                                    name="phone"
                                                    value={representative.phone}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="category" className="form-label">
                                                    Category
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="category"
                                                    autoComplete="off"
                                                    placeholder="category"
                                                    name="category"
                                                    value={representative.category}
                                                    onChange={handleChange}
                                                />
                                            </div>





                                            <div className="mb-3">
                                                <label htmlFor="image" className="form-label">
                                                    Image
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="image"
                                                    placeholder="image"
                                                    name="image"

                                                    onChange={handleFileChange}
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="btn btn-primary me-2 m-2"
                                            >
                                                Submit
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

export default AddRepresentative;
