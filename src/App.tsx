import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Products from './pages/Products/Products';
import Create from './pages/Products/Create';
import Edit from './pages/Products/Edit';
import { useAuth } from './pages/Authentication/AuthContext';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { isAuthenticated, signIn } = useAuth();

  document.title = 'Be a care';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      signIn();
    }
    setLoading(false);
  }, [signIn]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/"
          index
          element={
            <div>
              {isAuthenticated ? (
                <Products />
              ) : (
                <SignIn onSignIn={signIn} />
              )}
              </div>
          }
        />
        <Route path="/register" element={<SignUp />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
