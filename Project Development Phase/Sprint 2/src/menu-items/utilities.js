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
            url: '/color',
            icon: icons.BgColorsOutlined,
            breadcrumbs: false
        }
    ]
};

export default utilities;
