import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const Dashboard = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const PredictManual = Loadable(lazy(() => import('pages/components-overview/predictManual/index')));
const CompareLocations = Loadable(lazy(() => import('pages/components-overview/compareLocations')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const PredictCoordinates = Loadable(lazy(() => import('pages/components-overview/predictCoordinates')));
const PredictWeek = Loadable(lazy(() => import('pages/components-overview/predictWeek')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Dashboard />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'dashboard',
            element: <Dashboard />
        },
        {
            path: 'Documentation',
            element: <SamplePage />
        },
        {
            path: 'PredictCoordinates',
            element: <PredictCoordinates />
        },
        {
            path: 'compare-locations',
            element: <CompareLocations />
        },
        {
            path: 'PredictManual',
            element: <PredictManual />
        },
        {
            path: 'predict-week',
            element: <PredictWeek />
        }
    ]
};

export default MainRoutes;
