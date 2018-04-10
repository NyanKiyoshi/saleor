import { configure } from "@storybook/react";

function loadStories() {
  // Components
  require("./stories/components/ErrorMessageCard");
  require("./stories/components/MultiSelectField");
  require("./stories/components/PageHeader");
  require("./stories/components/PriceField");
  require("./stories/components/SingleSelectField");
  require("./stories/components/Skeleton");
  require("./stories/components/TablePagination");

  // Categories
  require("./stories/categories/CategoryBaseForm");
  require("./stories/categories/CategoryProducts");
  require("./stories/categories/CategorySubcategories");
  require("./stories/categories/ProductFilters");
  require("./stories/categories/RootCategoryList");

  // Pages
  require("./stories/pages/PageBaseForm");
  require("./stories/pages/PageDeleteDialog");
  require("./stories/pages/PageFilters");
  require("./stories/pages/PageList");

  // Products
  require("./stories/products/ProductCollections");
  require("./stories/products/ProductDescription");
  require("./stories/products/ProductDetailsForm");
  require("./stories/products/ProductImages");
  require("./stories/products/ProductListCard");
  require("./stories/products/ProductPriceAndAvailability");
  require("./stories/products/ProductVariants");
  require("./stories/products/ProductDetailsPage");
  require("./stories/products/ProductUpdatePage");
}

configure(loadStories, module);