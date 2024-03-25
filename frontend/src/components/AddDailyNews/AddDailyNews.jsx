import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import SERVER_URL from "../../config/SERVER_URL";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function AddDailyNews() {
  const [dailyNews, setDailyNews] = useState({
    title: "",
    link: "",
    news:"",
    optional:"",
    image: null,
    date:"",
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
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDailyNews((prevDailyNews) => ({
      ...prevDailyNews,
      [name]: value,
    }));
  };

  //   const handleImageChange = (e) => {
  //     const files = Array.from(e.target.files);
  //     const imageArray = carousel.images ? [...carousel.images] : []; // Check if carousel.images is defined

  //     files.forEach((file) => {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         if (reader.readyState === FileReader.DONE) {
  //           // Check if the image already exists in the image array
  //           if (!imageArray.includes(reader.result)) {
  //             imageArray.push(reader.result);
  //             setCarousel((prevCarousel) => ({
  //               ...prevCarousel,
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
    setDailyNews(
      (prevDailyNews) => ({
        ...prevDailyNews,
        image: file,
      }),
      () => {
        console.log(dailyNews); // This will log the updated state
      }
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", dailyNews.title);
    formData.append("link", dailyNews.link);
    formData.append("news", dailyNews.news);
    formData.append("optional", dailyNews.optional);
    formData.append("date", dailyNews.date);
    formData.append("image", dailyNews.image);
    const token = localStorage.getItem("token");
    axios
      .post(`${SERVER_URL}/admin/daily-news`, formData, {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          toast.success("Daily News added successfully");
          setDailyNews({
            title: "",
            link: "",
            news: "",
            optional: "",
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
                    <h6 className="card-title">Add Daily News</h6>
                    <form className="forms-sample" onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          autoComplete="off"
                          placeholder="title"
                          name="title"
                          value={dailyNews.title}
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
                          value={dailyNews.link}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="news" className="form-label">
                            News
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="news"
                          autoComplete="off"
                          placeholder="news"
                          name="news"
                          value={dailyNews.news}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="optional" className="form-label">
                            Optional
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="optional"
                          autoComplete="off"
                          placeholder="optional"
                          name="optional"
                          value={dailyNews.optional}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="date" className="form-label">
                            Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="date"
                          autoComplete="off"
                          placeholder="date"
                          name="date"
                          value={dailyNews.date}
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

export default AddDailyNews;
