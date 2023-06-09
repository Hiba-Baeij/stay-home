import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import { Dashboard, Home } from '@mui/icons-material';
import Employee from '@/pages/employees/employee';
import Customer from '@/pages/customers/customer';
import Driver from '@/pages/drivers/driver';
import Shop from '@/pages/shops/shop';
import Order from '@/pages/orders/order';
import Vehicle from '@/pages/vehicles/vehicle';
import Rating from '@/pages/ratings/rating';
import Notifiation from '@/pages/notifications/notifiation';
import Setting from '@/pages/settings/setting';

export const navLinks = [
    {
        name: "الرئيسية",
        path: "/",
        icon: HomeIcon,
        component: Home,
        layout: Dashboard
    },
    {
        name: "الموظفين",
        path: "/employees",
        icon: PersonIcon,
        component: Employee,
        layout: Dashboard
    },
    {
        name: "الزبائن",
        path: "/customers",
        icon: PersonIcon,
        component: Customer,
        layout: Dashboard
    },

    {
        name: "السائقين",
        path: "/drivers",
        icon: StoreIcon,
        component: Driver,
        layout: Dashboard
    },
    {
        name: "المتاجر",
        path: "/shops",
        icon: ShoppingCartIcon,
        component: Shop,
        layout: Dashboard
    },
    {
        name: "الطلبات",
        path: "/orders",
        icon: ShoppingCartIcon,
        component: Order,
        layout: Dashboard
    },
    {
        name: "المركبات",
        path: "/vehicles",
        icon: LocalShippingIcon,
        component: Vehicle,
        layout: Dashboard
    },

    {
        name: "تقييمات",
        path: "/ratings",
        icon: BarChartIcon,
        component: Rating,
        layout: Dashboard
    },
    {
        name: "الاشعارات",
        path: "/notifications",
        icon: NotificationsNoneIcon,
        component: Notifiation,
        layout: Dashboard
    },

    {
        name: "الاعدادات",
        path: "/settings",
        icon: SettingsIcon,
        component: Setting,
        layout: Dashboard
    },


] 