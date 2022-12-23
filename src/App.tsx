import React, { useEffect, useState } from 'react';
import { Button, Layout, Space } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { auth_selectError, auth_selectIsAuth, auth_selectUser } from './store/reducers/auth/selectors';
import { checkIsAuth, logout } from './store/reducers/auth/thunk-creators';
import { useNavigate } from 'react-router-dom';
import Preloader from './components/Preloader';
import GlobalError from './components/GlobalError';
import AppRouter from './components/AppRouter';

const App = () => {
  const isAuth = useAppSelector(auth_selectIsAuth);
  const user = useAppSelector(auth_selectUser);
  const error = useAppSelector(auth_selectError);

  const [appInitialized, setAppInitialized] = useState(false);
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(async () => {
      await dispatch(checkIsAuth());
      setAppInitialized(true);
    }, 1000);
  }, []);

  const handleSignOut = async () => {
    setBtnIsLoading(true);
    await dispatch(logout());
    setBtnIsLoading(false);
  }

  const handleSignInBtnClick = () => {
    navigate('/login');
  }

  if (!appInitialized) return <Preloader />;
  if (error) return <GlobalError message={error} />;

  return (
    <div className="appWrapper">
      <Layout>
        <Header className="header">
          <Space size="large" className="headerBody">
            <h4 className="headerUsername">
              {isAuth
                ? user?.email
                : "Guest"
              }
            </h4>
            {isAuth
              ? <Button onClick={handleSignOut} loading={btnIsLoading}>Sign out</Button>
              : <Button onClick={handleSignInBtnClick}>Sign in</Button>
            }
          </Space>
        </Header>
        <Content className="content">
          <AppRouter />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
