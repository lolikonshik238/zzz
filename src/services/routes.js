import MainPage from "../pages/MainPage";
import Catalog from "../pages/Catalog";
import Basket from "../pages/Basket";
import ToMain from "../pages/ToMain";
import OrderRegistration from "../pages/OrderRegistration";



import {
  MAINPAGE,
  CATALOG,
  BASKET,
  TOMAIN,
  ORDERREGISTRATION
} from "./consts";


export const routes = [
  {
    path: MAINPAGE,
    element: <MainPage />
  },
  {
    path: CATALOG,
    element: <Catalog />
  },
  {
    path: BASKET,
    element: <Basket />
  },
  {
    path: TOMAIN,
    element: <ToMain />
  },
  {
    path: ORDERREGISTRATION,
    element: <OrderRegistration />
  },
];
