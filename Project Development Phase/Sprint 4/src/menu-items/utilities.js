// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //
// ======[Navbar elements]===== //
const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'util-location',
            title: 'Predict Location',
            type: 'item',
            url: '/predictCoordinates',
            icon: icons.BarcodeOutlined,
            breadcrumbs: false
        },
        {
            id: 'predict-manual',
            title: 'Predict Manual',
            type: 'item',
            url: '/predictManual',
            icon: icons.AntDesignOutlined,
            breadcrumbs: false
        },
        {
            id: 'util-compare-location',
            title: 'Compare Locations',
            type: 'item',
            url: '/compare-locations',
            icon: icons.BgColorsOutlined,
            breadcrumbs: false
        },
        {
            id: 'Predict-week',
            title: 'Predict for Next week',
            type: 'item',
            url: '/predict-week',
            icon: icons.BgColorsOutlined,
            breadcrumbs: false
        }
    ]
};

export default utilities;
