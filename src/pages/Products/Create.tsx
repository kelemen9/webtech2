import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';

const Create = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const product = { name, type, price: Number(price), quantity: Number(quantity) };

    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        setMessage('Termék sikeresen hozzáadva!');
        setTimeout(() => {
          setLoading(false);
          navigate('/');
        }, 1500);
      } else {
        setMessage(`Hiba történt: ${await response.text()}`);
        setLoading(false);
      }
    } catch (error: any) {
      setMessage(`Hiba történt: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h2 className="text-2xl font-semibold text-purple-600 dark:text-white">
              Termék felvitele
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Név <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Add meg a termék nevét"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-purple-600 active:border-purple-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-purple-600"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Típus <span className="text-meta-1">*</span>
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-purple-600 active:border-purple-600 dark:border-form-strokedark dark:bg-form-input dark:focus:border-purple-600 text-black dark:text-white"
                  >
                    <option value="" disabled className="text-body dark:text-bodydark">
                      -- Válassz -- 
                    </option>
                    <option value="Arclemosó" className="text-body dark:text-bodydark">
                      Arclemosó
                    </option>
                    <option value="Szérum" className="text-body dark:text-bodydark">
                      Szérum
                    </option>
                    <option value="Arckrém" className="text-body dark:text-bodydark">
                      Arckrém
                    </option>
                    <option value="Fényvédő" className="text-body dark:text-bodydark">
                      Fényvédő
                    </option>
                    <option value="Arcmaszk" className="text-body dark:text-bodydark">
                      Arcmaszk
                    </option>
                    <option value="Kiegészítő" className="text-body dark:text-bodydark">
                      Kiegészítő
                    </option>
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""/>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Ár <span className="text-meta-1">*</span>
                </label>
                <input
                  type="number"
                  min={'0'}
                  placeholder="Add meg a termék árát"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-purple-600 active:border-purple-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-purple-600"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Mennyiség <span className="text-meta-1">*</span>
                </label>
                <input
                  type="number"
                  min={'0'}
                  placeholder="Add meg a termék mennyiségét"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-purple-600 active:border-purple-600 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-purple-600"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>

              <button className="flex justify-center w-full rounded bg-purple-600 p-3 font-bold text-gray hover:bg-opacity-90">
                Mentés
              </button>
              {message && (
                <div className="mt-4 text-center text-2xl text-purple-600 dark:text-white flex items-center justify-center">
                  {message}
                  {loading && (
                    <svg
                      className="animate-spin h-5 w-5 ml-3 text-purple-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Create;

