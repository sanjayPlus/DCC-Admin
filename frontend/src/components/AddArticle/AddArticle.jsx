import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import SERVER_URL from "../../config/SERVER_URL";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function AddArticle() {
    const [article, setArticle] = useState({
        name: "",
        href: "",
        description: "",
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
        setArticle((prevArticle) => ({
            ...prevArticle,
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
        setArticle(
            (prevArticle) => ({
                ...prevArticle,
                image: file,
            }),
            () => {
                console.log(article); // This will log the updated state
            }
        );
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", article.name);
        formData.append("href", article.href);
        formData.append("description", article.description);
        formData.append("image", article.image);
        const token = localStorage.getItem("token");
        axios
            .post(`${SERVER_URL}/admin/article`, formData, {
                headers: { "x-access-token": token },
            })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    toast.success("Article added successfully");
                    setArticle({
                        name: "",
                        href: "",
                        description: "",
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
                                        <h6 className="card-title">Add Article</h6>
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
                                                    value={article.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="href" className="form-label">
                                                    Href
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="href"
                                                    autoComplete="off"
                                                    placeholder="href"
                                                    name="href"
                                                    value={article.href}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="description" className="form-label">
                                                    Description
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    id="description"
                                                    rows="4"
                                                    placeholder="Description"
                                                    name="description"
                                                    value={article.description}
                                                    onChange={handleChange}
                                                ></textarea>
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

export default AddArticle;
