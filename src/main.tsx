import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'
import { ConfigProvider } from 'antd'
import { mainTheme } from './theme'
import { Provider } from 'react-redux'
import { store } from './redux/store/store'
import { Toaster } from 'react-hot-toast';
import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <ConfigProvider theme={mainTheme}>
      <RouterProvider router={router} />
    </ConfigProvider>
    <Toaster position="top-center" />
    </Provider>
  </StrictMode>,
)
