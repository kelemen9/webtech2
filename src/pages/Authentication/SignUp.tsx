import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('A jelszavak nem egyeznek!');
      setSuccess('');
      return;
    }
    try {
      await axios.post('http://localhost:3000/api/auth/register', { username, password });
      setError('');
      navigate('/', { state: { successMessage: 'Sikeres regisztráció. Most jelentkezz be!' } });
    } catch (err: any) {
      if (err.response && err.response.data === 'Ilyen névvel már létezik felhasználó!') {
        setError('Ilyen névvel már létezik felhasználó!');
      } else {
        setError('Sikertelen regisztráció!');
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="rounded-lg flex flex-wrap items-center bg-purple-500"> {/* Lila háttér */}
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <span className="inline-block">
                <img src="/src/images/gif/skincare.gif" alt="gif" className='h-80' />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-white dark:text-white sm:text-title-xl2">
                Regisztráció
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
                    className="w-full rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 text-purple-500 outline-none focus:border-white focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-white"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-white dark:text-white">
                  Jelszó
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 text-purple-500 outline-none focus:border-white focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-white"
                  />

                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-white dark:text-white">
                  Jelszó újra
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 text-purple-500 outline-none focus:border-white focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-white"
                  />
                </div>
              </div>

              <div className="mb-5">
                <button className="w-full cursor-pointer text-xl font-bold  rounded-lg border border-white bg-white p-4 text-purple-500 transition hover:bg-opacity-90 dark:bg-strokedark dark:border-strokedark"
                 onClick={handleSignUp}
                 >
                  Regisztráció
                </button>
              </div>

              {error && <p className='text-white text-xl font-bold mt-2' >{error}</p>}
              {success && <p className='text-white text-xl font-bold mt-2' >{success}</p>}


              <div className="mt-6 text-center text-white">
                <p>
                  Már van fiókod?{' '}
                  <Link to="/" className="text-white hover:text-black">
                    Bejelentkezés
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignUp;
