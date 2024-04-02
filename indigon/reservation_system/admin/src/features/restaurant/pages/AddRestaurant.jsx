import { Layout } from "../../../components/Layout";
import { AddRestaurantForm } from "../components/AddRestaurantForm";

export const AddRestaurant = () => {
  return (
    <Layout headline="Add a new restaurant">
      <AddRestaurantForm />
    </Layout>
  );
};
