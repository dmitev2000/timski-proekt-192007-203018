import PageWrapper from "../layout/PageWrapper";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL, IMAGES_URL } from "../../shared/URLs";
import axios from "axios";
import DetailsAccordions from "../ui/products/DetailsAccordions";
import MostImportantDetails from "../ui/products/MostImportantDetails";
import PageBreadcrumbs from "../layout/PageBreadcrumbs";
import LoadingComponent from "../ui/LoadingComponent"

const ProductDetailsPage = () => {
  const [phoneData, setPhoneData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const phone_id = parseInt(useParams().id);
  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Details", path: `/products/${phone_id}` },
  ];

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/phones/${phone_id}`)
      .then((res) => {
        //console.log(res.data);
        setPhoneData(res.data[0]);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      });
  }, [phone_id]);

  if (loading) {
    return <LoadingComponent />;
  }


  return (
    <PageWrapper>
      <div className="container px-4">
        <div>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="my-5">
              <PageBreadcrumbs links={links} />
            </div>
            <img
              src={`${IMAGES_URL}/brands/${phoneData.brand_logo}`}
              alt={`${phoneData.brand_name}-logo`}
              className="brand-logo"
            />
          </div>
          {error ? (
            <p className="text-danger">{error.message}</p>
          ) : (
            <div className="d-flex justify-content-between align-items-start gap-5 p-details-wrapper">
              <img
                src={`${IMAGES_URL}/devices/${phoneData.phone_img}`}
                alt={phoneData.phone_name}
              />
              <div className="p-details w-100">
                <h3 className="mb-3">
                  {phoneData.brand_name !== "Apple" && phoneData.brand_name}{" "}
                  {phoneData.phone_name}
                </h3>

                <MostImportantDetails
                  battery_c={phoneData.battery_charging}
                  battery_t={phoneData.battery_type}
                  display_s={phoneData.display_size}
                  display_r={phoneData.display_resolution}
                  camera_s={phoneData.main_camera_spec}
                  camera_v={phoneData.main_camera_video}
                  memory_i={phoneData.memory_internal}
                  memory_c={phoneData.memory_card_slot}
                />
                <DetailsAccordions data={phoneData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

export default ProductDetailsPage;