import PageWrapper from "../../layout/PageWrapper";
import DeviceAutoComplete from "../../ui/seller/DeviceAutoComplete";

const AddDevice = () => {
  return (
    <PageWrapper>
      <div className="container py-3 px-4">
        <h3 className="mt-3 mb-5">Add / Update Device</h3>
        <DeviceAutoComplete />
      </div>
    </PageWrapper>
  );
};

export default AddDevice;
