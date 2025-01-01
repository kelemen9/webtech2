import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';

type SignInProps = {
  onSignIn: () => void;
};

function SignIn({ onSignIn }: SignInProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      setSuccess(location.state.successMessage);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      onSignIn();
    } catch (err) {
      setError('Helytelen adatok!');
    }
  };

  return (
    <DefaultLayout>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="rounded-lg flex flex-wrap items-center bg-purple-200">  {/* Kicsit sötétebb pasztell lila háttér */}
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <span className="inline-block">
                <img src="/src/images/gif/skincare.gif" alt="gif" className='h-80' />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-[#6B3C99] dark:text-[#6B3C99] sm:text-title-xl2">
             Bejelentkezés
            </h2>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-white dark:text-white">
                  Felhasználónév
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 text-gifPink outline-none focus:border-white focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-white"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-white dark:text-white">
                  Jelszó
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 text-gifPink outline-none focus:border-white focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-white"
                  />
                </div>
              </div>

              <div className="mb-5">
              <button
              onClick={handleLogin}
              className="w-full cursor-pointer text-xl font-bold rounded-lg border border-white bg-white p-4 text-[#6B3C99] transition hover:bg-opacity-90 dark:bg-strokedark dark:border-strokedark"
             >
              Bejelentkezés
             </button>
             </div>


              {error && <p className='text-white text-xl font-bold mt-2'>{error}</p>}
              {success && <p className='text-white text-xl font-bold mt-2'>{success}</p>}

              <div className="mt-6 text-center text-white">
                <p>
                  Nincs még fiókod?{' '}
                  <Link to="/register" className="text-white hover:text-black">
                    Regisztrálj!
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default SignIn;
